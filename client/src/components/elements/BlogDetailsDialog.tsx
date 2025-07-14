import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import type { Blog } from "@/types"
import { ArrowRight } from "lucide-react"
import defaultImg from '@/assets/image/default.avif'
import { Avatar, AvatarFallback } from "../ui/avatar";
const BlogDetailsDialog = ({ blog }: { blog: Blog }) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer group">
            <p className="text-blue-600 group-hover:text-blue-800 transition-colors">Read more</p>
            <ArrowRight size={18} className="text-blue-600 group-hover:translate-x-1 transition-transform" />
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-blue-100 text-blue-800 text-lg">
                  {blog.userId?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-left">{blog.userId?.name}</DialogTitle>
                <DialogDescription className="text-left">
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-6">
              <img
                src={blog.img || defaultImg}
                alt={blog.title}
                className="object-cover w-full h-full"
              />
            </div>
            
            <h2 className="text-3xl font-bold tracking-tight">{blog.title}</h2>
            
            <div className="prose max-w-none prose-lg dark:prose-invert">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {blog.description}
              </p>
            </div>
            
          
          </div>
        </DialogContent>
      </Dialog>
    );
  };


export default BlogDetailsDialog