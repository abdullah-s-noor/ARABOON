import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Navbar from './layoutParts/Navbar'
import Footer from './layoutParts/Footer'
function UserLayout() {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column",width:'100%'}}>
        <Navbar  />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          <Outlet />
        </Box>
        {/* <Footer /> */}
      </Box>

    </>
  )
}

export default UserLayout
