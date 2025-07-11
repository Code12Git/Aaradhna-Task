const { blogModel } = require("../models");
const { AppError } = require("../utils");
const uploadImages = require("../utils/cloudinary");
const { CONFLICT, NOT_FOUND, INVALID_REQUEST_DATA } = require("../utils/errors");


const create = async (body,user,files) => {
    const {title,description,img} = body;
    console.log('Title',title,"Description",description,"Image",img)
    try{
        const blogExist =  await blogModel.findOne({userId:user._id,title})
        if(blogExist) throw new AppError({...CONFLICT,message:'Blog already created by you using same title or description'})
            let imgUrl = null;
            if (files && files.img) {
                console.log(files)
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



const uploadImage = async (files, params) => {
    const {blogId} = params;
    try {
        if (!files || !files.img || files.img.length === 0) {
            throw new AppError({ ...NOT_FOUND, message: "Image file not provided" });
        }
        
        if (!blogId) {
            throw new AppError({ ...BAD_REQUEST, message: "User ID is required" });
        }
        
      const imgLocalPath = files.img[0].path;
      
      const uploadedImage = await uploadImages(imgLocalPath);
  
      if (!uploadedImage || !uploadedImage.url) {
        throw new AppError({
          ...BAD_REQUEST,
          message: "Failed to upload image to Cloudinary",
        });
      }
      const updatedUser = await blogModel.findByIdAndUpdate(
        blogId,
        { img: uploadedImage.url },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        throw new AppError({
          ...NOT_FOUND,
          message: "User not found or failed to update avatar",
        });
      }
  
      return updatedUser;
  
    } catch (err) {
      throw err;
    }
  };



const update = async(body,params,user) => {
    const {title,description} = body;
    const {id} = params;
    try{
        if (!title?.trim() && !description?.trim()) throw new AppError({ ...INVALID_REQUEST_DATA, message: 'At least one of title or description is required' });
        const blogExist = await blogModel.findOne({ _id: id, userId: user._id });
        if(!blogExist) throw new AppError({...NOT_FOUND,message:'Blog not found'})
        const updateBlog = await blogModel.findOneAndUpdate({_id:id,userId:user._id},{title,description},{new:true,runValidators:false})
        return updateBlog;   
    }catch(err){
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

const commentBlog = async(params,body,user) => {
    const {id} = params;
    const { text } = body;
    console.log(id,text)
     try{
        if(!text?.trim()) throw new AppError({...INVALID_REQUEST_DATA,message:"Text is required"})
        const isBlogExist = await blogModel.findById(id)
    console.log(isBlogExist)
        if(!isBlogExist) throw new AppError({...NOT_FOUND,message:"Blog not found"})
        const comment = {userId:user._id,text,createdAt:new Date()}
        isBlogExist.comments.push(comment)
        await isBlogExist.save();
        return isBlogExist;
    }catch(err){
        throw err;
    }
}


const deleteComment = async (params, user) => {
    const { blogId, commentId } = params;
    console.log(blogId,commentId)
    try {
      const blog = await blogModel.findById(blogId);
      if (!blog) throw new AppError({ ...NOT_FOUND, message: 'Blog does not exist' });
      
  
      const comment = blog.comments.id(commentId);
      if (!comment) throw new AppError({ ...NOT_FOUND, message: 'Comment not found' });
        console.log(comment)
        console.log(comment.userId.toString(),user._id.toString())
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
  
module.exports = {create,update,deleteOne,get,getAll,commentBlog,likes,uploadImage,deleteComment}