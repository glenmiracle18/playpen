"use client";

import { useParams } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { getSharedFolderAction } from "@/app/actions/actions";
import { useEffect } from "react";

const Shared = () => {
  const pathname = useParams();
  const publicId = `${pathname.publicId}`;
  console.log(publicId);

  const { execute, result, isExecuting, hasErrored } = useAction(
    getSharedFolderAction,
    {
      onSuccess() {
        console.log(result?.data);
      },
    },
  );

  useEffect(() => {
    execute({ publickLinkId: publicId });
  }, [publicId, execute]);

  if (isExecuting) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (hasErrored) {
    return (
      <div>
        <h1>There was an error</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>PublicId: {result?.data?.public_link}</h1>
      <h1>AccessLevel: {result?.data?.access_level}</h1>
    </div>
  );
};

export default Shared;
