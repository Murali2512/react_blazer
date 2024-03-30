import React, { useContext } from 'react'
import { useParams,Link } from 'react-router-dom'
import DataContext from './context/DataContext';

const PostPage = () => {
  const {posts,handleDelete} = useContext(DataContext);
  const {id} = useParams();
  const post = posts.find(post => (post.id).toString() === id);
  return (
    <main className='PostPage'>
      <article className='post'>
        {post && 
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p> 
            <p className='postBody'>{post.body}</p>
            <button onClick={() => handleDelete(post.id)}>
              DELETE POST
            </button>
            <Link to={`/edit/${post.id}`}>
              <button className='editbtn'>
                  EDIT POST
              </button>
            </Link>
          </>
        }
        {!post && 
          <>
            <p>😒🤦‍♀️🤷‍♀️😭😤😡🧑‍💻</p>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage