import { z } from "zod";

export const formSchema = z.object({
  folderName: z.string().min(2, {
    message: "Folder name must be at least 2 characters.",
  }),
});
