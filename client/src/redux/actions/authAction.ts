import { type Dispatch } from 'redux';
import { publicRequest } from '@/helpers/axios';
import { 
  REGISTER_REQUEST, 
  REGISTER_SUCCESS, 
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../actionTypes/actionTypes'
import { type AuthResponse,type UserCredentials } from '@/types';
import {type  ApiError } from '@/types';
import toast from 'react-hot-toast'
import { getApiErrorMessage } from '@/utils/errorHandler';

export const registerUser = (data: UserCredentials) => async (dispatch: Dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await publicRequest.post<AuthResponse>('/auth/register', data);
    console.log(response)
    dispatch({ 
      type: REGISTER_SUCCESS, 
      payload: {
        user: response.data.user,
        token: response.data.token
      }
    });
    toast.success("User Registered Successfully")
  } catch (err) {
    const error = err as ApiError;
    console.log(error)
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data?.code?.message || 
              error.response?.data?.message || 
              error.message || 
              'Registration failed'
    });
    toast.error(getApiErrorMessage(error));
  }
};

export const loginUser = (credentials: { email: string; password: string }) => async (dispatch: Dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await publicRequest.post('/auth/login', credentials);
    console.log(response)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user: response.data.data.user,
        token: response.data.data.token
      }
    });
    toast.success("User Logged In Successfully")
  } catch (err) {
    const error = err as ApiError;
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.code?.message || 
              error.response?.data?.message || 
              error.message || 
              'Login failed'
    });
    toast.error(getApiErrorMessage(error))
  }
};