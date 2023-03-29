import Box from '@mui/material/Box';
import Post from '../Post/Post';
import Stories from '../Stories/Stories';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setPosts } from '../../state';
import axios from '../../utils/axios';
import { getPost } from '../../utils/Constants';


const Feed = () => {


  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const [reload,setReload] = useState(false)
 
  const getPosts = async () => {
    const response = await axios.get(getPost, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    })
    const postData = response.data;
    dispatch(setPosts({ posts: postData }));
  }
  

  useEffect(() => {

    getPosts()

  },[reload])


  const deletePost = ()=>{
    setReload(!reload)
  }





  return (
    <Box flex={4}>
        <Stories />
      {
        posts.map(({
          _id,
          content,
          author,
          image,
          likes,
          comments,
          createdAt
        }) => (
          <Post
            key={_id}
            postId={_id}
            content={content}
            author={author}
            image={image}
            likes={likes}
            comments={comments}
            createdAt={createdAt}
            onDeletePost={() => deletePost()}
          />
        ))
      }
      </Box>
  )
}

export default Feed
