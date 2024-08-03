"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useRef, useState } from "react";
import { createFolder } from "@/app/actions/actions";
import { formSchema } from "@/app/validations/folder-validation";
import { useAction } from "next-safe-action/hooks";
import { Loader } from "lucide-react";
import { Folder, type LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type NewFolderModalProps = {
  icon: LucideIcon;
  label: string;
};

// main render
export const NewFolderModal = ({ icon: Icon, label }: NewFolderModalProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const { execute, result, isExecuting } = useAction(createFolder, {
    onSuccess() {
      ref.current?.reset();
      setIsOpen(false);
      toast({
        description: "✅ folder created",
      });
      router.push("/dashboard");
    },
    onError(error) {
      console.log("error", error);
      toast({
        description: "🚫 there was an error",
      });
      setIsOpen(true);
    },
  });

  // form validation here, so that I don't have to do it int the sercer
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      folderName: "",
    },
  });

  function handleSubmit(values: any) {
    const result = execute(form.getValues());
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="w-[150px] py-4 cursor-pointer hover:bg-gray-300/20 rounded-md gap-3 border h-auto px-4  group  flex flex-col items-start">
          <Icon size="16" className="group-hover:text-red-400" />
          <p className="text-xs">{label}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a folder</DialogTitle>
          <DialogDescription>
            Enter the folder name and click create.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            ref={ref}
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="folderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Folder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Folder name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isExecuting}>
              {isExecuting ? (
                <Loader className="animate-spin size-7" />
              ) : (
                "Create"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
