"use server";
import prisma from "@/lib/db";
import { actionClient } from "@/lib/safe-action";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { fileSchema, formSchema } from "../validations/folder-validation";
import { NextResponse } from "next/server";
import { z } from "zod";

export const createFolder = actionClient
  .schema(formSchema)
  .action(async ({ parsedInput: { folderName } }) => {
    try {
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      if (!user || !user.id) {
        throw new Error("Unauthorized");
      }

      const folder = await prisma.folder.create({
        data: {
          folder_name: folderName as string,
          user_id: user.id,
        },
      });
    } catch (e) {
      console.log("Folders Error: ", e);
      throw new Error("Failed to create folder");
    }
    // revalidatePath("/dashboard", "page");
  });

// getFolders
export const getFolders = actionClient.action(async () => {
  try {
    const folders = await prisma.folder.findMany();
    // would rather just return it like this instead of NextResponse.json
    return { data: folders };
  } catch (e) {
    console.error("Folders Error:", e);
    return { error: "Failed to fetch folders" };
  }
});

// getFiles by folderId
//

function serializeData(data: any): any {
  return JSON.parse(JSON.stringify(data));
}

export const getFilesAction = actionClient
  .schema(
    z.object({
      folderId: z.string(),
    }),
  )
  .action(async ({ parsedInput: { folderId } }) => {
    try {
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      if (!user || !user.id) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
      const files = await prisma.file.findMany({
        where: {
          folder_id: folderId,
        },
      });

      return { data: files };
    } catch (e) {
      console.log("[GET_FILES: ]", e);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  });

// create/upload files actions
const uploadFileSchema = z.object({
  values: z.object({
    folder_id: z.string(),
    file_path: z.string(),
    file_type: z.string(),
    file_size: z.number(),
    file_name: z.string(),
  }),
});
export type UploadFileType = z.infer<typeof uploadFileSchema>;

export const uploadFileAction = actionClient
  .schema(uploadFileSchema)
  .action(async ({ parsedInput: { values } }) => {
    try {
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      if (!user || !user.id) {
        return new NextResponse("Unauthorized", { status: 401 });
      }

      const files = await prisma.file.create({
        data: {
          folder_id: values.folder_id,
          file_path: values.file_path,
          file_type: values.file_type,
          file_name: values.file_name,
          user_id: user.id as string,
          is_shared: false,
          file_size: values.file_size,
        },
      });
      revalidatePath(`/dashboard/folder/${values.folder_id}`);
      return { data: files };
    } catch (e) {
      console.log("Upload Files: ", e);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  });
