import React from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './layout/MainLayout'
import AddBlogPage from './pages/AddBlogPage'
import PageNotFound from './pages/PageNotFound'
import DetailPage from './pages/DetailPage'
import EditBlogPage from './pages/EditBlogPage'
import axios from 'axios'
import { toast } from 'react-toastify'
// import { useParams } from 'react-router-dom'




const App = () => {

  const createBlog = async(data)=>{
    await axios({
      method:"POST",
      url: "http://127.0.0.1:8000/posts/",
      headers:{
        'Content-Type': 'application/json'
      },
      data:data,  
    }).then((response)=>{
      // setTimeout(()=>{
        toast.success(response.data.messages)
      // }, 3000)
      console.log("response",response.data.message);
      
      
    }).catch((error)=>{
      console.log(error);
      toast.error("error creating blog")
    })
  }

  const updateTheBlog = async(data,slug)=>{
    await axios({
      method:"PUT",
      url:`http://127.0.0.1:8000/posts/${slug}`,
      headers:{
          "Content-Type":"application/json"
      },
      data:data
  }).then((response)=>{
    // console.log(response.data.messages)
    toast.success(response.data.messages)
  }).catch((error)=>{
      console.log(error);
      toast.error("failed to update")
      
  })
  }


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path='add-blog' element={<AddBlogPage createBlog={createBlog}/>} />
            <Route path='/blogs/:slug' element={<DetailPage/>} />
            <Route path='/blogs/edit/:slug' element={<EditBlogPage updateTheBlog={updateTheBlog} />} />
            <Route path='*' element={<PageNotFound/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
