import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { Progress } from "@/components/ui/progress";
import { toast } from "../../../components/ui/use-toast";
import { useUploadThing } from "@/utils/uploadthing";
import Dropzone, { type FileRejection } from "react-dropzone";
import { useAction } from "next-safe-action/hooks";
import { uploadFileAction } from "@/app/actions/actions";
import Image from "next/image";
import { getSignedURL } from "@/app/actions/s3action";
import { useRouter } from "next/navigation";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

interface FileUploadProps {
  folderId: string;
  onUploadComplete: () => void;
  onUploadError: () => void;
}

export const FileUpload = ({ folderId, onUploadComplete, onUploadError }: FileUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [uploadFailed, setUploadFailed ] = useState<boolean>(false);

  const router = useRouter();

  const { execute, result, isExecuting } = useAction(uploadFileAction, {
    onSuccess() {
      toast({
        description: "✅ Upload complete",
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

  //  a secure sha256 endcoding of the image parsed as a checksum
  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer); // encoding the buffer using sha256
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };
  // handle file upload to aws s3-bucket
  const handleFileUpload = async (files: File[]) => {
    try {
      setUploading(true);
      setFiles(files);
      const checksum = await computeSHA256(files[0]);

      // creates a signed url to aws for uploading
      const signedUrl = await getSignedURL(
        files[0].type,
        files[0].size,
        checksum,
        files[0].name,
      );
      
      const url = signedUrl.success?.url;
      if (!url) {
        throw new Error("Failed to get presigned url")
      }
      // log
      console.log(url)

      // upload action with the signedurl
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", url, true);
      xhr.setRequestHeader("Content-Type", files[0].type);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setUploadProgress(percentComplete);
        }
      };

      xhr.onload = async function() {
        if (xhr.status === 200) {
          // File uploaded successfully, now create a new file in the database
          const fileData = {
            folder_id: folderId,
            file_path: url.split("?")[0], // Remove query parameters
            file_type: files[0].type,
            file_size: files[0].size,
            file_name: files[0].name,
          };

          const result = execute([fileData]) as unknown; // Cast to unknown first
          if ((result as { data?: any }).data) { // Then cast to expected type
            setUploading(false);
            onUploadComplete(); // Call this to close the modal
            router.refresh(); // Refresh the page to show the new file
          } else {
            throw new Error("Failed to create file in database");
          }
        } else { // if the upload failed
          onUploadError();
          toast({
            description: "Upload Failed.",
            variant: "destructive",
          });
          throw new Error("Upload failed");
          
        }
      };

      xhr.onerror = function() {
        onUploadError();
          toast({
            description: "Upload Failed.",
            variant: "destructive",
          });
        throw new Error("Upload failed");
      };

      xhr.send(files[0]);
      
    } catch (e) {
      console.log(e);
      setStatusMessage("Error uploading file");
      setUploadComplete(false);
    }
  };

  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    handleFileUpload && handleFileUpload(newFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: true,
    noClick: true,
    onDrop: handleFileChange,
    onDropAccepted: (files) => {
      handleFileUpload(files);
    },

    onDropRejected: (rejectedFiles: FileRejection[]) => {
      const [file] = rejectedFiles;
      toast({
        description: "🚫 Unsupported file type.",
      });
    },
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          {uploading ? (
            <div className="flex flex-col items-center justify-center">
              <p className="text-neutral-700 dark:text-neutral-300 text-base font-bold">
                Uploading...
              </p>
              <p className="text-neutral-400 dark:text-neutral-400 text-base font-normal">
                Please wait
              </p>
            </div>
          ) : (
            <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
              Upload File
            </p>
          )}
          <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
            Drag or drop your files here or click to upload
          </p>

          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn(
                    "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                    "shadow-sm",
                  )}
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                    >
                      {file.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>

                  <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 "
                    >
                      {file.type}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                    >
                      modified{" "}
                      {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-4xl z-40 bg-white dark:bg-neutral-900 flex  items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]",
                  { "border-sky-400 border-dashed border-2": isDragActive },
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600  flex flex-col items-center"
                  >
                    Drop it
                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <span className="flex flex-col gap-2 items-center">
                    <Image
                      src="/icon.png"
                      alt="logo"
                      width={50}
                      height={50}
                      className="cursor-pointer rounded-lg"
                    />
                    <p className="text-primary text-md font-light font-serif">
                      Drop Here
                    </p>
                  </span>
                )}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
              ></motion.div>
            )}
          </div>
        </div>
      </motion.div>
      {uploading && (
        <div className="mt-4 flex flex-col items-center justify-center">
          <Progress value={uploadProgress} className="w-1/2" />
          <p className="text-sm text-center mt-2">{Math.round(uploadProgress)}% uploaded</p>
        </div>
      )}
    </div>
  );
}

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-neutral-950"
                  : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        }),
      )}
    </div>
  );
}