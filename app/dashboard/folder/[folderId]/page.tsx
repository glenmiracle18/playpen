"use client";

// import { getFiles } from "@/app/actions/actions";
import { useParams } from "next/navigation";
import Uploader from "../../_components/uploader";
import { useState, useEffect } from "react";
import { useAction } from "next-safe-action/hooks";
import { getFilesAction } from "@/app/actions/actions";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { IndividualFile } from "../../_components/file";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, Plus, UploadIcon } from "lucide-react";
import Link from "next/link";

const FolderPage = () => {
  const { toast } = useToast();
  const pathname = useParams();
  // console.log(pathname.folderId);
  const folderId = `${pathname.folderId}`;
  const [files, setFiles] = useState(null);

  // fetching with tanstack query
  const { data, isLoading, error } = useQuery({
    queryKey: ["files", folderId],
    queryFn: () => getFilesAction({ folderId }),
    staleTime: 60000, // Data will be considered fresh for 1 minute
  });
  // console.log(data?.data?.data);
  const allFile = data?.data?.data;

  return (
    <div className="flex flex-col p-6 ">
      <span className="flex justify-between items-center">
        <Dialog className="flex-1">
          <DialogTrigger asChild>
            <Button size="lg" className="w-28">
              <UploadIcon className=" text-white mr-2 h-5 w-5" />
              Upload
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>Upload Files Here</DialogHeader>
            <Uploader folderId={folderId} />

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        class
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="my-4 w-28">
            <ArrowLeft className="mr-2 h-5 w-5" /> Back
          </Button>
        </Link>
      </span>
      {isLoading ? (
        <div className="mt-4 flex items-center justify-center gap-4">
          <Loader2 className="animate-spin" size="50" />
          <p>Loading ...</p>{" "}
        </div>
      ) : (
        <div className="flex-grow overflow-auto mt-4 grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 grid-cols-1 p-4 md:p-6">
          {allFile?.map((file) => (
            <IndividualFile key={file.file_id} file={file} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FolderPage;
