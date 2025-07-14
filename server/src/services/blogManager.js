const { blogModel } = require("../models");
const { AppError } = require("../utils");
const uploadImages = require("../utils/cloudinary");
const { CONFLICT, NOT_FOUND, INVALID_REQUEST_DATA } = require("../utils/errors");


const create = async (body,user,files) => {
    const {title,description,img} = body;
    try{
        const blogExist =  await blogModel.findOne({userId:user._id,title})
        if(blogExist) throw new AppError({...CONFLICT,message:'Blog already created by you using same title or description'})
            let imgUrl = null;
            if (files && files.img) {
                const imgLocalPath = files.img[0].path;
                const uploadedImage = await uploadImages(imgLocalPath);
                
                if (!uploadedImage || !uploadedImage.url) {
                    throw new AppError({...BAD_REQUEST,message: "Failed to upload image to Cloudinary"});
                }
                imgUrl = uploadedImage.url;
            }
        const blog = await blogModel.create({title,description,img:imgUrl,userId:user._id})
        return blog;
    }catch(err){
        throw err;
    }
}





const update = async (body, params, user, files) => {
    const { title, description } = body;
    const { id } = params;
    
    try {
        if (!title?.trim() && !description?.trim()) {
            throw new AppError({ ...INVALID_REQUEST_DATA, message: 'At least one of title or description is required' });
        }

        const blogExist = await blogModel.findOne({ _id: id, userId: user._id });
        if (!blogExist) throw new AppError({...NOT_FOUND, message: 'Blog not found'});

        // Initialize update object with existing image
        const updateData = {
            title: title || blogExist.title,
            description: description || blogExist.description,
            img: blogExist.img // Start with existing image
        };

        // Only update image if new one is provided
        if (files && files.img) {
            const imgLocalPath = files.img[0].path;
            const uploadedImage = await uploadImages(imgLocalPath);
            
            if (!uploadedImage || !uploadedImage.url) {
                throw new AppError({...BAD_REQUEST, message: "Failed to upload image to Cloudinary"});
            }
            updateData.img = uploadedImage.url;
        }

        const updatedBlog = await blogModel.findOneAndUpdate(
            { _id: id, userId: user._id },
            updateData,
            { new: true, runValidators: true }
        ).populate('userId', 'name _id');  // Consider keeping validators enabled
        if (!updatedBlog) throw new AppError({...NOT_FOUND, message: 'Blog not found after update'});
        return updatedBlog;
    } catch (err) {
        throw err;
    }
}

const deleteOne = async(user,params) => {
    const {id} = params;
    try{
        const blogExist = await blogModel.findOneAndDelete({ _id: id, userId: user._id });
        if(!blogExist) throw new AppError({...NOT_FOUND,message:'Blog doesnt exist'})
        return;
    }catch(err){
        throw err;
    }
}

const get = async(params) => {
    const { id } = params;
    try{
        const blog = await blogModel.findById(id)
        if(!blog) throw new AppError({...NOT_FOUND,message:'Blog doesnt exist'})
        return blog;   
    }catch(err){
        throw err;
    }
}


const getAll = async() => {
    try{
        const blog = await blogModel.find().populate('userId').populate('comments.userId')
        if(!blog.length) throw new AppError({...CONFLICT,message:'No blog found'})
        return blog;   
    }catch(err){
        throw err;
    }
}

const commentBlog = async (params, body, user) => {
    const { id } = params;
    const { text } = body;
  
    if (!text?.trim()) {
      throw new AppError({ ...INVALID_REQUEST_DATA, message: "Text is required" });
    }
  
    const blog = await blogModel.findById(id);
    if (!blog) {
      throw new AppError({ ...NOT_FOUND, message: "Blog not found" });
    }
  
    const comment = { userId: user._id, text, createdAt: new Date() };
    blog.comments.push(comment);
    await blog.save();
  
    const populatedBlog = await blogModel.findById(id).populate({
      path: "comments.userId",
      select: "name username",  
    });
  
    return populatedBlog;  
  };
  


const deleteComment = async (params, user) => {
    const { blogId, commentId } = params;
    try {
      const blog = await blogModel.findById(blogId);
      if (!blog) throw new AppError({ ...NOT_FOUND, message: 'Blog does not exist' });
      
  
      const comment = blog.comments.id(commentId);
      if (!comment) throw new AppError({ ...NOT_FOUND, message: 'Comment not found' });

      if (comment.userId.toString() !== user._id.toString()) throw new AppError({ ...UNAUTHORIZED, message: 'You can only delete your own comment' });
      blog.comments = blog.comments.filter(c => c._id.toString() !== commentId);
      await blog.save();
  
      return;
    } catch (err) {
      throw err;
    }
  };
  

  const likes = async (params, user) => {
    const { id } = params;
  
    try {
      const blog = await blogModel.findById(id);
      if (!blog) throw new AppError({ ...NOT_FOUND, message: "Blog not found" });
  
      const userIdStr = user._id.toString();
      const alreadyLiked = blog.likes.some((likeUserId) => likeUserId.toString() === userIdStr);
  
      alreadyLiked ? blog.likes = blog.likes.filter((likeUserId) => likeUserId.toString() !== userIdStr) : blog.likes.push(user._id);
  
      await blog.save();
      return blog;
    } catch (err) {
      throw err;
    }
  };
  
module.exports = {create,update,deleteOne,get,getAll,commentBlog,likes,deleteComment}