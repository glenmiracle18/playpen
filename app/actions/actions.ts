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
      return NextResponse.json(files);
    } catch (e) {
      console.log("[GET_FILES: ]", e);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  });

// create/upload files actions
