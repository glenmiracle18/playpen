"use client";
import { useUploadThing } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { useTransition } from "react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Dropzone, { type FileRejection } from "react-dropzone";
import { Loader2, MousePointerSquareDashed, ImageIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAction } from "next-safe-action/hooks";
import { uploadFileAction, type UploadFileType } from "@/app/actions/actions";
import { revalidatePath } from "next/cache";

interface UploaderProps {
  folderId: string;
}

const Uploader = ({ folderId }: UploaderProps) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  const [uploadProgress, setIsUploadProgress] = useState<number>(0);
  const router = useRouter();
  const [isPending, setIsPending] = useTransition();
  const { toast } = useToast();
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const { execute, result, isExecuting } = useAction(uploadFileAction, {
    onSuccess() {
      toast({
        description: "✅ file written in db sucessfully",
      });
      window.location.reload(); // this is a hack, I should use react-query to refetch the data
      // router.refresh
    },
    onError(error) {
      console.log("error", error);
      toast({
        description: "🚫 there was an error, please try again",
      });
    },
  });

  // handle upload state
  const { startUpload, isUploading } = useUploadThing("fileUploader", {
    onClientUploadComplete: ([data]) => {
      toast({
        description: "✅ Upload coomplete",
      });
      setUploadComplete(true);
      // revalidatePath(`/folder/${folderId}`);
      router.refresh();

      console.log(data);

      const filePath = data.url;
      const payload: UploadFileType = {
        values: {
          file_name: data.name,
          folder_id: folderId,
          file_type: data.type,
          file_size: data.size,
          file_path: filePath,
        }, // place the values in a payload
      };
      const result = execute({ values: payload.values });
      setFileUrl(data.url);
    },
    onUploadProgress(p) {
      setIsUploadProgress(p);
    },
  });

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;

    setIsDragOver(false);

    toast({
      description: "🚫 Unsupported file type.",
    });
  };

  const onDropAccepted = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles);

    setIsDragOver(false);
  };

  return (
    <div>
      <div
        className={cn(
          "relative h-[200px] flex-1 my-16 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex flex-col justify-center items-center ",
          { "ring-blue-900/25 bg-blue-900/10 border-dashed": isDragOver },
        )}
      >
        <div className="relative flex flex-1 flex-col items-center justify-center w-[300px]">
          <Dropzone
            onDropRejected={onDropRejected}
            onDropAccepted={onDropAccepted}
            accept={{
              "image/png": [".png"],
              "image/jpeg": [".jpeg"],
              "image/jpg": [".jpg"],
              "apllication/pdf": [".pdf"],
            }}
            maxFiles={5}
            onDragEnter={() => setIsDragOver(true)}
            onDragLeave={() => setIsDragOver(false)}
            multiple={true}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                className="h-full w-full flex flex-col items-center justify-center"
                {...getRootProps()}
              >
                <input {...getInputProps()} />

                {isDragOver ? (
                  <MousePointerSquareDashed className="size-6 text-zinc-500 mb-2" />
                ) : isUploading || isPending ? (
                  <Loader2 className="animate-spin size-6 text-zinc-500 mb-2" />
                ) : (
                  <ImageIcon className="size-6 text-zinc-500 mb-2" />
                )}

                <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                  {isUploading ? (
                    <div className="flex flex-col items-center">
                      <p>Uploading...</p>
                      <Progress
                        value={uploadProgress}
                        className="mt- w-40 h-2 bg-gray-300"
                      />
                      <p>{uploadProgress}%</p>
                    </div>
                  ) : isPending ? (
                    <div className="flex flex-col items-center">
                      <p>Redirecting, please wait ...</p>
                    </div>
                  ) : isDragOver ? (
                    <p>
                      <span className="font-semibold">Drop file here</span>
                    </p>
                  ) : (
                    <p>
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                  )}
                </div>

                {isPending ? null : (
                  <p className="text-xs text-zinc-500">PNG, JPG, JPEG</p>
                )}
              </div>
            )}
          </Dropzone>
          {/* TODO: add the functionality of adding mulitple or a single file and before uploading so that some files can be removed or still added */}
          {/* <Button variant="outline" type="submit" className="mt-8">
          Upload Files
        </Button> */}
        </div>
      </div>
    </div>
  );
};

export default Uploader;
