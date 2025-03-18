"use client";

import Image from "next/image";
import { updateMediaPlayerURL } from "./MediaPlayer";
// Types
import type { HomeData } from "@/app/home/page";
type MediaCardProps = {
  document: HomeData["documents"][0];
  format?: "normal" | "large";
  type: "audio" | "video";
};

export const MediaCard = ({ document, format = "normal", type }: MediaCardProps) => {
  const containerWidth =
    format === "large" ? "min-w-[330px] max-w-[330px]" : "min-w-[150px] max-w-[150px]";

  const { title, fileType } = document;
  const imageSrc = type === "audio" ? "/audio.png" : "/video.png";
  const imageWidth = format === "large" ? 117 : 45;

  return (
    <div
      className={`${containerWidth} aspect-square cursor-pointer overflow-hidden flex flex-col justify-end border border-mid-grey rounded-2xl transition-shadow hover:shadow-sm hover:border-tertiary`}
      onClick={() => updateMediaPlayerURL(document)}
    >
      <Image
        src={imageSrc}
        width={imageWidth}
        height={imageWidth}
        alt="Boy reading"
        className="m-auto"
      />
      <div className="flex flex-col bg-light-grey p-4">
        <p className="font-semibold text-sm truncate">{title}</p>
        <p className="text-xs uppercase tracking-wider">{fileType}</p>
      </div>
    </div>
  );
};
