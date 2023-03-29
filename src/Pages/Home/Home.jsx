  import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Feed from '../../Components/Feed/Feed';
import Leftbar from '../../Components/Leftbar/Leftbar';
import Rightbar from '../../Components/Rightbar/Rightbar';
import React from 'react';
import AddPost from '../../Components/AddPost/AddPost';

const Home = () => {
  return (
    <Box >
      <Stack direction="row" justifyContent="space-between" p={{ md: 0 }} spacing={{ md: 3 }} >
        <Leftbar />
        <Feed />
        <Rightbar />
      </Stack>
      <AddPost />
    </Box>
  )
}

export default Home
