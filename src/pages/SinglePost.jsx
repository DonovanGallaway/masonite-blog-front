import {Link, useParams} from 'react-router-dom'

const SinglePost = ({posts, edit, deletePost}) => {
    const params = useParams()
    const id = parseInt(params.id)
    
    const post = posts.find((p) => p.id === id)
    
    return <div>
        <h1>{post?.title}</h1>
        <h2>{post?.body}</h2>
        <button onClick={() => edit(post)}>Edit</button>
        <button onClick={() => deletePost(post)}>Delete</button>
        <Link to='/'>
            <button>Go Back</button>
        </Link>
    </div>
}

export default SinglePost