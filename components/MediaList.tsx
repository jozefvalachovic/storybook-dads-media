import { audioMediaTypes, videoMediaTypes } from "@/helpers";
import { MediaCard } from "./MediaCard";
// Types
import type { HomeData } from "@/app/home/page";
type MediaListProps = {
  documents: HomeData["documents"];
  type: "audio" | "video";
};

export const MediaList = ({ documents, type }: MediaListProps) => {
  const documentsFiltered = documents.filter((d) =>
    type === "audio" ? audioMediaTypes.includes(d.fileType) : videoMediaTypes.includes(d.fileType)
  );

  return (
    <div className="w-full flex flex-wrap gap-4">
      <h2>New {type} for you</h2>
      <div className="w-full hide-scrollbar flex gap-4 overflow-x-auto pb-4 flex-nowrap">
        {documentsFiltered.map((d) => (
          <MediaCard key={d.id} document={d} type={type} />
        ))}
      </div>
    </div>
  );
};
