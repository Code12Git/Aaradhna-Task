const {responseManager, authManager, blogManager} = require('../services')

const create = async(request,response) => {
    try{
        const result = await blogManager.create(request.body,request.user)
        return responseManager.sendSuccessResponse(response,result,'Blog Created Successfully!')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Cannot Create Blog')
    }
}

const update = async(request,response) => {
    try{
        const result = await blogManager.update(request.body,request.params,request.user)
        return responseManager.sendSuccessResponse(response,result,'Blog Updated successfull')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Error updating blog')
    }
}

const deleteOne = async(request,response) => {
    try{
        const result = await blogManager.deleteOne(request.user,request.params)
        return responseManager.sendSuccessResponse(response,result,'Blog Deleted successfull')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Error deleting blog')
    }
}

const get = async(request,response) => {
    try{
        const result = await blogManager.get(request.params)
        return responseManager.sendSuccessResponse(response,result,'Blog Fetched successfull')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Error fetching blog')
    }
}

const getAll = async(request,response) => {
    try{
        const result = await blogManager.getAll()
        return responseManager.sendSuccessResponse(response,result,'All Blogs Fetched successfull')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Error fetching blogs')
    }
}



const comment = async(request,response) => {
    try{
        const result = await blogManager.commentBlog(request.params,request.body,request.user)
        return responseManager.sendSuccessResponse(response,result,'Comment done successfully!')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Error making comment')
    }
}


const likes = async(request,response) => {
    try{
        const result = await blogManager.likes(request.params,request.user)
        return responseManager.sendSuccessResponse(response,result,'You have successfully liked a post')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Error liking post')
    }
}

module.exports = { create,update, deleteOne, get, getAll,comment,likes }