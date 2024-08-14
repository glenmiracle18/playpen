"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Check, Copy, Send, Share, TicketX } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { shareFolder } from "@/app/actions/actions";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ShareFolderSheetProps {
  folder_id: string;
}

export function ShareFolderSheet({ folder_id }: ShareFolderSheetProps) {
  const [isSharedLinkGenerated, setIsSharedLinkGenerated] =
    useState<boolean>(false);
  const [sharedLink, setSharedLink] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // generate a shared link
  const { execute: share, isExecuting: isSharing } = useAction(shareFolder, {
    onSuccess(data) {
      setSharedLink(data?.data?.sharedLink); // Assuming the action returns { link: string }
      setIsSharedLinkGenerated(true);
      toast({
        title: "💚 Folder has been shared",
        description: "You can share this link with anyone to access the folder",
      });
    },
    onError(error) {
      console.log("error", error);
      toast({
        variant: "destructive",
        description: "failed to share folder",
      });
    },
  });

  const handleShare = () => {
    share({ folderId: folder_id });
  };

  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/shared/${sharedLink}`;
  const handleCopy = async () => {
    if (sharedLink) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setIsCopied(true);
        toast({
          description: "Link copied to clipboard",
        });
        setTimeout(() => setIsCopied(false), 2000); // Reset copy status after 2 seconds
      } catch (err) {
        console.error("Failed to copy text: ", err);
        toast({
          variant: "destructive",
          description: "Failed to copy link",
        });
      }
    }
  };

  // TODO: Verify if the folder already exist in the shareFolder table and mutate the render accordingly

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="gap-2 items-center justify-start text-start"
        >
          <Share
            className={cn("h-4 w-4 mr-2", {
              "text-red-600 animate-pulse": isSharedLinkGenerated,
            })}
          />
          Share Folder
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Share Folder</SheetTitle>
          <SheetDescription>
            Share this folder with others or get a public link.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {!isSharedLinkGenerated ? (
            <Button onClick={handleShare} disabled={isSharing}>
              {isSharing ? "Generating url..." : "Generate Share Link"}
            </Button>
          ) : (
            <div className="">
              <Label htmlFor="shareLink" className="text-right">
                Share Link
              </Label>
              <div className="flex flex-col gap-2 items-start">
                <Input
                  id="shareLink"
                  value={shareUrl || ""}
                  readOnly
                  className="col-span-3 w-full"
                />
                <span className="flex gap-4 items-center">
                  <Button onClick={handleCopy} variant="outline" size="icon">
                    {isCopied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Link
                    href={shareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      type="button"
                      disabled={!isSharedLinkGenerated}
                      variant="outline"
                      className="gap-2 flex p-2 items-center text-green-500"
                    >
                      Visit <Send size="20" />
                    </Button>
                  </Link>
                  <Button
                    type="button"
                    disabled
                    variant="destructive"
                    className="gap-2 flex p-2 items-center "
                  >
                    Destroy Link <TicketX size="20" />
                  </Button>
                </span>
              </div>
            </div>
          )}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" className="mt-8">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
