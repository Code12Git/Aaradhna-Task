import { useEffect } from "react"
import BlogCard from "./BlogCard"
import { useAppDispatch } from "@/hooks/hooks"
import { fetchBlog } from "@/redux/actions/blogAction"

const Blogs = () => {
  const dispatch = useAppDispatch()
  useEffect(()=>{
 dispatch(fetchBlog())
  },[dispatch])

  return (
    <BlogCard />
  )
}

export default Blogs