import React, { useContext } from 'react'
import Feed from './Feed'
import DataContext from './context/DataContext'

const Home = () => {
  const {searchResults} = useContext(DataContext)
  return (
    <main className='Home'>
        {searchResults.length ?
          (<Feed posts={searchResults}/>)
          : (
            <p
              style={{display:'flex',justifyContent:'center',fontSize:'1rem'}}
            >
              NO POST AVAILABLE
            </p>
          )
      }
    </main>
  )
}

export default Home