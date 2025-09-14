import { useContext, useState } from 'react'
import ProfileAvatarEditor from "./ProfileAvatarEditor"
import { Box, IconButton } from '@mui/material'
import { Edit } from '@mui/icons-material'
import AlertProfileImage from './AlertProfileImage'
import CroppedAvatar from './CroppedAvatar'
import { toast } from 'react-toastify'
import { api } from '../../../../services/api'
import { UserContext } from '../../../../context/UserContext'

function ProfileImage({ originalImage, cropInfo }) {
  const {userData,checkUserSession}=useContext(UserContext)
  const [originalProfileImage, setOriginalProfileImage] = useState(originalImage)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const [cropData, setCropData] = useState(cropInfo || {
    scale: 1.2,
    rotate: 0,
    position: { x: .5, y: .5 }
  })
  const [loading,setLoading]=useState(false)
  const handleProfileClick = () => {
    setIsEditingProfile(true)
  }

  const handleDelete = async () => {
    try {
      setLoading(true)
      const { data } = await api.delete("/users/profile-image")
      setOriginalProfileImage(null)      // مسح النسخة الأصلية
      setDeleteConfirmation(false)
      toast.success(data.message)
      checkUserSession()
    } catch (error) {
      console.log(error)
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message)
      } else {
        toast.error("something went wrong")
      }
    } finally {
      setIsEditingProfile(false)
      setLoading(false)
    }
  }
  return (
    <>
      <Box sx={{ position: "relative" }}>
        <CroppedAvatar
          originalImage={originalProfileImage}
          cropData={cropData}
        />
        <IconButton
          size="small"
          onClick={handleProfileClick}
          sx={{
            position: "absolute",
            bottom: {xs:"0px",md:'10px'},
            right: {xs:"10px",md:'20px'},
            bgcolor: "background.paper",
            "&:hover": {
              bgcolor: "primary.main",
            },
          }}
        >
          <Edit fontSize="small" />
        </IconButton>
      </Box>
      <ProfileAvatarEditor
        open={isEditingProfile} onClose={() => setIsEditingProfile(false)}
        originalProfileImage={originalProfileImage} setOriginalProfileImage={setOriginalProfileImage}
        onDelete={setDeleteConfirmation}
        onSave={setIsEditingProfile}
        cropData={cropData} setCropData={setCropData}
        loading={loading} setLoading={setLoading} 
        checkUserSession={checkUserSession}

      />
      <AlertProfileImage
        open={deleteConfirmation}
        setOpen={setDeleteConfirmation}
        handleDelete={handleDelete}
        type={"profile_image"}
        loading={loading}
      />
    </>
  )
}

export default ProfileImage
