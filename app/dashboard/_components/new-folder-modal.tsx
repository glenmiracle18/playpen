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
import { useState } from "react";
import { Loader } from "lucide-react";

const formSchema = z.object({
  folderName: z.string().min(2, {
    message: "Folder name must be at least 2 characters.",
  }),
});

async function createFolder(
  values: { folderName: string },
  toast: any,
  setLoading: (loading: boolean) => void,
) {
  try {
    setLoading(true);
    console.log("Creating folder with values:", values);
    const response = await fetch("/api/folder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create folder");
    }
    toast({
      description: `✅ ${values.folderName} Folder created`,
    });
    console.log(`✅ ${values.folderName} Folder created`);
  } catch (error) {
    console.error("Error:", error);
    toast({
      description: `🚫 There was an error`,
      status: "error",
    });
  } finally {
    setLoading(false);
  }
}

// main render
export function NewFolderModal() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      folderName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createFolder(values, toast, setLoading);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[100px] px-4" variant="secondary">
          Create Folder
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a folder</DialogTitle>
          <DialogDescription>
            Enter the folder name and click create.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <Button type="submit" disabled={loading}>
              {loading ? <Loader className="animate-spin size-7" /> : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
