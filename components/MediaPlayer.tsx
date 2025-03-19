"use client";

import { createState } from "@/app/state";
import { audioMediaTypes } from "@/helpers";
// Components
import { Icon } from "./icons/Icon";
import { Spinner } from "./Spinner";
// Types
import type { HomeData } from "@/app/home/page";
export type MediaPlayer = {
  selectedDocument: HomeData["documents"][0] | null;
  loading: boolean;
  url: string | null;
};

// State
export const mediaPlayerState = createState<MediaPlayer>({
  selectedDocument: null,
  loading: false,
  url: null,
});
// Update media player URL
export const updateMediaPlayerURL = async (
  selectedDocument: NonNullable<MediaPlayer["selectedDocument"]>
) => {
  mediaPlayerState.set({ selectedDocument, loading: true, url: null });

  const response = await fetch(`/api/signed-url/${selectedDocument.id}`);
  if (response.ok) {
    const { signedUrl } = await response.json();

    mediaPlayerState.set({ selectedDocument, loading: false, url: signedUrl ?? "" });
  }
};

export const MediaPlayer = () => {
  const { selectedDocument, loading, url } = mediaPlayerState.use((state) => state);

  function handleClose() {
    mediaPlayerState.set({ selectedDocument: null, loading: false, url: null });
  }

  function handleContextMenu(e: React.MouseEvent<HTMLAudioElement | HTMLVideoElement>) {
    e.preventDefault();
  }

  return (
    <aside
      style={{
        gridTemplateRows: selectedDocument ? "1fr" : "0fr",
      }}
    >
      <div className="w-[100vw] max-w-[var(--app-width-max)] overflow-hidden rounded-tl-2xl rounded-tr-2xl">
        <div className="flex bg-mid-grey p-4">
          <h1 className="!font-semibold leading-tight mr-auto">{selectedDocument?.title ?? ""}</h1>
          <div>
            <Icon icon="cancel" click={handleClose} iconColor="var(--color-text)" />
          </div>
        </div>
        <div className="flex justify-center">
          {loading ? (
            <Spinner />
          ) : selectedDocument && url ? (
            audioMediaTypes.includes(selectedDocument.fileType) ? (
              <audio
                controls
                src={url}
                preload="auto"
                autoPlay
                controlsList="nodownload"
                className="w-full rounded-none"
                onContextMenu={handleContextMenu}
              />
            ) : (
              <video
                controls
                preload="auto"
                autoPlay
                controlsList="nodownload"
                onContextMenu={handleContextMenu}
                disablePictureInPicture
                disableRemotePlayback
              >
                <source src={url} type="video/mp4" />
              </video>
            )
          ) : null}
        </div>
      </div>
    </aside>
  );
};
