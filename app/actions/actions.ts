"use server";
import prisma from "@/lib/db";
import { actionClient } from "@/lib/safe-action";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { fileSchema, formSchema } from "../validations/folder-validation";
import { NextResponse } from "next/server";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// createFolder action
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
      revalidatePath("/dashboard");
    } catch (e) {
      console.log("Folders Error: ", e);
      throw new Error("Failed to create folder");
    }
    // revalidatePath("/dashboard", "page");
  });

// getFolders
export const getFoldersAction = actionClient
  .schema(
    z.object({
      state: z.string().optional(),
    }),
  )
  .action(async ({ parsedInput: { state } }) => {
    try {
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      if (!user || !user.id) {
        throw new Error("Unauthorized");
      }

      let folderQuery: any = {};

      if (state?.toLowerCase() === "favorites") {
        folderQuery = {
          orderBy: {
            updated_at: "desc",
          },
          where: {
            user_id: user.id,
            is_favorite: true,
          },
          cacheStrategy: { ttl: 60 },
        };
      } else if (state?.toLowerCase() === "recents") {
        folderQuery = {
          orderBy: {
            updated_at: "desc",
          },
          where: {
            user_id: user.id,
          },
        };
      } else {
        folderQuery = {
          orderBy: {
            created_at: "desc",
          },
          where: {
            user_id: user.id,
          },
        };
      }

      const folders = await prisma.folder.findMany(folderQuery);
      // would rather just return it like this instead of NextResponse.json
      return { data: folders };
    } catch (e) {
      console.error("Folders Error:", e);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
    }
  });

// getFiles by folderId
//
// will generally be returning plain js, since I hace next-safe-action
// as NextResponse is interfering with my return value type.
// I'll rather throw a new error in my catch block'

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
        throw new Error("Unauthorized");
      }
      const files = await prisma.file.findMany({
        where: {
          folder_id: folderId,
        },
        orderBy: {
          uploaded_at: "desc",
        },
      });

      return { data: files };
    } catch (e) {
      console.log("[GET_FILES: ]", e);
      return { error: "Failed to fetch files" };
    }
  });

// create/upload files actions
const uploadFileSchema = z.array(
  z.object({
    folder_id: z.string(),
    file_path: z.string(),
    file_type: z.string(),
    file_size: z.number(),
    file_name: z.string(),
  }),
);
export type UploadFileType = z.infer<typeof uploadFileSchema>;

export const uploadFileAction = actionClient
  .schema(uploadFileSchema)
  .action(async ({ parsedInput }) => {
    try {
      const { getUser } = getKindeServerSession();
      const user = await getUser();
      if (!user || !user.id) {
        throw new Error("Unauthorized");
      }

      const files = await prisma.file.createMany({
        data: parsedInput.map((value) => ({
          ...value,
          user_id: user.id as string,
          is_shared: false,
        })),
      });

      // revalidatePath(`/dashboard/folder/${parsedInput[0].folder_id}`);
      return { data: files };
    } catch (e) {
      console.log("Upload Files: ", e);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
    }
  });

// get favorite files
export const getFavoriteFilesAction = actionClient.action(async () => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      throw new Error("Unauthorized");
    }

    const files = await prisma.file.findMany({
      where: {
        is_favorite: true,
      },
    });
    return { data: files };
  } catch (e) {
    console.log("Favorite Files: ", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
});

// create favorite files
export const markFavoriteFilesAction = actionClient
  .schema(
    z.object({
      file_id: z.string(),
    }),
  )
  .action(async ({ parsedInput: { file_id } }) => {
    try {
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      if (!user || !user.id) {
        throw new Error("Unauthorized");
      }

      const favoriteFiles = await prisma.file.update({
        where: {
          file_id: file_id,

          // is_favorite: false, // this will be added later on
        },
        data: {
          is_favorite: true,
        },
      });

      return { success: true, message: "File marked as favorite" };
    } catch (e) {
      console.log("Favorite Files: ", e);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
    }
  });

// add folders to favorite
export const markFavoriteFolderAction = actionClient
  .schema(
    z.object({
      folder_id: z.string(),
    }),
  )
  .action(async ({ parsedInput: { folder_id } }) => {
    try {
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      if (!user || !user.id) {
        throw new Error("Unauthorized");
      }

      const favoriteFolders = await prisma.folder.update({
        where: {
          folder_id: folder_id,

          // is_favorite: false, // this will be added later on
        },
        data: {
          is_favorite: true,
        },
      });

      return { success: true, message: "Folder marked as favorite" };
    } catch (e) {
      console.log("Favorite Folder: ", e);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
    }
  });

// get favorite files
export const getFavoriteFoldersAction = actionClient.action(async () => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      throw new Error("Unauthorized");
    }

    const folders = await prisma.folder.findMany({
      where: {
        is_favorite: true,
      },
    });
    return { data: folders };
  } catch (e) {
    console.log("Favorite folder: ", e);
    throw new Error("Internal Server Error");
  }
});

