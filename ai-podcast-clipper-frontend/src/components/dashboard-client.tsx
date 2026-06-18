"use client";

import Dropzone, { type DropzoneState } from "shadcn-dropzone";
import type { Clip } from "@prisma/client";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Loader2, Trash2, UploadCloud } from "lucide-react";
import { useState } from "react";
import { generateUploadUrl } from "~/actions/s3";
import { toast } from "sonner";
import { deleteUploadedFile, processVideo } from "~/actions/generation";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ClipDisplay, type ClipWithFile } from "./clip-display";

const getStatusConfig = (status: string) => {
  switch (status) {
    case "queued":
      return { label: "Queued", color: "#B5860D", bg: "#FFF8E6", description: "Waiting to start..." };
    case "processing":
      return { label: "AI Processing", color: "#7A4F2E", bg: "#F5EDE4", description: "Transcribing & generating clips (1–3 mins)..." };
    case "processed":
      return { label: "Completed", color: "#3A7D44", bg: "#EDF7EF", description: "Clips successfully generated!" };
    case "no credits":
      return { label: "No Credits", color: "#C0392B", bg: "#FDF0EE", description: "Please buy credits to process." };
    case "failed":
      return { label: "Failed", color: "#C0392B", bg: "#FDF0EE", description: "Error generating clips. Try again." };
    default:
      return { label: status, color: "#9C8B75", bg: "#F5F0E8", description: "" };
  }
};

