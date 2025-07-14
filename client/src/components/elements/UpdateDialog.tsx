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
import { updateBlog } from "@/redux/actions/blogAction";
import { useState } from "react";
import { toast } from "react-hot-toast";

type blogForm = z.infer<typeof blogValidation>;

const fields = ["title", "description", "img"] as const;
type FieldName = typeof fields[number];

const UpdateDialog = ({ blog }: { blog: Blog }) => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(blog.img || null);

  const form = useForm<blogForm>({
    resolver: zodResolver(blogValidation),
    defaultValues: {
      title: blog.title || "",
      description: blog.description || "",
      img: blog?.img || "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      form.setValue("img", selectedFile.name);
      
      // Creating preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const onUpdateSubmit = async (values: blogForm) => {
    try {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        
        if (file) {
            formData.append('img', file);
        }

        console.log('Dispatching update with:', { 
            title: values.title, 
            hasFile: Boolean(file),
            blogId: blog._id
        });

        const result = await dispatch(updateBlog(formData, blog._id));
        console.log('Update result:', result);
        
    } catch (error) {
        console.error("Full update error:", {
            error,
            formValues: values,
            blogId: blog._id
        });
        toast.error("Failed to update blog");
    }
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
                        <div className="space-y-2">
                          <Input
                            type="file"
                            accept="image/*"
                            className="cursor-pointer"
                            onChange={handleFileChange}
                          />
                          {previewUrl && (
                            <div className="mt-2">
                              <img
                                src={previewUrl}
                                alt="Preview"
                                className="h-40 w-full object-cover rounded-md"
                              />
                            </div>
                          )}
                        </div>
                      ) : fieldName === 'description' ? (
                        <Textarea
                          placeholder={`Enter your ${fieldName}`}
                          {...field}
                          rows={6}
                        />
                      ) : (
                        <Input
                          type="text"
                          placeholder={`Enter your ${fieldName}`}
                          {...field}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button
              type="submit"
              className="w-full mt-6"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Updating..." : "Update Blog"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;