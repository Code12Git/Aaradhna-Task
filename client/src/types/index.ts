export interface ApiError {
    response?: {
      data?: {
        message?: string;
        code?: {
          message?: string;
        };
      };
    };
    message?: string;
  }

  export interface UserCredentials {
    username: string;
    email: string;
    password: string;
    name?: string;
  }

  export interface User{
    email:string,
    name:string,
    username:string,
    password:string,
    role:string,
    last_login:Date,
    _id:string,
  }

  export interface Blog {
    _id:string,
    userId:{
      name:string,
      _id:string
    },
    comments:Comment[],
    likes:string[],
    title:string,
    description:string,
    createdAt:string,
    img?:string
  }

  export interface AuthResponse {
    user:User
    token?: string;
  }

  export interface AuthResponse {
    user:User
    token?: string;
  }

  export interface blogResponse {
    data:{
      blog:Blog[],
      likes:string[]
    }
  }

  export type Comment = {
    _id: string;
    text: string;
    createdAt: string;
    userId: {
      name: string,
      username: string,
      _id:string,
    }
  };

  export interface authState {
    userData: User | {_id:string} | null;  
    isLoading: boolean;
    error: string | null;   
    isAuthenticated: boolean;
    token: string | null;
  }

  export interface blogState {
    blogs: Blog[] | null;
    isLoading:boolean;
    error:null,
  }

  export interface userPayload {
    user?: User;
    userId?:string;
    token?: string;
    error?: string;
    id?: string;
  }

  export interface blogPayload {
    blog?:Blog;
    userId:string;
    id?:string;
    _id?: string;
    error?:string;
    comments:string[];
    likes:string[];

blogId:string;
commentId:string;

  }