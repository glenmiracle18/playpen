"use client";
// actions imports
import {
  getFavoriteFoldersAction,
  getFoldersAction,
  markFavoriteFolderAction,
} from "@/app/actions/actions";

import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { ResourceItem } from "./resource-item";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface AllFoldersProps {
  state?: string;
}

export const AllFolders = ({ state }: AllFoldersProps) => {
  // const { executeAsync, isExecuting, result, hasErrored } =
  //   useAction(getFolders);

  // useEffect(() => {
  //   executeAsync({ state: state});
  // }, [executeAsync]);
  // Ensure the dependency array is correct
  // TODO: add a dependency array, that always checks the db to see if the folder has changed, to update it life
  // can also do revalidate the path, when a new folder is created or updated

  // fetching favfolders with tanstack query
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["state", state],
    queryFn: () => getFoldersAction({ state }),
    staleTime: 60000, // Data will be considered fresh for 1 minute
  });

  if (isError) {
    console.log(error);
    return <div>Error loading folders</div>;
  }

  // @ts-ignore
  return (
    // TODO: add scroll bar and static element
    <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-2 gap-2 grid-cols-1 ">
      {isLoading && (
        <div className="flex animate-pulse flex-col items-center justify-center gap-4 h-[500px]">
          <p>Loading...</p>
          <Image
            src="/loading.png"
            width="350"
            height="350"
            alt="Hero"
            className=""
          />
        </div>
      )}
      {data?.data?.data?.map((folder, idx) => (
        <ResourceItem
          url={`/dashboard/folder/${folder.folder_id}`}
          name={folder.folder_name}
          folder_id={folder.folder_id}
          key={folder.folder_name}
        />
      ))}
    </div>
  );
};
