import type { blogPayload, blogState } from "@/types/index";
import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, CREATE_BLOG_FAILURE, CREATE_BLOG_REQUEST, CREATE_BLOG_SUCCESS, DELETE_BLOG_FAILURE, DELETE_BLOG_REQUEST, DELETE_BLOG_SUCCESS, DELETE_COMMENT_FAILURE, DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, FETCH_BLOG_FAILURE, FETCH_BLOG_REQUEST, FETCH_BLOG_SUCCESS, LIKE_BLOG_FAILURE, LIKE_BLOG_REQUEST, LIKE_BLOG_SUCCESS, UPDATE_BLOG_FAILURE, UPDATE_BLOG_REQUEST, UPDATE_BLOG_SUCCESS } from "../actionTypes/actionTypes";


const initialState: blogState = {
    blogs: [],
    isLoading: false,
    error: null,
};


const authReducer = (state = initialState, { type, payload }: { type: string; payload: blogPayload }) => {
    switch (type) {
        // Fetch Blogs
        case FETCH_BLOG_REQUEST: {
            return {
              ...state,
              isLoading: true
            };
          }
          
        
        case FETCH_BLOG_SUCCESS: {
            return {
                blogs:payload,
                isLoading:false
            }
        }

        case FETCH_BLOG_FAILURE: {
            return {
                isLoading:false,
                error:payload
            }
        }

        case CREATE_BLOG_REQUEST:{
            return {
                isLoading:true
            }
        }

        case CREATE_BLOG_SUCCESS: {
            return {
              ...state,
              blogs: [...(state.blogs ?? []), payload],
              isLoading:false
            };
          }

        case CREATE_BLOG_FAILURE: {
            return {
                isLoading:false,
                error:payload
            }}

        case DELETE_BLOG_REQUEST:{
            return {
                ...state,
                isLoading:true
            }
        }  

        case DELETE_BLOG_SUCCESS:{
            return {
                ...state,
                blogs:state.blogs?.filter(blog => blog._id !== payload.id)
            }
        }  
          
        case DELETE_BLOG_FAILURE:{
            return {
                ...state,
                error:payload,
                isLoading:false
            }
        }

        case UPDATE_BLOG_REQUEST:{
            return {
                ...state,
                isLoading:true
            }
        }  

        case UPDATE_BLOG_SUCCESS: {
            return {
                ...state,
                blogs: state.blogs?.map(blog => 
                    blog._id === payload._id 
                        ? { 
                            ...blog, 
                            ...payload,
                            userId: payload.userId || blog.userId 
                        } 
                        : blog
                ),
            };
        }
          
        case UPDATE_BLOG_FAILURE:{
            return {
                ...state,
                error:payload,
                isLoading:false
            }
        }

        case LIKE_BLOG_REQUEST: {
            return {
              ...state,
              isLoading: true
            };
          }
          

        case LIKE_BLOG_SUCCESS:{
            return{
                isLoading:false,
                blogs:state.blogs?.map(blog=>blog?._id === payload.id ? { ...blog, likes: payload.likes }:blog)
            }
        }

        case LIKE_BLOG_FAILURE:{
            return {
                error:payload,
                isLoading:false
            }
        }

        case ADD_COMMENT_REQUEST:{
            return {
                ...state,
                isLoading:true
            }
        }  

        case ADD_COMMENT_SUCCESS: {
            return {
                ...state,
                blogs: state.blogs?.map(blog => 
                    blog._id === payload.id
                    ? { ...blog, comments: payload.comments }
                    : blog
                                  ),
            };
        }
          
        case ADD_COMMENT_FAILURE:{
            return {
                ...state,
                error:payload,
                isLoading:false
            }
        }

        case DELETE_COMMENT_REQUEST:{
            return {
                ...state,
                isLoading:true
            }
        }

        case DELETE_COMMENT_SUCCESS:{
            return {
                ...state,
                blogs:state.blogs?.map(blog => blog?._id === payload.blogId? {...blog,comments:blog.comments.filter(comment => comment._id !== payload.commentId)} : blog)
            }
        }

        case DELETE_COMMENT_FAILURE:{
            return {
                ...state,
                isLoading:false,
                error:payload,
            }
        }

        default:
            return state;
    }
};

export default authReducer;