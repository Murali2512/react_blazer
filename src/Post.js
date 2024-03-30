import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({postVar}) => {
  return (
    <article className='post'>
        <Link to={`/post/${postVar.id}`}>
          <h2>{postVar.title}</h2>
          <p className='postDate'>{postVar.datetime}</p> 
        </Link>
        <p className='postBody'>{
            (postVar.body).length <= 25 ? postVar.body : `${(postVar.body).slice(0,25)}...`
        }</p>

    </article>
  )
}

export default Post