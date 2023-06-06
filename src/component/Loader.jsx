import React from 'react'
import { Box } from '@mui/material';
import "../App.css"
export default function Loader() {
  return (

        <div className='login_main'>
        <Box p={5}>
        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </Box>
    </div>
  )
}
