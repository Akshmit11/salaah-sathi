import { convertFileToUrl } from "@/lib/utils";
import { useDropzone } from "@uploadthing/react";
import { X } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";

type VideoUploader = {
  videoUrls: string[] | undefined;
  onFieldChange: (value: string[]) => void;
  setVideos: Dispatch<SetStateAction<File[]>>;
};

const VideoUploader = ({
  videoUrls,
  onFieldChange,
  setVideos,
}: VideoUploader) => {
  const [files, setLocalFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length + files.length > 1) {
        alert("You can only upload one video.");
        return;
      }
      setVideos(acceptedFiles);
      setLocalFiles(acceptedFiles);
      onFieldChange(acceptedFiles.map((file) => convertFileToUrl(file)));
    },
    [files.length, onFieldChange, setVideos]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "video/*" ? generateClientDropzoneAccept(["video/*"]) : undefined,
  });

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setVideos(newFiles);
    setLocalFiles(newFiles);
    onFieldChange(newFiles.map((file) => convertFileToUrl(file)));
  };

  return (
    <div className="border rounded-md flex flex-col p-2">
      <div
        {...getRootProps()}
        className="p-4 flex items-center justify-center border border-dashed"
      >
        <input {...getInputProps()} />
        <p>Upload any videos here... (max. 16 MB and mp4 video type)</p>
      </div>

      {videoUrls && videoUrls?.length > 0 && (
        <div className="flex gap-2 mt-4">
          {/* videos are shown here */}
          {videoUrls?.map((url, index) => (
            <div className="relative" key={index}>
              <video width="320" height="240" controls preload="none">
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div
                className="absolute cursor-pointer bg-red-400 -top-2 -right-2 p-2 rounded-full shadow-md"
                onClick={() => removeFile(index)}
              >
                <X className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="pt-4 flex gap-2 items-center">
        {videoUrls && videoUrls?.length > 0 ? (
          <p className="border p-2 rounded-lg">
            Selected {videoUrls.length} / 1 videos
          </p>
        ) : (
          <>
            <p className="border p-2 rounded-lg">Selected 0 / 1 videos</p>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoUploader;
