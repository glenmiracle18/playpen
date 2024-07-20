import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    console.log("User:", user);

    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    console.log("Request Body:", data);
    const { folderName } = data;

    if (
      !folderName ||
      typeof folderName !== "string" ||
      folderName.length < 2
    ) {
      console.log("Invalid folder name:", folderName);
      return NextResponse.json(
        { message: "Invalid folder name" },
        { status: 400 },
      );
    }

    const folder = await prisma.folder.create({
      data: {
        folder_name: folderName,
        user_id: user.id,
      },
    });

    return NextResponse.json(folder);
  } catch (error) {
    console.log("FOLDERS Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
