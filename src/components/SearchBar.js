import styled from '@emotion/styled'
import { Box, Typography,Grid, MenuItem, Button} from '@mui/material'
import { style } from '@mui/system'
import React from 'react'
import DuoIcon from '@mui/icons-material/Duo';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { Link } from 'react-router-dom';
const SearchBar = () => {


  return (
    <Grid container spacing={1}  justifyContent="space-between" >
      
  <Grid xs={4} >
  <Button variant='contained' size='large' >
  <Link to="JoinMeeting">
    <DuoIcon  style={{height:"200px",width:"200px"}}/>
    </Link>
  </Button>
  <Typography>New Meeting</Typography>
    
  </Grid>
  <Grid xs={4}>
  
  <Button variant='contained' size='large' >
    <VideoCallIcon  style={{height:"200px",width:"200px"}}/>
  </Button>
  <Typography>Join Meeting</Typography>
  
  </Grid>
  <Grid xs={4} py={5}>
  <Button  variant="contained">ghghj</Button>
  
  </Grid>
  <Grid xs={4} py={5}>
  <Button  variant="contained">ghghj</Button>
    
  </Grid>
  <Grid xs={4} py={5}>
  <Button  variant="contained">ghghj</Button>
  </Grid>
  <Grid xs={4} py={5}>
  <Button  variant="contained">ghghj</Button>
  </Grid>
</Grid>
  )
}

export default SearchBar