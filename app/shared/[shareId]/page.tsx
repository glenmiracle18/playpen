"use client";

import { useParams } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { getSharedFolderAction } from "@/app/actions/actions";
import { useEffect } from "react";

const Shared = () => {
  const pathname = useParams();
  const shareId = `${pathname.shareId}`;
  console.log(shareId);

  const { execute, result, isExecuting, hasErrored } = useAction(
    getSharedFolderAction,
    {
      onSuccess() {
        console.log(result.data?.access_level);
      },
    },
  );

  useEffect(() => {
    execute({ publickLinkId: shareId });
  }, [shareId, execute]);

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
      <h1>ShareId: {result.data?.public_link}</h1>
      <h1>AccessLevel: {result.data?.access_level}</h1>
    </div>
  );
};

export default Shared;
