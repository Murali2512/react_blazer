import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import DataContext from './context/DataContext';

const Edit = () => {
  const {posts,editTitle,setEditTitle,editBody,setEditBody,handleEdit} = useContext(DataContext)
  const {id} = useParams();
  const post = posts.find(post => (post.id).toString() === id)

  useEffect(() => {
    if(post)
    {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  },[post,setEditBody,setEditTitle]) 
  return (
    <main className='NewPost'>
      {editTitle &&
        <>
          <h2>Edit Post</h2>
          <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">
              Title
            </label>
            <input 
              type="text" 
              id='postTitle'
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <label htmlFor="postBody">
              Body
            </label>
            <textarea 
              id='postBody'
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />

            <button type="submit" onClick={() => handleEdit(post.id)}>
              POST
            </button>
          </form>
        </>
      }
      {!editTitle && 
          <>
            <p>😒🤦‍♀️🤷‍♀️😭😤😡🧑‍💻</p>
          </>
        }
    </main>
  )
}

export default Edit