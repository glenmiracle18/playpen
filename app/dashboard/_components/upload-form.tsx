"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";
import { FileUpload } from "./file_upload";

// interface props
interface UploadFormProps {
  initialData: Course;
  folderId: string;
}

// form schema
const formSchema = z.object({
  filePath: z.string().min(1, {
    message: "File is required",
  }),
});

// functional component
const UploadForm = ({ initialData, courseId }: UploadFormProps) => {
  // state for editing mode
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  // form hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      filePath: "",
    },
  });

  // form state
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();

  // form methods
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast({
        description: "✅ Upload coomplete successfully.",
      });
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.log(error);
      toast({
        description: "🚫 Unsupported file type.",
      });
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Add a file
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}

          {!isEditing && !initialData.fileUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}

          {!isEditing && initialData.fileUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.fileUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="rounded-md object-cover"
              src={initialData.fileUrl}
            />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="fileUploader"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: fileurl });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ration recommended
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
