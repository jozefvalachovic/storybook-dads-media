import { audioMediaTypes, videoMediaTypes } from "@/helpers";
import { MediaCard } from "@/components/MediaCard";
// Types
import { DocumentsData } from "@/lib";
type DocumentsListProps = {
  documentsData: DocumentsData;
  type: "audio" | "video";
};

export const DocumentsList = ({ documentsData, type }: DocumentsListProps) => {
  const documentsDataFiltered = documentsData.filter((d) =>
    type === "audio" ? audioMediaTypes.includes(d.fileType) : videoMediaTypes.includes(d.fileType)
  );

  return documentsDataFiltered.length > 0 ? (
    <div className="w-full flex flex-wrap gap-4">
      <h2>New {type} for you</h2>
      <div className="w-full hide-scrollbar flex gap-4 overflow-x-auto pb-4 flex-nowrap">
        {documentsDataFiltered.map((d) => (
          <MediaCard key={d.id} document={d} type={type} />
        ))}
      </div>
    </div>
  ) : null;
};
