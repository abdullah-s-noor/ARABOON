import React, { useCallback, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import ProfileAvatarEditor from "./ProfileAvatarEditor"
import { Avatar, Box, IconButton } from '@mui/material'
import { Edit } from '@mui/icons-material'
import AlertProfileImage from './AlertProfileImage'
import { yellow } from '@mui/material/colors'

function ProfileImage() {
  const [profileImage, setProfileImage] = useState(null)
  const [originalProfileImage, setOriginalProfileImage] = useState(null)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const [cropData,setCropData]=useState({
    scale:1.2,
    rotate:0,
    position:{x:.5,y:.5}
  })
  const handleProfileSave = useCallback((croppedImage, originalImage) => {
    setProfileImage(croppedImage)
    if (originalImage) {
      setOriginalProfileImage(originalImage)
    }
    setIsEditingProfile(false)
  }, [])
  const handleProfileClick = () => {
    setIsEditingProfile(true)
  }
  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Avatar
          src={profileImage || "/placeholder.svg?height=128&width=128&query=professional profile photo"}
          alt="Profile"
          sx={{
            fontSize: "2rem",
            cursor: "pointer",
            border: '3px solid', borderColor: 'primary.main', width: 100, height: 100, transform: "translateY(-40px) translatex(20px)"
          }}
          onClick={handleProfileClick}
        >
          JD
        </Avatar>
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
        open={isEditingProfile}
        onClose={() => setIsEditingProfile(false)}
        onSave={handleProfileSave}
        existingImage={originalProfileImage}
        hasExistingProfile={!!profileImage}
        onDelete={setDeleteConfirmation}
        
      />
      <AlertProfileImage
        open={deleteConfirmation}
        setOpen={setDeleteConfirmation}
        setOriginalProfileImage={setOriginalProfileImage}
        setProfileImage={setProfileImage}
        setIsEditingProfile={setIsEditingProfile}
      />    </>
  )
}

export default ProfileImage
