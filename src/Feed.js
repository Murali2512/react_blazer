import React from 'react'
import Post from './Post'

const Feed = ({posts}) => {
  return (
    <>
        <ul>
            {posts.map((postVar) => ( 
                <Post key={postVar.id} postVar={postVar}/>   
            ))}
        </ul>
    </>
  )
}

export default Feed