export function DashboardClient({
  uploadedFiles,
  clips,
}: {
  uploadedFiles: {
    id: string;
    s3Key: string;
    filename: string;
    status: string;
    clipsCount: number;
    createdAt: Date;
  }[];
  clips: ClipWithFile[];
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const tabParam = searchParams.get("tab");
  const activeTab = tabParam === "my-clips" ? "my-clips" : "upload";

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "my-clips") {
      params.set("tab", "my-clips");
    } else {
      params.delete("tab");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this file and all its clips?")) return;
    setDeletingId(id);
    try {
      const res = await deleteUploadedFile(id);
      if (res.success) {
        toast.success("File permanently deleted");
        router.refresh();
      } else {
        toast.error(res.error ?? "Failed to delete file");
      }
    } catch {
      toast.error("Failed to delete file");
    } finally {
      setDeletingId(null);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    router.refresh();
    setTimeout(() => setRefreshing(false), 600);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    const file = files[0]!;
    setUploading(true);
    try {
      const contentType = file.type || "video/mp4";
      const { success, signedUrl, uploadedFileId } = await generateUploadUrl({
        filename: file.name,
        contentType,
      });
      if (!success) throw new Error("Failed to get upload URL");
      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": contentType },
      });
      if (!uploadResponse.ok) throw new Error(`Upload failed with status: ${uploadResponse.status}`);
      await processVideo(uploadedFileId);
      setFiles([]);
      toast.success("Video uploaded successfully", {
        description: "Your video has been scheduled for processing. Check the status below.",
        duration: 5000,
      });
      router.refresh();
    } catch {
      toast.error("Upload failed", {
        description: "There was a problem uploading your video. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#1C1917" }}>
            Dashboard
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#9C8B75" }}>
            Upload your podcast and get AI-generated clips instantly
          </p>
        </div>
        <Link href="/dashboard/billing">
          <button
            className="rounded-xl px-4 py-2 text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
            style={{ background: "#8B5E3C", color: "#FFFFFF" }}
          >
            Buy Credits
          </button>
        </Link>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList
          className="w-fit rounded-xl p-1"
          style={{ background: "#F5F0E8", border: "1px solid #E8DFD0" }}
        >
          <TabsTrigger value="upload" className="rounded-lg px-5 py-2 text-sm font-medium">
            Upload
          </TabsTrigger>
          <TabsTrigger value="my-clips" className="rounded-lg px-5 py-2 text-sm font-medium">
            My Clips
            {clips.length > 0 && (
              <span
                className="ml-2 rounded-full px-2 py-0.5 text-xs font-semibold"
                style={{ background: "#EDE5D8", color: "#8B5E3C" }}
              >
                {clips.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Upload Tab */}
        <TabsContent value="upload" className="mt-6">
          <div
            className="rounded-2xl border p-6"
            style={{ background: "#FFFFFF", borderColor: "#E8DFD0", boxShadow: "0 2px 12px rgba(139,94,60,0.06)" }}
          >
            <h2 className="mb-1 text-base font-semibold" style={{ color: "#1C1917" }}>
              Upload Podcast
            </h2>
            <p className="mb-5 text-sm" style={{ color: "#9C8B75" }}>
              Upload your audio or video file to generate short clips
            </p>

            <Dropzone
              onDrop={(f) => {
                setFiles(f);
                setIsDragging(false);
              }}
              onDragEnter={() => setIsDragging(true)}
              onDragLeave={() => setIsDragging(false)}
              accept={{ "video/mp4": [".mp4"] }}
              maxSize={500 * 1024 * 1024}
              disabled={uploading}
              maxFiles={1}
              dropZoneClassName={`!flex !flex-col !items-center !justify-center !gap-4 !rounded-xl !border-2 !border-dashed !p-12 !text-center !transition-colors !h-56 w-full ${
                isDragging ? "!bg-[#FAF0E8] !border-[#8B5E3C]" : "!bg-[#FAF7F2] !border-[#D4B896]"
              }`}
            >
              {(dropzone: DropzoneState) => (
                <>
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ background: "#F5F0E8" }}
                  >
                    <UploadCloud className="h-7 w-7" style={{ color: "#8B5E3C" }} />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: "#1C1917" }}>
                      Drag and drop your file
                    </p>
                    <p className="mt-1 text-sm" style={{ color: "#9C8B75" }}>
                      or click to browse - MP4 up to 500MB
                    </p>
                  </div>
                </>
              )}
            </Dropzone>

            <div className="mt-4 flex items-center justify-between">
              <div>
                {files.length > 0 && (
                  <div>
                    <p className="text-xs font-medium" style={{ color: "#9C8B75" }}>Selected:</p>
                    {files.map((file) => (
                      <p key={file.name} className="mt-0.5 text-sm" style={{ color: "#1C1917" }}>
                        {file.name}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <button
                disabled={files.length === 0 || uploading}
                onClick={handleUpload}
                className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                style={{ background: "#8B5E3C", color: "#FFFFFF" }}
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload & Generate Clips"
                )}
              </button>
            </div>
          </div>

          {/* Queue Table */}
          {uploadedFiles.length > 0 && (
            <div
              className="mt-4 overflow-hidden rounded-2xl border"
              style={{ background: "#FFFFFF", borderColor: "#E8DFD0", boxShadow: "0 2px 12px rgba(139,94,60,0.06)" }}
            >
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{ borderBottom: "1px solid #E8DFD0" }}
              >
                <h3 className="text-sm font-semibold" style={{ color: "#1C1917" }}>
                  Processing Queue
                </h3>
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all hover:opacity-80 disabled:opacity-40"
                  style={{ background: "#F5F0E8", color: "#6B5B45", border: "1px solid #E8DFD0" }}
                >
                  {refreshing && <Loader2 className="h-3 w-3 animate-spin" />}
                  Refresh
                </button>
              </div>

              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: "1px solid #F0EBE1" }}>
                      {["File", "Date", "Status", "Clips", ""].map((h) => (
                        <th
                          key={h}
                          className="px-6 py-3 text-left text-xs font-medium"
                          style={{ color: "#9C8B75" }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {uploadedFiles.map((item) => {
                      const config = getStatusConfig(item.status);
                      return (
                        <tr key={item.id} style={{ borderBottom: "1px solid #FAF7F2" }}>
                          <td
                            className="max-w-[200px] truncate px-6 py-4 font-medium"
                            style={{ color: "#1C1917" }}
                          >
                            {item.filename}
                          </td>
                          <td className="px-6 py-4 text-xs" style={{ color: "#9C8B75" }}>
                            {new Date(item.createdAt).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1">
                              <span
                                className="w-fit rounded-full px-2.5 py-0.5 text-xs font-medium"
                                style={{ background: config.bg, color: config.color }}
                              >
                                {config.label}
                              </span>
                              {config.description && (
                                <span className="text-[11px]" style={{ color: "#9C8B75" }}>
                                  {config.description}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {item.clipsCount > 0 ? (
                              <span className="font-medium" style={{ color: "#8B5E3C" }}>
                                {item.clipsCount} clip{item.clipsCount !== 1 ? "s" : ""}
                              </span>
                            ) : (
                              <span style={{ color: "#D4B896" }}>-</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleDelete(item.id)}
                              disabled={deletingId === item.id}
                              className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-red-50 disabled:opacity-40"
                              style={{ color: "#C0392B" }}
                            >
                              {deletingId === item.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Clips Tab */}
        <TabsContent value="my-clips" className="mt-6">
          <div
            className="overflow-hidden rounded-2xl border"
            style={{ background: "#FFFFFF", borderColor: "#E8DFD0", boxShadow: "0 2px 12px rgba(139,94,60,0.06)" }}
          >
            <div className="px-6 py-5" style={{ borderBottom: "1px solid #F0EBE1" }}>
              <h2 className="text-base font-semibold" style={{ color: "#1C1917" }}>
                My Clips
              </h2>
              <p className="mt-0.5 text-sm" style={{ color: "#9C8B75" }}>
                View and download your AI-generated clips
              </p>
            </div>
            <div className="p-6">
              <ClipDisplay clips={clips} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
