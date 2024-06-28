import { convertFileToUrl } from "@/lib/utils";
import { useDropzone } from "@uploadthing/react";
import { X } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";

type FileUploaderProps = {
  imageUrls: string[] | undefined;
  onFieldChange: (value: string[]) => void;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

const FileUploader = ({
  imageUrls,
  onFieldChange,
  setFiles,
}: FileUploaderProps) => {
  const [files, setLocalFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length + files.length > 4) {
        alert("You can only upload one video.");
        return;
      }
      setFiles(acceptedFiles);
      setLocalFiles(acceptedFiles);
      onFieldChange(acceptedFiles.map((file) => convertFileToUrl(file)));
    },
    [onFieldChange, setFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    setLocalFiles(newFiles);
    onFieldChange(newFiles.map((file) => convertFileToUrl(file)));
  };

  return (
    <div className="border rounded-md flex flex-col p-2">
      <div {...getRootProps()} className="p-4 flex items-center justify-center border border-dashed">
        <input {...getInputProps()} />
        <p>Upload any images here... (recommended 750 x 350 pixels)</p>
      </div>

      {imageUrls && imageUrls?.length > 0 && (
        <div className="flex gap-2 mt-4">
          {/* images are shown here */}
          {imageUrls?.map((url, index) => (
              <div className="relative" key={index}>
                <Image 
                  src={url}
                  alt="images"
                  width={150}
                  height={70}
                  className="contain-size"
                />
                <div className="absolute cursor-pointer bg-red-400 -top-2 -right-2 p-2 rounded-full shadow-md" onClick={() => removeFile(index)}>
                  <X className="w-4 h-4" />
                </div>
              </div>
            ))
          }
        </div>
      )}
      <div className="pt-4 flex gap-2 items-center">
        {imageUrls && imageUrls?.length > 0 ? (
          <p className="border p-2 rounded-lg">Selected {imageUrls.length} / 4 images</p>
        ) : (
          <>
            <p className="border p-2 rounded-lg">Selected 0 / 4 images</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
