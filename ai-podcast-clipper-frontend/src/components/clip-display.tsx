"use client";

import type { Clip } from "@prisma/client";
import { Download, Loader2, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { getClipPlayUrl } from "~/actions/generation";

function ClipCard({ clip }: { clip: Clip }) {
  const [playUrl, setPlayUrl] = useState<string | null>(null);
  const [isLoadingUrl, setIsLoadingUrl] = useState(true);

  useEffect(() => {
    async function fetchPlayUrl() {
      try {
        const result = await getClipPlayUrl(clip.id);
        if (result.succes && result.url) {
          setPlayUrl(result.url);
        } else if (result.error) {
          console.error("Failed to get play url: " + result.error);
        }
      } catch {
      } finally {
        setIsLoadingUrl(false);
      }
    }
    void fetchPlayUrl();
  }, [clip.id]);

  const handleDownload = () => {
    if (playUrl) {
      const link = document.createElement("a");
      link.href = playUrl;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        className="relative overflow-hidden rounded-xl"
        style={{ background: "#F5F0E8", aspectRatio: "9/16", border: "1px solid #E8DFD0" }}
      >
        {isLoadingUrl ? (
          <div className="flex h-full w-full items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" style={{ color: "#8B5E3C" }} />
          </div>
        ) : playUrl ? (
          <video
            src={playUrl}
            controls
            preload="metadata"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Play className="h-8 w-8 opacity-30" style={{ color: "#9C8B75" }} />
          </div>
        )}
      </div>
      <button
        onClick={handleDownload}
        disabled={!playUrl}
        className="flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        style={{ background: "#F5F0E8", color: "#6B5B45", borderColor: "#E8DFD0" }}
      >
        <Download className="h-3.5 w-3.5" />
        Download
      </button>
    </div>
  );
}

export type ClipWithFile = Clip & {
  uploadedFile?: {
    id: string;
    displayName: string | null;
  } | null;
};

export function ClipDisplay({ clips }: { clips: ClipWithFile[] }) {
  if (clips.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ background: "#F5F0E8" }}
        >
          <Play className="h-6 w-6" style={{ color: "#D4B896" }} />
        </div>
        <p className="text-sm font-medium" style={{ color: "#6B5B45" }}>
          No clips yet
        </p>
        <p className="mt-1 text-xs" style={{ color: "#9C8B75" }}>
          Upload a podcast to start generating clips
        </p>
      </div>
    );
  }

  // Group clips by uploadedFileId
  const groupedClips: Record<string, { title: string; clips: ClipWithFile[] }> = {};

  clips.forEach((clip) => {
    const fileId = clip.uploadedFileId ?? "other";
    const title = clip.uploadedFile?.displayName ?? "Other Clips";

    if (!groupedClips[fileId]) {
      groupedClips[fileId] = { title, clips: [] };
    }
    groupedClips[fileId].clips.push(clip);
  });

  return (
    <div className="space-y-10">
      {Object.entries(groupedClips).map(([fileId, group], index, arr) => (
        <div key={fileId} className="space-y-4">
          <div className="flex items-center gap-3">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "#8B5E3C" }}
            />
            <h3 className="text-sm font-semibold tracking-wide uppercase" style={{ color: "#6B5B45" }}>
              {group.title}
            </h3>
            <span
              className="text-xs rounded-full px-2 py-0.5 font-medium"
              style={{ background: "#F5F0E8", color: "#8B5E3C" }}
            >
              {group.clips.length} clip{group.clips.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {group.clips.map((clip) => (
              <ClipCard key={clip.id} clip={clip} />
            ))}
          </div>
          {index < arr.length - 1 && (
            <hr style={{ borderColor: "#F5F0E8" }} className="mt-8" />
          )}
        </div>
      ))}
    </div>
  );
}
