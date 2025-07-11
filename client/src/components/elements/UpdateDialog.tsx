import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Pencil } from "lucide-react";
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { Textarea } from "@/components/ui/textarea";
  import { useForm } from "react-hook-form";
  import blogValidation from "@/validations/blog/blogValidation";
  import { zodResolver } from "@hookform/resolvers/zod";
  import type z from "zod";
import type { Blog } from "@/types";
import { useAppDispatch } from "@/hooks/hooks";
import { updateBlog, uploadImage } from "@/redux/actions/blogAction";
import { useState } from "react";
  
  type blogForm = z.infer<typeof blogValidation>;
  
  const fields = ["title", "description", "img"] as const;
  type FieldName = typeof fields[number];
  
  const UpdateDialog = ({blog}:{blog:Blog}) => {
    const dispatch = useAppDispatch();
    const [file, setFile] = useState<File | null>(null);

    const form = useForm<blogForm>({
      resolver: zodResolver(blogValidation),
      defaultValues: {
        title: blog.title || "",
        description: blog.description || "",
        img:  "",
      },
    });
  
    const onUpdateSubmit = (values: blogForm) => {
        const formData = new FormData();
        if (values.img) {
          formData.append('img', file);
          dispatch(uploadImage(formData,blog._id));
        }
      dispatch(updateBlog(values, blog._id));
    };
  
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Edit blog">
            <Pencil size={18} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl sm:rounded-2xl p-6 bg-white shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Update Blog</DialogTitle>
            <DialogDescription>
              Make changes to your blog below and submit.
            </DialogDescription>
          </DialogHeader>
  
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onUpdateSubmit)}
              className="space-y-4 mt-4"
            >
              {fields.map((fieldName: FieldName) => (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                      </FormLabel>
                      <FormControl>
                      {fieldName === 'img' ? (
                        <Input
                          type="file"
                          className="cursor-pointer"
                          onChange={(e) => {
                            const selectedFile = e.target.files?.[0];
                            if (selectedFile) {
                              setFile(selectedFile);
                              form.setValue('img', selectedFile.name); 
                            }
                          }}
                        />
                      ) : fieldName === 'description' ? (
                        <Textarea
                          placeholder={`Enter your ${fieldName}`}
                          {...field}
                        />
                      ) : (
                        <Input
                          type="text"
                          placeholder={`Enter your ${fieldName}`}
                          {...field}
                        />
                      )}
                      </FormControl>
                      {fieldName !== "img" && <FormMessage />}
                    </FormItem>
                  )}
                />
              ))}
  
              <Button
                type="submit"
                className="w-full mt-6"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Updating..." : "Update"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default UpdateDialog;
  