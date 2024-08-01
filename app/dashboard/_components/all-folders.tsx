"use client";
import { getFolders } from "@/app/actions/actions";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { ResourceItem } from "./resource-item";

export const AllFolders = () => {
  const { executeAsync, isExecuting, result, hasErrored } =
    useAction(getFolders);

  useEffect(() => {
    executeAsync();
  }, [executeAsync]);
  // Ensure the dependency array is correct
  // TODO: add a dependency array, that always checks the db to see if the folder has changed, to update it life
  // can also do revalidate the path, when a new folder is created or updated

  if (isExecuting) {
    return <div>Loading...</div>;
  }

  if (hasErrored) {
    return <div>Error loading folders</div>;
  }
  const { data, serverError } = result;

  // console.log(data?.data?.[0].folder_name);

  // @ts-ignore
  return (
    // TODO: add scroll bar and static element
    <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-2 grid-cols-1 ">
      {data?.data?.map((folder, idx) => (
        <ResourceItem
          url={`/dashboard/folder/${folder.folder_id}`}
          name={folder.folder_name}
          key={folder.folder_name}
        />
      ))}
    </div>
  );
};
