import { addPost, deletePost, fetchPosts } from "@/redux/post/postSlice"
import { AppDispatch, RootState } from "@/redux/post/store"
import { useDispatch, useSelector } from "react-redux"

export const usePostStore = () =>{
    const dispatch = useDispatch<AppDispatch>()
    const {posts,loading,error} = useSelector((state:RootState)=>state.post)
    const handleFetchPosts = ()=> dispatch(fetchPosts())
    const handleAddPosts = (title:string, body:string)=> dispatch(addPost({title,body}))
    const handleDeletePosts = (postId:string)=> dispatch(deletePost(postId))
    return {
        posts,
        loading,
        error,
        handleFetchPosts,
        handleAddPosts,
        handleDeletePosts
    }
}