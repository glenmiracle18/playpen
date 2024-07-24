import { ourFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "@/components/ui/use-toast";
import { UploadDropzone } from "@/utils/uploadthing";

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
          title: `❇️ Suuccess`,
          description: ` Your file has been uploaded`,
        });
      }}
      onUploadError={(error: Error) => {
        toast({
          title: `⛔️ Error`,
          description: ` Could not upload file`,
        });
      }}
    />
  );
};
