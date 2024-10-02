import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddBlogPage = ({createBlog}) => {
  const [title, setTitle]  = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate()
  const newBlog = {
    title:title,
    content:content
  }
  const handleCreate = async(e)=>{
    e.preventDefault()
    createBlog(newBlog)
    navigate('/')
   
  }
  return (
    <div className="flex items-center justify-center h-screen mt-10 border-purple-900">
  <form onSubmit={handleCreate} className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
    <p className="mb-4 text-2xl font-semibold text-center">Add a New Blog</p>
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
        Add Blog
      </button>
    </div>
  </form>
</div>

  )
}

export default AddBlogPage