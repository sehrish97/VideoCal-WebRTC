import { Box, Container, Stack } from '@mui/system'
import React from 'react'
import Navbar from '../components/Navbar'

import SearchBar from '../components/SearchBar'


const Home = () => {
  return (
   <Box >
    <Navbar />
    <Stack direction="column" spacing={2} justifyContent="space-around" m={5}>
       
        <SearchBar />
        
    </Stack>
   </Box>
  )
}

export default Home