export const shareFolder = actionClient
  .schema(
    z.object({
      folderId: z.string(),
    }),
  )
  .action(async ({ parsedInput: { folderId } }) => {
    try {
      // public link combination
      const publicLink = uuidv4();

      const { getUser } = getKindeServerSession();
      const user = await getUser();

      if (!user || !user.id) {
        throw new Error("Unauthorized");
      }

      const alreadyShared = await prisma.shareFolder.findFirst({
        where: {
          folder_id: folderId,
        },
      });

      if (alreadyShared) {
        return { sharedLink: alreadyShared.public_id };
      }

      const sharedFolder = await prisma.shareFolder.create({
        data: {
          folder_id: folderId,
          shared_with_user_id: user.id,
          public_id: publicLink,
          access_level: "VIEW",
        },
      });

      // update the is_shared flag on the folder
      await prisma.folder.update({
        where: { folder_id: folderId },
        data: {
          is_shared: true,
        },
      });

      return { sharedLink: sharedFolder.public_id };
    } catch (e) {
      console.log("Share folder: ", e);
      throw new Error("Internal Server Error");
    }
  });

// check if a folderId is shared
// folderId not folder itselft
export const getSharedFolderMetadataAction = actionClient
  .schema(
    z.object({
      publickLinkId: z.string(),
    }),
  )
  .action(async ({ parsedInput: { publickLinkId } }) => {
    try {
      // no need to verify if user is authenticated
      const sharedFolder = await prisma.shareFolder.findUnique({
        where: {
          public_id: publickLinkId,
        },
        include: {
          folder: {
            include: {
              files: true,
            },
          },
        },
      });

      if (!sharedFolder) {
        throw new Error("Shared folder not found");
      }

      console.log("Shared file: ", sharedFolder.folder.files);

      return {
        files: sharedFolder.folder.files,
        folder_name: sharedFolder.folder.folder_name,
        folder_id: sharedFolder.folder_id,
        public_link: sharedFolder.public_id,
        access_level: sharedFolder.access_level,
      };
    } catch (e) {
      console.log("Share folder: ", e);
      throw new Error("Internal Server Error");
    }
  });

// now get the folders
export const getSharedFoldersAction = actionClient
  .schema(
    z.object({
      folderId: z.string(),
    }),
  )
  .action(async ({ parsedInput: { folderId } }) => {
    try {
      // no need to verify if user is authenticated

      const folders = await prisma.folder.findMany({
        where: {
          folder_id: folderId,
        },
      });
      // would rather just return it like this instead of NextResponse.json
      return { data: folders };
    } catch (e) {
      console.error("Folders Error:", e);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
    }
  });

// now get sharedFilesin the SharedFolder
export const getSharedFilesAction = actionClient
  .schema(
    z.object({
      folderId: z.string(),
    }),
  )
  .action(async ({ parsedInput: { folderId } }) => {
    try {
      // no need to verify if user is authenticated

      const files = await prisma.file.findMany({
        where: {
          folder_id: folderId,
        },
      });

      const fileCount = files.length;
      const totalSizeinBytes = files.reduce(
        (sum, file) => sum + file.file_size,
        0,
      );

      // convert total size to MB for readability
      const totalSizeMB = totalSizeinBytes / (1024 * 1024);

      // would rather just return it like this instead of NextResponse.json
      return { data: files, fileCount, totalSizeMB: totalSizeMB.toFixed(2) };
    } catch (e) {
      console.error("File Error:", e);
      throw new Error("File error");
    }
  });

export const getAllFilesAction = actionClient.action(async () => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      throw new Error("Unauthorized");
    }
    const files = await prisma.file.findMany();

    const fileCount = files.length;
    const totalSizeinBytes = files.reduce(
      (sum, file) => sum + file.file_size,
      0,
    );

    // convert total size to MB for readability
    const totalSizeMB = totalSizeinBytes / (1024 * 1024);

    // would rather just return it like this instead of NextResponse.json
    return { data: files, fileCount, totalSizeMB: totalSizeMB.toFixed(2) };
  } catch (e) {
    console.error("File Error:", e);
    throw new Error("File error");
  }
});

export const deleteFileAction = actionClient
  .schema(
    z.object({
      fileId: z.string(),
    }),
  )
  .action(async ({ parsedInput: { fileId } }) => {
    try {
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      if (!user || !user.id) {
        throw new Error("Unauthorized");
      }

      const deletedFile = await prisma.file.delete({
        where: {
          file_id: fileId,
        },
      });

      return { data: deletedFile, success: true };
    } catch (e) {
      console.error("File Deletion Error", e);
      throw new Error("File Deletion Error");
    }
  });
