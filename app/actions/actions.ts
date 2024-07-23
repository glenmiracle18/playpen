"use server";
import prisma from "@/lib/db";
import { actionClient } from "@/lib/safe-action";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { formSchema } from "../validations/folder-validation";
import { NextResponse } from "next/server";

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
