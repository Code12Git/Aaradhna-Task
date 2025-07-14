import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { useAppDispatch } from "@/hooks/hooks";
import { createBlog } from "@/redux/actions/blogAction";
import { useState } from "react";
import { suggestedBlog } from "@/helpers/geminiai";

type blogForm = z.infer<typeof blogValidation>;

const fields = ['title', 'description', 'img'] as const;
type FieldName = typeof fields[number];

export default function CreateBlog() {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [isSuggesting, setIsSuggesting] = useState(false); // Added missing state

  const form = useForm<blogForm>({
    resolver: zodResolver(blogValidation),
    defaultValues: {
      title: '',
      description: '',
      img: '',
    },
  });

  const onBlogSubmit = (value: blogForm) => {
    const formData = new FormData();
    formData.append('title', value.title);
    formData.append('description', value.description);
    if (file) {
      formData.append('img', file);
    }
    dispatch(createBlog(formData));
  };

  const suggestBlogData = async () => {
    try {
      setIsSuggesting(true);
      const responseText = await suggestedBlog();
      
      // More robust extraction
      const titleMatch = responseText?.match(/Title:\s*(.+?)(?:\n|Description:|$)/s);
      const descMatch = responseText?.match(/Description:\s*(.+)/s);
      
      const blogData = {
        title: titleMatch?.[1]?.trim() || "No title generated",
        description: descMatch?.[1]?.trim() || "No description generated"
      };
      
      form.setValue('title', blogData.title);
      form.setValue('description', blogData.description);
    } catch (error) {
      console.error("Error suggesting blog:", error);
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white shadow-xl rounded-2xl px-6 py-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create New Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onBlogSubmit)} className="space-y-4">
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
                            accept="image/*"
                            className="cursor-pointer"
                            onChange={(e) => {
                              const selectedFile = e.target.files?.[0];
                              if (selectedFile) {
                                setFile(selectedFile);
                                form.setValue('img', selectedFile.name, { shouldValidate: true });
                              } else {
                                setFile(null);
                                form.setValue('img', '', { shouldValidate: true });
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1 mt-4 cursor-pointer"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? 'Creating...' : 'Create'}
                </Button>
                <Button
                  type="button"
                  onClick={suggestBlogData}
                  className="flex-1 mt-4 cursor-pointer bg-red-400 hover:bg-red-500 transition hover:scale-105 delay-150"
                  disabled={isSuggesting}
                >
                  {isSuggesting ? 'Generating...' : 'AI Suggestions'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}