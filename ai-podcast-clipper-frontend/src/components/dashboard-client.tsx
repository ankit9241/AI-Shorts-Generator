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
      return { 
        label: "Queued", 
        colorClass: "text-amber-600 bg-amber-500/10 border-amber-500/20", 
        description: "Waiting to start..." 
      };
    case "processing":
      return { 
        label: "AI Processing", 
        colorClass: "text-blue-600 bg-blue-500/10 border-blue-500/20", 
        description: "Transcribing & generating clips (1–3 mins)..." 
      };
    case "processed":
      return { 
        label: "Completed", 
        colorClass: "text-green-600 bg-green-500/10 border-green-500/20", 
        description: "Clips successfully generated!" 
      };
    case "no credits":
      return { 
        label: "No Credits", 
        colorClass: "text-destructive bg-destructive/10 border-destructive/20", 
        description: "Please buy credits to process." 
      };
    case "failed":
      return { 
        label: "Failed", 
        colorClass: "text-destructive bg-destructive/10 border-destructive/20", 
        description: "Error generating clips. Try again." 
      };
    default:
      return { 
        label: status, 
        colorClass: "text-muted-foreground bg-foreground/[0.03] border-foreground/10", 
        description: "" 
      };
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
          <h1 className="text-3xl font-display tracking-tight text-foreground font-semibold">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload your podcast and get AI-generated clips instantly
          </p>
        </div>
        <Link href="/dashboard/billing">
          <button className="flex items-center justify-center bg-foreground text-background hover:bg-foreground/90 text-sm font-medium h-10 px-5 rounded-full transition-all duration-300 cursor-pointer">
            Buy Credits
          </button>
        </Link>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="w-fit bg-foreground/[0.03] border border-foreground/10 rounded-full p-1 h-auto">
          <TabsTrigger 
            value="upload" 
            className="rounded-full px-5 py-2 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Upload
          </TabsTrigger>
          <TabsTrigger 
            value="my-clips" 
            className="rounded-full px-5 py-2 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            My Clips
            {clips.length > 0 && (
              <span className="ml-2 rounded-full px-2 py-0.5 text-xs font-mono bg-foreground/10 text-foreground">
                {clips.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Upload Tab */}
        <TabsContent value="upload" className="mt-6">
          <div className="border border-foreground/10 p-8 bg-background">
            <h2 className="text-lg font-display text-foreground font-semibold">
              Upload Podcast
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
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
                isDragging 
                  ? "!bg-foreground/[0.03] !border-foreground" 
                  : "!bg-foreground/[0.01] !border-foreground/10 hover:!border-foreground/20"
              }`}
            >
              {(_dropzone: DropzoneState) => (
                <>
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-foreground/[0.03] text-foreground border border-foreground/10">
                    <UploadCloud className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      Drag and drop your file
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      or click to browse - MP4 up to 500MB
                    </p>
                  </div>
                </>
              )}
            </Dropzone>

            <div className="mt-6 flex items-center justify-between">
              <div>
                {files.length > 0 && (
                  <div>
                    <p className="text-xs font-mono text-muted-foreground">Selected:</p>
                    {files.map((file) => (
                      <p key={file.name} className="mt-0.5 text-sm font-medium text-foreground">
                        {file.name}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <button
                disabled={files.length === 0 || uploading}
                onClick={handleUpload}
                className="flex items-center gap-2 bg-foreground text-background hover:bg-foreground/90 text-sm font-medium h-12 px-6 rounded-full transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
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
            <div className="mt-8 border border-foreground/10 bg-background">
              <div className="flex items-center justify-between px-6 py-5 border-b border-foreground/10">
                <h3 className="text-sm font-mono font-semibold text-foreground uppercase tracking-wider">
                  Processing Queue
                </h3>
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="flex items-center gap-1.5 border border-foreground/20 rounded-full px-4 py-1.5 text-xs font-medium hover:bg-foreground/5 transition-all disabled:opacity-40 cursor-pointer"
                >
                  {refreshing && <Loader2 className="h-3 w-3 animate-spin" />}
                  Refresh
                </button>
              </div>

              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-foreground/10 bg-foreground/[0.01]">
                      {["File", "Date", "Status", "Clips", ""].map((h) => (
                        <th
                          key={h}
                          className="px-6 py-3 text-left text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider"
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
                        <tr key={item.id} className="border-b border-foreground/5 last:border-b-0">
                          <td className="max-w-[200px] truncate px-6 py-5 font-medium text-foreground">
                            {item.filename}
                          </td>
                          <td className="px-6 py-5 text-xs font-mono text-muted-foreground">
                            {new Date(item.createdAt).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex flex-col gap-1">
                              <span className={`w-fit rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.colorClass}`}>
                                {config.label}
                              </span>
                              {config.description && (
                                <span className="text-[11px] text-muted-foreground">
                                  {config.description}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            {item.clipsCount > 0 ? (
                              <span className="font-mono text-sm font-semibold text-foreground">
                                {item.clipsCount} clip{item.clipsCount !== 1 ? "s" : ""}
                              </span>
                            ) : (
                              <span className="text-muted-foreground/30 font-mono">-</span>
                            )}
                          </td>
                          <td className="px-6 py-5 text-right">
                            <button
                              onClick={() => handleDelete(item.id)}
                              disabled={deletingId === item.id}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-destructive/5 text-destructive transition-colors disabled:opacity-40 cursor-pointer"
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
          <div className="border border-foreground/10 bg-background">
            <div className="px-6 py-5 border-b border-foreground/10">
              <h2 className="text-lg font-display text-foreground font-semibold">
                My Clips
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
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
