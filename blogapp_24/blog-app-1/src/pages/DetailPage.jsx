import React, { useEffect, useState } from 'react'
import { FaRegPenToSquare } from 'react-icons/fa6'
import { MdDelete } from 'react-icons/md'
import { IoReturnUpBack } from 'react-icons/io5'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Modal from '../components/Modal'
import axios from 'axios'
import { toast } from 'react-toastify'

const DetailPage = () => {
    const {slug} = useParams()
    const [blogs, setBlogs] = useState({})
    const [title, setTitle] = useState('')
    const [showModal,setShowModal] = useState(false)
    const navigate = useNavigate()
    
    const handleFetch =async()=>{
        await axios({
            method:"GET",
            url:`http://127.0.0.1:8000/posts/${slug}`,
            headers:{
                "Content-Type":"application/json"
            }
        }).then((response)=>{
            setBlogs(response.data.data)
            setTitle(response.data.data.title)
            console.log(response.data.data);
        }).catch((error)=>{
            console.log(error);
            
        })
    }
    
    useEffect(()=>{
        handleFetch()
    }, [])
    
    const negateModal = async()=>{
        setShowModal(!showModal)
    }
    
    const deleteBlog = async()=>{
        await axios({
          method:"DELETE",
          url:`http://127.0.0.1:8000/posts/${slug}`,
          headers:{
              "Content-Type":"application/json"
          },
        }).then((response)=>{
            console.log(response)
          toast.success("Blog delete successfully")
        //   toast.success(response.data.messages)
          navigate('/')
        }).catch((error)=>{
          console.log(error)
          toast.error("failed to delete")
        })
      }
    
  return (
    <div className="container px-4 py-8 mx-auto mt-20 border">
  <div className="max-w-2xl mx-auto">
    <a href="#">
      <span className="flex items-center">
        <IoReturnUpBack fontSize={25}/>
        <p className="ml-1">Back</p>
      </span>
    </a>

    <h1 className="mt-4 mb-4 text-4xl font-extrabold blog-title">{blogs?.title}</h1>
    <span className="flex items-center mb-4">

      <Link to={`/blogs/edit/${blogs?.slug}`}> 
        <button
          type="button"
          className="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
        >
          <FaRegPenToSquare className="mr-2 text-xl" /> edit
        </button>
      </Link>

      <button
        type="button"
        className="flex items-center focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        data-modal-target="popup-modal"
        data-modal-toggle="popup-modal"
        onClick={negateModal}  
      >
        <MdDelete  className="mr-2 text-xl" /> Delete
      </button>

    </span>
    <div className="prose prose-lg text-justify blog-body">
      <p className="leading-8">
        {blogs?.content} 
      </p>
    </div>
  </div>

{showModal && <Modal negateModal={negateModal} title={title} deleteBlog={deleteBlog} />}

</div>

  )
}

export default DetailPage