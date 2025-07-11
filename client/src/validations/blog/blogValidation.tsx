import z from "zod";

const blogValidation = z.object({
  title: z.string({ required_error: "Title is required", invalid_type_error: "Title must be a string" })
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title cannot exceed 100 characters" })
    .trim(),

  description: z.string({ required_error: "Description is required", invalid_type_error: "Description must be a string" })
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(2000, { message: "Description cannot exceed 2000 characters" })
    .trim(),

    img: z.string().optional()


});

export default blogValidation;
