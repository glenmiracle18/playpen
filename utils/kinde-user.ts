"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
export const KindeUser = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log("user", user);

  return user;
};
