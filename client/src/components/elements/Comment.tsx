"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { createComment, deleteComment } from "@/redux/actions/blogAction";
import { DeleteIcon, MessageCircle } from "lucide-react";
import type { Comment } from "@/types";





interface CommentDialogProps {
  commentsData: Comment[];
  blogId: string;
}

export function CommentDialog({ commentsData = [], blogId }: CommentDialogProps) {
  const dispatch = useAppDispatch()
  const [open, setOpen] = React.useState(false);
  const [newComment, setNewComment] = React.useState("");
  const { userData } = useAppSelector(state => state.auth)



  const handleAddComment = () => {
    dispatch(createComment(blogId, newComment))
    setNewComment("");
  };

  const commentDeleteHandler = (commentId:string) => {
      dispatch(deleteComment(commentId,blogId))
  }



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className=" cursor-pointer text-indigo-600">
          <MessageCircle size={18} /> Comments ({commentsData.length})
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg max-w-xs">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>

        <div className="max-h-80 overflow-y-auto space-y-4 mb-4">
          {commentsData.length === 0 && <p>No comments yet.</p>}
          {commentsData.map((comment) => {
            return (
              <div key={comment._id} className="flex  justify-between">
                <div className="flex  gap-4">
                  <Avatar>
                    <AvatarImage src="" alt={comment.userId?.name} />
                    <AvatarFallback>{comment.userId?.name}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">{comment.userId?.username}</p>
                    <p className="text-gray-700">{comment.text}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                {comment?.userId?._id === userData?._id && <Button onClick={() => commentDeleteHandler(comment?._id)} variant='ghost' className="cursor-pointer text-blue-500 hover:scale-105 transform-3d delay-150 transition-shadow">
                  <DeleteIcon />
                </Button>}
              </div>

            )
          })}
        </div>

        <form
          className="flex space-x-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddComment();
          }}
        >
          <Input
            placeholder="Add a comment..."
            name="newComment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button
            type="submit"
            variant="default"
            className="cursor-pointer"
            disabled={!newComment.trim()}
          >
            Send
          </Button>
        </form>



      </DialogContent>
    </Dialog>
  );
}