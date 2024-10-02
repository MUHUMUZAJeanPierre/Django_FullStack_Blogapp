import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import axios from "axios";
import Spinner from "./Spinner";
const BlogContainer = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const handleFetch = async ()=>{
    
    await axios({
      method:"GET",
      url:"http://127.0.0.1:8000/posts/",
      headers:{
        "Content-Type":"application/json"
      }
    }).then((response)=>{
      // console.log("Data fetched successfully", response.data.data);
      setBlogs(response.data.data);
      setLoading(false)
    }).catch((error)=>
    console.error("Error fetching data", error));
  }
  
  useEffect(()=>{
    handleFetch();
  }, [])
  return (
    <div className="container flex flex-wrap px-4 mx-auto mt-8 mb-8 justify-evenly">
      <Spinner loading={loading} />
    {  blogs.map((blog)=>(
        <BlogCard key={blog.id}  blog={blog} />     
    ))}
    </div>
  );
};

export default BlogContainer;