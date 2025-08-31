import { Avatar, Box, Chip, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import CoverImage from '../../components/user/profile/coverImage/CoverImage'
import React, { useEffect, useState } from 'react'
import MyAvatar from '../../components/common/MyAvatar'
import ProfileImage from '../../components/user/profile/profileImage/ProfileImage'
import { DateRange } from '@mui/icons-material'
import LibraryStats from '../../components/user/profile/LibraryStats'
import EditUserInformation from '../../components/user/editUserInformation/EditUserInformation'
import { api } from '../../services/api'
import { useTranslation } from 'react-i18next'
import FavoritesCategories from '../../components/user/profile/FavoritesCategories'

function Profile() {
    const {i18n}=useTranslation()
    const theme=useTheme() 
    const style = {
        container: { bgcolor:theme.palette.mode==='dark'?"#000 !important":"#fff !important", borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px', pb: 4, background: 'linear-gradient(rgba(255, 255, 255, 0.051), rgba(255, 255, 255, 0.051))' },

        title: {
            fontFamily: '"Open Sans",sans-serif,Cairo',
            color: 'text.primary',
            fontSize: { xs: '25px', md: '28px' },
            fontWeight: 'bold',
        },

        subtitle: {
            fontSize: '16px',
            color: 'text.secondary',
            fontFamily: '"Roboto", sans-serif',
            fontOpticalSizing: 'auto',
            fontWeight: 400,
        },
    }

    const [profileData, setProfileData] = useState(null)
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await api.get("/users/profile/darxx03eh")
                console.log(data.data)
                setProfileData(data.data)
                setUserInfo({
                    firstName: data.data.firstName,
                    lastName: data.data.lastName,
                    userName: data.data.userName,
                    email: data.data.email,
                    bio: data.data.bio,
                })
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [i18n.language])
    return (
        <>
            {
                loading ? <Typography>loading profile data</Typography> :
                    <>
                        <Box sx={style.container}>
                            <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
                                <CoverImage originalImage={profileData.coverImage.originalImage} croppedImage={profileData.coverImage.croppedImage} />
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '600px', mx: "auto", mt: -12 }}>
                                    <ProfileImage originalImage={profileData.profileImage.originalImage} cropInfo={profileData.profileImage.cropData} />
                                    {/* full name & usename & Bio */}
                                    <Box sx={{ textAlign: 'center' }} >
                                        <Typography sx={style.title}>
                                            {userInfo.firstName + " " + userInfo.lastName}
                                        </Typography>
                                        <Typography sx={style.subtitle}>
                                            {userInfo.userName}
                                        </Typography>
                                        <Typography sx={{ ...style.subtitle, fontSize: { sm: '18px ' }, mt: 2, mx: 3 }}>
                                            {userInfo.bio}
                                        </Typography>
                                    </Box>
                                    {/* chips */}
                                    <Stack direction="row" mt={1.5} >
                                        <Chip label={profileData.role} color="primary" sx={{...(i18n.language==='en'?{mr:1}:{ml:1}),}}/>
                                        <Chip label={profileData.isActive ? "active" : "inactive"} color={profileData.isActive ? "success" : "error"} />
                                    </Stack>
                                    {/* date when create here account */}
                                    <Typography sx={{ ...style.subtitle, mt: 1.5, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, }}>
                                        <DateRange sx={{ color: "text.secondary" }} />
                                        {profileData.joinDate}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <LibraryStats librariesCount={profileData.library} />
                        <EditUserInformation userInfo={userInfo} setUserInfo={setUserInfo} />
                        <FavoritesCategories favoritesCategories={profileData.favoritesCategories}/>
                    </>
            }
        </>
    )
}

export default Profile
