import AllPosts from "./pages/AllPosts"
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";
import {useState, useEffect} from 'react'
import {Route, Routes, Link, useNavigate} from 'react-router-dom'

const h1 = {
  textAlign: "center",
  margin: "10px"
}


function App() {

///////////////////////////////////
// State and Other Variables
///////////////////////////////////
const url = "https://dg-masonite-blog.herokuapp.com/blog/"
const [posts, setPosts] = useState([])
const nullPost = {
  title: "",
  body: ""
}

const [targetPost, setTargetPost] = useState(nullPost)

const navigate = useNavigate()

///////////////////////////////////
// Functions
///////////////////////////////////

const getPosts = async() => {
  const response = await fetch(url)
  const data = await response.json()
  setPosts(data)
}

const addPost = async (newPost) => {
  await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newPost)
  })

  getPosts()
}

const getTargetPost = (post) => {
  setTargetPost(post)
  navigate('/edit')
}

const updatePost = async (post) => {
  await fetch(url + post.id, {
    method: "put",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  })
  getPosts()
}

const deletePost = async (post) =>{
  await fetch(url + post.id, {
    method: "delete"
  })

  getPosts()
  navigate('/')
}
///////////////////////////////////
// useEffects
///////////////////////////////////

useEffect(()=>{
  getPosts()
}, [])

///////////////////////////////////
// Returned JSX
///////////////////////////////////


  return (
    <div className="App">
      <h1 style={h1}>Welcome to Donovan's Blog!</h1>
      <Link to='/new'><button>Create New Post</button></Link>
      <Routes>
        <Route path='/' element={<AllPosts posts={posts}/>}/>
        <Route path='/post/:id' element={<SinglePost 
          posts={posts}
          edit={getTargetPost}
          deletePost ={deletePost}
        />}/>
        <Route path='/new' element={<Form
          initialPost={nullPost}
          handleSubmit={addPost}
          buttonLabel = "Create Post"
        />}/>
        <Route path='/edit' element={<Form
          initialPost={targetPost}
          handleSubmit={updatePost}
          buttonLabel= "Update Post"
        />}/>
      </Routes>
    </div>
  );
}

export default App;
