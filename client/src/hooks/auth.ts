import { useAppSelector } from "./hooks";

const useAuth = () => {
  const {userData,token} = useAppSelector(state=>state.auth)
  return {userData,token}
 
}

export default useAuth;