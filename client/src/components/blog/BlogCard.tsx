import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart,  BookOpen } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { deleteBlog, likeBlog } from "@/redux/actions/blogAction";
import { Trash2 } from "lucide-react";
import useAuth from "@/hooks/auth";
import UpdateDialog from "../elements/UpdateDialog";
import { CommentDialog } from "../elements/Comment";
import defaultImg from '@/assets/image/default.avif'
import BlogDetailsDialog from "../elements/BlogDetailsDialog";

const BlogCard = () => {
  const { blogs } = useAppSelector((state) => state.blog);
  const dispatch = useAppDispatch();
  const { userData } = useAuth();
  
  const handleLike = (id: string) => dispatch(likeBlog(id));
  

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-6 text-center">
        <div className="bg-blue-50 p-6 rounded-full animate-pulse">
          <BookOpen className="w-12 h-12 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">No blogs yet</h2>
        <p className="text-gray-600 max-w-md text-lg">
          We couldn't find any articles. Check back soon for new stories!
        </p>
        <Button className="mt-4 px-6 py-3 text-lg">Refresh page</Button>
      </div>
    );
  }

  const handleDelete = (id: string) => dispatch(deleteBlog(id))
  

  return (
    <div className="container py-8 px-4 sm:px-6">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          <span className="bg-gradient-to-r from-orange-600 to-cyan-600 bg-clip-text text-transparent">
            Explore Stories
          </span>
        </h1>
        <p className="mt-4 text-lg text-gray-800 max-w-2xl mx-auto">
          Discover articles for readers of all ages
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs?.map((blog) => {
          return (
          <Card
            key={blog._id}
            className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02]"
          >

            <div className="relative aspect-[16/9] w-full">
              <img
                src={blog.img || defaultImg}
                alt={blog.title}
                className="object-cover w-full h-56"
                loading="lazy"
              />
            </div>


            <CardHeader className="pb-3 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-100 text-blue-800 text-lg">
                      {blog.userId?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{blog.userId?.name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {userData?._id === blog.userId?._id && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                        aria-label="Edit blog"
                      >
                       <UpdateDialog blog={blog} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-500 hover:text-red-600 transition-colors"
                        aria-label="Delete blog"
                        onClick={() => handleDelete(blog?._id)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </>
                  )}
                </div>

              </div>

              <CardTitle className="text-xl md:text-2xl line-clamp-2 leading-snug font-semibold">
                {blog.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-grow pb-4">
              <p className="text-gray-700 line-clamp-3 text-base md:text-lg leading-relaxed">
                {blog.description?.slice(0, 150)}...
              </p>
            </CardContent>

            <CardFooter className="flex justify-between pt-0 border-t">
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(blog._id)}
                 className="cursor-pointer"
                >
                  <Heart
                    size={18}
                    className={blog.likes.includes(userData?._id || "") ? "animate-pulse text-red-500" : "text-gray-400"}
                    fill={blog.likes.includes(userData?._id || '') ? "red" : "transparent"}                    
                    />
                  <span className="text-sm font-medium">
                    {blog?.likes.length || 0}
                  </span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                  aria-label="Comment on this post"
                >
                  
                  <span className="text-sm font-medium"><CommentDialog commentsData={blog?.comments} blogId={blog._id} /></span>
                </Button>
              </div>

           <BlogDetailsDialog blog={blog} />
            </CardFooter>
          </Card>
        )})}
      </div>
    </div>
  );
};

export default BlogCard;