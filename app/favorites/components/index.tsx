"use client";

import { useState } from "react";
import { audioMediaTypes, videoMediaTypes } from "@/helpers";
// Components
import { Icon } from "@/components/icons/Icon";
import { MediaCard } from "@/components/MediaCard";
// Types
import { DocumentsData } from "@/lib";
type ContentProps = {
  documentsData: DocumentsData;
};

export const Content = ({ documentsData }: ContentProps) => {
  const types = ["audio", "video"];
  const [type, setType] = useState<"audio" | "video">(types[0] as "audio");
  function updateType(t: (typeof types)[number]) {
    setType(t as "audio" | "video");
  }

  const documentsDataFiltered = documentsData.filter((d) =>
    type === "audio" ? audioMediaTypes.includes(d.fileType) : videoMediaTypes.includes(d.fileType)
  );

  return (
    <div className="section-content hide-scrollbar">
      <div className="sticky top-0 w-full bg-bg pb-4">
        <div className="overflow-hidden flex rounded-2xl border border-dark-grey">
          {types.map((t) => {
            const selected = t === type;

            return (
              <div
                key={t}
                className={`w-full select-none flex items-center justify-center gap-4 py-2 ${
                  selected ? "bg-primary" : "cursor-pointer"
                }`}
                onClick={selected ? undefined : () => updateType(t)}
              >
                <Icon icon={t} />
                <p className="text-sm capitalize">{t}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        {documentsDataFiltered.map((d) => (
          <MediaCard key={d.id} document={d} type={type} format="large" />
        ))}
      </div>
    </div>
  );
};
