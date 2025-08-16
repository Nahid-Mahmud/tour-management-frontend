import SingleImageUploader from "@/components/SingleImageUploader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateDivisionMutation } from "@/redux/features/division/division.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formInterface = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(100, { message: "Name must be at most 100 characters long." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." })
    .max(500, { message: "Description must be at most 500 characters long." }),
});

type FormData = z.infer<typeof formInterface>;

export default function AddDivisionModal() {
  const [image, setImage] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [createDivisionFn, { isLoading: divisionLoading }] = useCreateDivisionMutation();

  console.log(image);

  const form = useForm<FormData>({
    resolver: zodResolver(formInterface),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const submit = async (data: z.infer<typeof formInterface>) => {
    console.log(data);
    try {
      //

      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          name: data.name,
          description: data.description,
        })
      );

      if (image) {
        formData.append("file", image);
      }

      const res = await createDivisionFn(formData).unwrap();
      if (res.success) {
        toast.success("Division created successfully");
        setOpen(false);
        form.reset();
        setImage(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create division");
      //
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add Division</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Division</DialogTitle>
            <DialogDescription>Add a new division to the system.</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Tour Type" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Add tour type name here. This will be used to categorize tours.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">Add a description for the tour type here.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={divisionLoading} type="submit">
                Submit
              </Button>
            </form>
            <SingleImageUploader onChange={setImage} />
          </Form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
