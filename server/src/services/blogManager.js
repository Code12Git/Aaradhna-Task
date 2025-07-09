const { blogModel } = require("../models");
const user = require("../models/user");
const { AppError } = require("../utils");
const { CONFLICT, NOT_FOUND, INVALID_REQUEST_DATA } = require("../utils/errors");


const create = async (body,user) => {
    const {title,description,img} = body;
    try{
        const blogExist =  await blogModel.findOne({userId:user._id,title})
        if(blogExist) throw new AppError({...CONFLICT,message:'Blog already created by you using same title or description'})
        const blog = await blogModel.create({title,description,img,userId:user._id})
        return blog;
    }catch(err){
        throw err;
    }
}

const update = async(body,params,user) => {
    const {title,description,img} = body;
    const {id} = params;
    try{
        if (!title?.trim() && !description?.trim()) throw new AppError({ ...INVALID_REQUEST_DATA, message: 'At least one of title or description is required' });
        const blogExist = await blogModel.findOne({ _id: id, userId: user._id });
        if(!blogExist) throw new AppError({...NOT_FOUND,message:'Blog not found'})
        const updateBlog = await blogModel.findOneAndUpdate({_id:id,userId:user._id},{title,description,img},{new:true,runValidators:false})
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
        const blog = await blogModel.find()
        if(!blog.length) throw new AppError({...CONFLICT,message:'No blog found'})
        return blog;   
    }catch(err){
        throw err;
    }
}

const commentBlog = async(params,body,user) => {
    const {id} = params;
    const { text } = body;

     try{
        if(!text?.trim()) throw new AppError({...INVALID_REQUEST_DATA,message:"Text is required"})
        const isBlogExist = await blogModel.findById({id:id})
        if(!isBlogExist) throw new AppError({...NOT_FOUND,message:"Blog not found"})
        const comment = {userId:user._id,text,createdAt:new Date()}
        isBlogExist.comments.push(comment)
        await isBlogExist.save();
        return isBlogExist;
    }catch(err){
        throw err;
    }
}


const likes = async(params,user) =>{
    const {id} = params;

    try{
        const blog = await blogModel.findById(id)
        if(!blog) throw new AppError({...NOT_FOUND,message:"Blog not found"})
       const userIdStr = user._id.toString();
        const alreadyLiked = blog.likes.some((likeUserId) => likeUserId.toString() === userIdStr)   
        alreadyLiked? blog.likes.filter( (likeUserId) => likeUserId.toString() !== userIdStr) : blog.likes.push(user._id);
        blog.likes.push(user._id)    
        await blog.save();
        return blog;
    }catch(err){
        throw err;
    }
}

module.exports = {create,update,deleteOne,get,getAll,commentBlog,likes}