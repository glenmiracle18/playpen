"use client";
import { getFolders } from "@/app/actions/actions";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";

export const AllFolders = () => {
  const { executeAsync, isExecuting, result, hasErrored } =
    useAction(getFolders);

  useEffect(() => {
    executeAsync();
  }, []); // Ensure the dependency array is correct

  if (isExecuting) {
    return <div>Loading...</div>;
  }

  if (hasErrored) {
    return <div>Error loading folders</div>;
  }
  const { data, serverError } = result;

  console.log(data);

  return (
    <div>
      {/* {data ? (
        <ul>
          {data.map((folder) => (
            <li key={folder.id}>{folder.name}</li>
          ))}
        </ul>
      ) : (
        <div>No folders found</div>
      )} */}
    </div>
  );
};
