import { Box } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './layoutParts/navbar/Navbar'
import Footer from './layoutParts/Footer'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../../context/UserContext'
function UserLayout() {
  const { userData } = useContext(UserContext)
    const pathname = useLocation().pathname
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname])
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", width: '100%' }}>
        {!(userData?.Role === "Admin") && <Navbar />}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minHeight: "100vh"
          }}
        >
          <Outlet />
        </Box>
        {!(userData?.Role === "Admin") && <Footer />}
      </Box>

    </>
  )
}

export default UserLayout
