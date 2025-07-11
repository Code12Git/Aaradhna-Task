import { type AnyAction, type Dispatch } from 'redux';
import { formRequest, privateRequest, publicRequest } from '@/helpers/axios';
import {
  FETCH_BLOG_REQUEST,
  FETCH_BLOG_SUCCESS,
  FETCH_BLOG_FAILURE,
  LIKE_BLOG_REQUEST,
  LIKE_BLOG_SUCCESS,
  LIKE_BLOG_FAILURE,
  CREATE_BLOG_SUCCESS,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_FAILURE,
  DELETE_BLOG_FAILURE,
  DELETE_BLOG_SUCCESS,
  UPDATE_BLOG_REQUEST,
  UPDATE_BLOG_SUCCESS,
  UPDATE_BLOG_FAILURE,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
} from '../actionTypes/actionTypes'
import { type blogResponse } from '@/types';
import { type ApiError } from '@/types';
import toast from 'react-hot-toast'
import { getApiErrorMessage } from '@/utils/errorHandler';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import type { RootState } from '../store';


export const fetchBlog = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_BLOG_REQUEST });
  try {
    const response = await publicRequest.get<blogResponse>('/blog');
    dispatch({
      type: FETCH_BLOG_SUCCESS,
      payload: response.data.data,

    });
  } catch (err) {
    const error = err as ApiError;
    console.log(error)
    dispatch({
      type: FETCH_BLOG_FAILURE,
      payload: error.response?.data?.code?.message ||
        error.response?.data?.message ||
        error.message ||
        'Error fetching blog details'
    });
  }
};

export const likeBlog = (id: string): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
  dispatch({ type: LIKE_BLOG_REQUEST });
  console.log(id)
  try {
    const response = await privateRequest.post<blogResponse>(`/blog/${id}/likes`);
    dispatch({
      type: LIKE_BLOG_SUCCESS,
      payload:{ likes:response.data?.data?.likes,id},

    });
  } catch (err) {
    const error = err as ApiError;
    dispatch({
      type: LIKE_BLOG_FAILURE,
      payload: error.response?.data?.code?.message || error.response?.data?.message || error.message || 'Error liking'
    });
    toast.error(getApiErrorMessage(error));
  }
};


export const createBlog = (data: { title: string, description: string }) => async (dispatch: Dispatch) => {
  console.log(data)
  dispatch({ type: CREATE_BLOG_REQUEST })
  try {
    const res = await privateRequest.post('/blog', data)
    console.log(res)
    dispatch({ type: CREATE_BLOG_SUCCESS, payload: res.data.data })
    toast.success('Blog Created Successfully')
  } catch (err) {
    const error = err as ApiError;
    dispatch({
      type: CREATE_BLOG_FAILURE,
      payload: error.response?.data?.code?.message || error.response?.data?.message || error.message || 'Error Creating Blog'
    });
    toast.error(getApiErrorMessage(error));
  }
}

export const deleteBlog = (id: string,): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
  dispatch({ type: DELETE_BLOG_FAILURE })
  try {
    await privateRequest.delete(`/blog/${id}`)

    dispatch({ type: DELETE_BLOG_SUCCESS, payload: {id} })
    toast.success('Blog deleted Successfully')
    dispatch(fetchBlog())
  }
  catch (err) {
    const error = err as ApiError;
    dispatch({
      type: DELETE_BLOG_FAILURE,
      payload: error.response?.data?.code?.message || error.response?.data?.message || error.message || 'Error Creating Blog'
    });
    toast.error(getApiErrorMessage(error));
  }
}

export const updateBlog = (data: { title: string, description: string }, id: string) => async (dispatch: Dispatch) => {
  console.log(data, id)
  dispatch({ type: UPDATE_BLOG_REQUEST })
  try {
    const res = await privateRequest.put(`/blog/${id}`, data)
    console.log(res)
    dispatch({ type: UPDATE_BLOG_SUCCESS, payload: res.data.data })
    toast.success('Blog Updated Successfully')
  } catch (err) {
    const error = err as ApiError;
    dispatch({
      type: UPDATE_BLOG_FAILURE,
      payload: error.response?.data?.code?.message || error.response?.data?.message || error.message || 'Error Creating Blog'
    });
    toast.error(getApiErrorMessage(error));
  }
}


export const uploadImage = (img: File, id: string) => async (dispatch: Dispatch) => {

  const upload = await formRequest.post(`/blog/upload-image/${id}`, img)
  console.log(upload)

}


export const createComment = (
  id: string,
  data: string
): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    dispatch({ type: ADD_COMMENT_REQUEST });
    console.log(id, data);
    try {
      const res = await privateRequest.post(`/blog/${id}/comments`, { text: data });
      console.log(res);
      dispatch({
        type: ADD_COMMENT_SUCCESS,
        payload: {
          comments: res.data.data.comments,
          id,
        },
      });
      dispatch(fetchBlog());
      toast.success('Comment Added Successfully');
    } catch (err) {
      const error = err as ApiError;
      dispatch({
        type: ADD_COMMENT_FAILURE,
        payload:
          error.response?.data?.code?.message ||
          error.response?.data?.message ||
          error.message ||
          'Error Creating Comment',
      });
      toast.error(getApiErrorMessage(error));
    }
  };
