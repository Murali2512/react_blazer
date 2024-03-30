import { createContext,useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../api/posts';
import useWindowSize from "../hooks/useWindowSize"; // giving ../ only it can access the files ./ is for directly accessing this is accessing the file from another folder that's why2

const DataContext = createContext({})

export const DataProvider = ({children}) => {
  const [posts, setPosts] = useState([]);
  const [search,setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();
  const { width } = useWindowSize();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (err) {
        if(err.response) 
        {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchPosts();
  }, [])

  useEffect(() => {
      const filteredResults = posts.filter((postFilter) =>
      ((postFilter.body).toLowerCase()).includes(search.toLowerCase()) ||
      ((postFilter.title).toLowerCase()).includes(search.toLowerCase())
      );
      setSearchResults(filteredResults.reverse()); // using reverse to show the latest post first
  },[posts, search])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? (+posts[posts.length - 1].id + 1).toString() : 1;
    console.log(id);
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPosts = {id, title: postTitle, datetime, body: postBody};
    try {
      const response = await api.post('/posts', newPosts)

      const allPosts = [...posts , response.data]
      setPosts(allPosts)
      setPostTitle('');
      setPostBody('');

      navigate("/"); // for navigating back to the home
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }
  
  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPosts = {id, title: editTitle, datetime, body: editBody};
    try {
      const response = await api.put(`/posts/${id}`,updatedPosts); // patch for altering one data && put is for more 
      setPosts(posts.map(post => post.id === id ? {...response.data} : post)) // only updating the selected data
      setEditTitle('');
      setEditBody('');
      navigate("/");
    } catch(err) {
      console.log(`Error: ${err.message}`)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`)
      const postsList = posts.filter(post => post.id !== id);
      setPosts(postsList);
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }
    return (
        <DataContext.Provider value={{ // values can be used across all the component inside the dataprovider tag
            width,
            search, setSearch,
            searchResults,
            handleSubmit,postTitle,setPostTitle,postBody,setPostBody,
            posts,handleDelete,
            editTitle,setEditTitle,editBody,setEditBody,handleEdit
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext