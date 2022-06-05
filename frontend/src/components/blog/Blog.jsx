import React from "react"
import Back from "../common/Back"
import "../pages/recent/recent.css"
import img from "../images/about.jpg"
import RecentCard from "../pages/recent/RecentCard"

const Blog = () => {
  return (
    <>
      <section className='blog-out mb'>
        <Back name='Blog' title='Blog Grid - Our Blogs' cover={img} />
        <div className='container recent'>
          <RecentCard />
        </div>
      </section>
    </>
  )
}

export default Blog
