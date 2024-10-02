import { data } from 'autoprefixer'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdContentCopy } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const EditBlogPage = ({updateTheBlog}) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const {slug} = useParams()
    const [blog, setBlog] = useState({})
    const navigate = useNavigate()
    const handleFetch = async()=>{
        await axios({
            url:`http://127.0.0.1:8000/posts/${slug}`,
            method: 'GET',
            headers:{
                "Content-Type":"application/json"
            }
        }).then((response)=>{
            setBlog(response.data.data)
            setTitle(response.data.data.title)
            setContent(response.data.data.content)
        }).catch(()=>{
            console.log("Error fetching blog")
        })
    }
    useEffect(()=>{
        handleFetch()
    }, [])

    const updateBlogContent = {
        title:title,
        content:content
    }
    const updateBlog = async(e)=>{
        e.preventDefault()
        updateTheBlog(updateBlogContent, slug)
        navigate('/')
      
    }
  return (
    <div className="flex items-center justify-center h-screen mt-10 border-purple-900">
  <form onSubmit={updateBlog} className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
    <p className="mb-4 text-2xl font-semibold text-center">Edit Blog</p>
    <div className="mb-8">
      <label htmlFor="input" className="block mb-2 text-sm font-bold text-gray-700">Title</label>
      <input 
        id="input"
        className="w-full px-3 py-2 leading-tight border-2 border-purple-900 rounded text-gray-950 focus:outline-none focus:shadow-outline" 
        placeholder="Enter your input"
        required 
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />
    </div>
    <div className="mb-8">
      <label htmlFor="textarea" className="block mb-2 text-sm font-bold text-gray-700">Body</label>
      <textarea 
        id="textarea"  
        className="w-full px-3 py-2 leading-tight border-2 border-purple-900 rounded text-gray-950 focus:outline-none focus:shadow-outline" 
        rows="6" 
        placeholder="Enter your message" 
        required
        value={content}
        onChange={(e)=>setContent(e.target.value)}
      ></textarea>
    </div>
    <div className="flex items-center justify-center">
      <button 
        type="submit" 
        className="w-full px-4 py-2 font-bold text-white bg-purple-500 rounded hover:bg-purple-700 focus:outline-none focus:shadow-outline"
      >
        Edit
      </button>
    </div>
  </form>
</div>
  )
}

export default EditBlogPage