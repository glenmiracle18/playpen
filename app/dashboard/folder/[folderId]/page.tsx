"use client";

import { useParams, usePathname } from "next/navigation";

const FolderPage = () => {
  const pathname = useParams();
  // console.log(pathname.folderId);
  const folderId = pathname.folderId as string;

  return (
    <>
      <div>{folderId}</div>
    </>
  );
};

export default FolderPage;
