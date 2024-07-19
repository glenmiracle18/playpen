import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET() {
  try {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  } catch (err) {
    throw new Error("Something went wrong...");
  }

  let dbUser = await prisma.user.findUnique({
    data: {
      user_id: user.id,
      firstName: user.given_name ?? "",
      lastName: user.family_name ?? "",
      email: user.email ?? "",
    }
  })

}
