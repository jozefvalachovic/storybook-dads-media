import { audioMediaTypes, videoMediaTypes } from "@/helpers";
import { MediaCard } from "@/components/MediaCard";
// Types
import type { HomeData } from "../page";
type ContentProps = {
  documents: HomeData["documents"];
  type: "audio" | "video";
};

export const Content = ({ documents, type }: ContentProps) => {
  const documentsFiltered = documents.filter((d) =>
    type === "audio" ? audioMediaTypes.includes(d.fileType) : videoMediaTypes.includes(d.fileType)
  );

  return documentsFiltered.length > 0 ? (
    <div className="w-full flex flex-wrap gap-4">
      <h2>New {type} for you</h2>
      <div className="w-full hide-scrollbar flex gap-4 overflow-x-auto pb-4 flex-nowrap">
        {documentsFiltered.map((d) => (
          <MediaCard key={d.id} document={d} type={type} />
        ))}
      </div>
    </div>
  ) : null;
};
