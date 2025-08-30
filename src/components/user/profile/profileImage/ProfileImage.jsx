import { useState } from 'react'
import ProfileAvatarEditor from "./ProfileAvatarEditor"
import {  Box, IconButton } from '@mui/material'
import { Edit } from '@mui/icons-material'
import AlertProfileImage from './AlertProfileImage'
import CroppedAvatar from './CroppedAvatar'

function ProfileImage({originalImage,cropInfo}) {
  const [originalProfileImage, setOriginalProfileImage] = useState(originalImage||'/image/chapters/10.jpg')
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const [cropData, setCropData] = useState(cropInfo||{
    scale: 1.2,
    rotate: 0,
    position: { x: .5, y: .5 }
  })
  const handleProfileClick = () => {
    setIsEditingProfile(true)
  }
  const handleDelete = async () => {
        setOriginalProfileImage(null)      // مسح النسخة الأصلية
        setIsEditingProfile(false)         // سكّر محرر الصور
        setDeleteConfirmation(false)                     // سكّر الـ Dialog
    }
  return (
    <>
      <Box sx={{ position: "relative" }}>
        <CroppedAvatar
          originalImage={originalProfileImage}
          cropData={cropData}
          size={168}
        />
        <IconButton
          size="small"
          onClick={handleProfileClick}
          sx={{
            position: "absolute",
            bottom:'10px',
            right:'20px',
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
        handleDelete={handleDelete}
        type={"profile_image"}
      />
    </>
  )
}

export default ProfileImage
