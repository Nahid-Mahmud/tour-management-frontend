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
import { useCreateTourTypeMutation } from "@/redux/features/tour/tour.api";
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
});

type FormData = z.infer<typeof formInterface>;

export default function AddTourTypesModal() {
  const [open, setOpen] = useState(false);
  const [createTourTypeFn, { isLoading: tourTypeLoading }] = useCreateTourTypeMutation();

  const form = useForm<FormData>({
    resolver: zodResolver(formInterface),
    defaultValues: {
      name: "",
    },
  });

  const submit = async (data: z.infer<typeof formInterface>) => {
    try {
      const res = await createTourTypeFn(data).unwrap();
      if (res.success) {
        toast.success("Tour type created successfully!");
        form.reset();
        // close dialog
        setOpen(false);
      }
    } catch (error) {
      console.error("Failed to create tour type:", error);
      toast.error("Failed to create tour type.");
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add Tour Type</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Tour Type</DialogTitle>
            <DialogDescription>Add a new tour type to the system.</DialogDescription>
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
              <Button disabled={tourTypeLoading} type="submit">
                Submit
              </Button>
            </form>
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
