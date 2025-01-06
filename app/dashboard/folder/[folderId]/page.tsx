"use client";
// import { getFiles } from "@/app/actions/actions";
import { useParams } from "next/navigation";
import { useState } from "react";
import { getFilesAction } from "@/app/actions/actions";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { IndividualFile } from "../../_components/file";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, Loader2, UploadIcon } from "lucide-react";
import Link from "next/link";
import { ShareFolderSheet } from "../../_components/shareFolder-sheet";
import Image from "next/image";
import { FileUpload } from "../../_components/file-uploader";

const FolderPage = () => {
  const { toast } = useToast();
  const pathname = useParams();
  // console.log(pathname.folderId);
  const folderId = `${pathname.folderId}`;
  const [files, setFiles] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // fetching with tanstack query
  const { data, isLoading, error } = useQuery({
    queryKey: ["files", folderId],
    queryFn: () => getFilesAction({ folderId }),
    staleTime: 60000, // Data will be considered fresh for 1 minute
  });
  // console.log(data?.data?.data);
  const allFiles = data?.data?.data;

  const handleUploadComplete = () => {
    setIsUploadModalOpen(false);
  };

  const handleUploadError = () => {
    setIsUploadModalOpen(false);
  };

  return (
    <div className="flex flex-col p-6 ">
      <span className="flex justify-between items-center">
        <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="w-[140px]" onClick={() => setIsUploadModalOpen(true)}>
              <UploadIcon className="mr-2 h-5 w-5" />
              Upload
            </Button>
          </DialogTrigger>
          <DialogContent className="md:max-w-[800px] max-w-[400px] ">
            <DialogTitle className="hidden md:hidden">Upload</DialogTitle>
            <DialogHeader>Select files to upload</DialogHeader>
            <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            <FileUpload onUploadComplete={handleUploadComplete} onUploadError={handleUploadError} folderId={folderId} />
</div>
          </DialogContent>
        </Dialog>
        <span className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              size="sm"
              className="my-4 w-28 hidden md:flex"
            >
              <ArrowLeft className="mr-2 h-5 w-5" /> Back
            </Button>
          </Link>
          <ShareFolderSheet folder_id={folderId} />
        </span>
      </span>
      {!allFiles ||
        (allFiles.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 h-[500px]">
            <p>No files found</p>
            <Image
              src="/no-data.png"
              width="250"
              height="250"
              alt="Hero"
              className=""
            />
          </div>
        ))}
      {isLoading ? (
        <div className="flex animate-pulse flex-col items-center justify-center gap-4 h-[500px]">
          <p>Loading...</p>
          <Image
            src="/loading.png"
            width="350"
            height="350"
            alt="Hero"
            className=""
          />
        </div>
      ) : (
        <div className="flex-grow overflow-auto mt-4 grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 grid-cols-1 p-4 md:p-6">
          {allFiles?.map((file) => (
            <IndividualFile key={file.file_id} file={file} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FolderPage;
