"use client";
import { FileUpload } from "./file-upload";

interface UploaderProps {
  folderId: string;
  onUploadComplete: () => void;
}

const Uploader = ({ folderId, onUploadComplete }: UploaderProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload folderId={folderId} onUploadComplete={onUploadComplete} />
    </div>
  );
};

export default Uploader;
