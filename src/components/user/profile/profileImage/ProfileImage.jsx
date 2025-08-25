import { useState } from 'react'
import ProfileAvatarEditor from "./ProfileAvatarEditor"
import {  Box, IconButton } from '@mui/material'
import { Edit } from '@mui/icons-material'
import AlertProfileImage from './AlertProfileImage'
import CroppedAvatar from './CroppedAvatar'

function ProfileImage() {
  const [originalProfileImage, setOriginalProfileImage] = useState('/image/chapters/10.jpg')
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const [cropData, setCropData] = useState({
    scale: 1.2,
    rotate: 0,
    position: { x: .5, y: .5 }
  })
  const handleProfileClick = () => {
    setIsEditingProfile(true)
  }
  return (
    <>
      <Box sx={{ position: "relative" }}>
        <CroppedAvatar
          originalImage={originalProfileImage}
          cropData={cropData}
          size={100}
        />
        <IconButton
          size="small"
          onClick={handleProfileClick}
          sx={{
            position: "absolute",
            bottom: 40,
            left: 80,
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

      />
      <AlertProfileImage
        open={deleteConfirmation}
        setOpen={setDeleteConfirmation}
        setOriginalProfileImage={setOriginalProfileImage}
        setIsEditingProfile={setIsEditingProfile}
      />
    </>
  )
}

export default ProfileImage
