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
    last_login:Date
  }

  export interface AuthResponse {
    user:User
    token?: string;
  }

  export interface authState {
    userData: User | null;  
    isLoading: boolean;
    error: string | null;   
    isAuthenticated: boolean;
    token: string | null;
  }

  export interface userPayload {
    user?: User;
    userId?:string;
    token?: string;
    error?: string;
    id?: string;
  }