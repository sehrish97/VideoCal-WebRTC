import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const JoinMeeting = ({name,setuserName,roomId,setroomId}) => {

  

  return (
    <Box>
      <TextField 
      id="outlined-basic" 
      label="Outlined" 
      variant="outlined"
      value={name}
      onChange={setuserName}
       />
      <TextField 
      id="outlined-basic" 
      label="Outlined" 
      variant="outlined"
      value={roomId}
      onChange={setroomId}
       />
      <Button >Join meeting</Button>
    </Box>
  )
}

export default JoinMeeting