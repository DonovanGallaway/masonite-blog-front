import Post from '../components/Post'

const AllPosts = ({posts}) => {
    return posts.map((x) => {
        return <Post key={x.id} post={x}/>
    })
}

export default AllPosts