"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { uploadFileAction, type uploadFileSchema } from "@/app/actions/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import type { File } from "@prisma/client";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useState } from "react";
import { FileUpload } from "./file_upload";

// interface props
interface UploadFormProps {
  folderId: string;
}

// form schema
const formSchema = z.object({
  file_path: z.string().min(1, {
    message: "file is required",
  }),
});

// functional component
const UploadForm = ({ folderId }: UploadFormProps) => {
  // state for editing mode
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const { execute, result, isExecuting } = useAction(uploadFileAction, {
    onSuccess() {
      console.log("successfully created folder");
      toast({
        description: "✅ file uploaded",
      });
      router.refresh();
    },
    onError(error) {
      console.log("error", error);
      toast({
        description: "🚫 there was an error",
      });
    },
  });

  // form hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file_path: "",
    },
  });

  // form state
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();

  // form methods
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const filePath = form.getValues().file_path;
    type PayloadType = {
      values: typeof uploadFileSchema;
    };
    const payload: PayloadType = {
      values: {
        file_name: "asdf",
        folder_id: folderId,
        file_type: "img",
        file_size: 24,
        file_path: filePath,
      }, // place the values in a payload
    };
    const result = execute(payload.values);
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Add a file
      </div>
      {!isEditing &&
        (!initialData.file_path ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="rounded-md object-cover"
              src={initialData.file_path}
            />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="fileUploader"
            onChange={(url) => {
              if (url) {
                onSubmit({ file_path: url });
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadForm;
