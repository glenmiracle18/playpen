import type { ourFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "@/components/ui/use-toast";
import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  endpoint: keyof typeof ourFileRouter;
  onChange: (url?: string) => void;
}

export const FileUpload = ({ endpoint, onChange }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
        toast({
          description: "✅ Upload complete successfully.",
        });
      }}
      onUploadError={(error: Error) => {
        toast({
          description: "📛 There was an error!.",
        });
      }}
    />
  );
};
