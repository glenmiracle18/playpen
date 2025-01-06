"use server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import prisma from "@/lib/db";

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const acceptedTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/svg+xml",
];
const maxFileSize = 1024 * 1024 * 10; // 10MB

export async function getSignedURL(
  type: string,
  size: number,
  checksum: string,
  name: string,
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // error handling
  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!acceptedTypes.includes(type)) {
    return { error: { message: "Invalid file type" } };
  }

  if (size > maxFileSize) {
    return { error: { message: "File is too large" } };
  }

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: name,
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checksum,
    Metadata: {
      userId: user?.id,
    },
  });

  const signedUrl = await getSignedUrl(s3, putObjectCommand, { expiresIn: 60 });

  console.log(signedUrl.split("?")[0])
 
  return { success: { url: signedUrl } };
}
