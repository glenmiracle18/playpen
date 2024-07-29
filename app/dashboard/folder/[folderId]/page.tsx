"use client";

// import { getFiles } from "@/app/actions/actions";
import { useParams } from "next/navigation";
import Uploader from "../../_components/uploader";
import { useState } from "react";

const FolderPage = () => {
  const pathname = useParams();
  // console.log(pathname.folderId);
  const folderId = `${pathname.folderId}`;
  const [file, setFile] = useState(null);

  return (
    <div className="p-6 h-screen w-full">
      <Uploader folderId={folderId} />
      {/* <UploadForm folderId={folderId} /> */}
    </div>
  );
};

export default FolderPage;
