import { Box, Button, Chip, SvgIcon, Typography, useTheme } from '@mui/material'
import { UserContext } from '../../context/UserContext'
import React, { useContext, useEffect, useState } from 'react'
import { Heart, Bell, Clock, CheckCircle, BookOpen, Plus, Check, Loader, } from "lucide-react"
import { Add, Favorite } from '@mui/icons-material'
import { blue, green, grey, red, yellow } from '@mui/material/colors'
import { api } from '../../services/api'
import { useTranslation } from 'react-i18next'
function TestPage() {
  const theme = useTheme()
  const {i18n}=useTranslation()
  const [keyLoading, setKeyLoading] = useState(null)
  const libraryItems = [
    {
      key: "Favorites",
      label: "Favorite",
      icon: <Heart size="16px" style={{ color: red[500] }} />,
      descriptionAdd: "Add to favorites",
      descriptionRemove: "Remove from favorites",
    },
    {
      key: "Notifications",
      label: "Notifications",
      icon: <Bell size="16px" style={{ color: blue[500] }} />,
      descriptionAdd: "Get notified of updates",
      descriptionRemove: "Stop notifications",
    },
    {
      key: "ReadingLater",
      label: "Reading Later",
      icon: <Clock size="16px" style={{ color: yellow[900] }} />,
      descriptionAdd: "Save for later",
      descriptionRemove: "Remove from saved list",
    },
    {
      key: "CompletedReads",
      label: "Completed",
      icon: <CheckCircle size="16px" style={{ color: green[500] }} />,
      descriptionAdd: "Mark as completed",
      descriptionRemove: "Unmark as completed",
    },
    {
      key: "CurrentlyReading",
      label: "Currently Reading",
      icon: <BookOpen size="16px" style={{ color: theme.palette.primary.main }} />,
      descriptionAdd: "Add to current reads",
      descriptionRemove: "Remove from current reads",
    },
  ];

  const [libraryStatus, setLibraryStatus] = useState({
    Favorites: false,
    Notifications: true,
    ReadingLater: false,
    CompletedReads: false,
    CurrentlyReading: true,
  })

const activeCount = Object.values(libraryStatus).filter(Boolean).length

  const toggleItemStatus = async (key) => {
    try {
      setKeyLoading(key)
      if (libraryStatus[key]) {
        console.log(`delete from ${key}`)
        const baseUrl = `/${key}/RemoveFrom${key}/70`
        console.log(baseUrl)
        const { data } = await api.delete(baseUrl)
        console.log(data)
      } else {
        console.log(`add to ${key}`)
        const baseUrl = `/${key}/AddTo${key}/70`
        console.log(baseUrl)
        const { data } = await api.post(baseUrl)
        console.log(data)
      }
      setLibraryStatus(
        (prev) => ({ ...prev, [key]: !prev[key] })
      )
    } catch (error) {
      console.log(error)
    } finally {
      setKeyLoading(null)
    }
  }
  return (
    <>
      <Box sx={{ width: '350px', '@media (max-width:750px)': { width: '100% !important' }, height: 'fit-content', bgcolor: "background.paper", p: 2, borderRadius: '10px', display: "flex", flexDirection: 'column', gap: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
          <Box>
            <Typography variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: "18px",
                color: "text.primary",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              }}
            >
              Add to Library
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: "14px",
                mt: 0.5,
              }}
            >
              Manage your reading lists
            </Typography>
          </Box>
          <Chip label={`${activeCount} active`}
            size="small"
            sx={{
              backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#e3f2fd",
              color: "primary.main",
              border: `1px solid ${theme.palette.primary.main}`,
              fontSize: "12px",
              height: "24px",
            }}
          />
        </Box>
        {libraryItems.map((item, index) => {
          const isActive = libraryStatus[item.key]
          return (
            <Button key={index} disabled={keyLoading ? true : false} sx={{ bgcolor: isActive ? "primary.main" : 'background.default', width: '100%', display: 'flex', justifyContent: 'space-between', borderRadius: '7px', p: "16px", ":hover": { bgcolor: isActive ? 'thirdly.main' : "primary.main" } }}
              onClick={() => { toggleItemStatus(item.key) }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%', }}>
                <Box sx={{ p: 1, borderRadius: '6px', display: "flex", alignItems: 'center', background: isActive ? theme.palette.mode === 'dark' ? red[300] : blue[300] : theme.palette.mode === 'dark' ? "#000" : "#fff" }}>
                  {keyLoading === item.key ? <Loader size={'16px'} style={{ color: '#fff', }} /> : (isActive ? <Check size={'16px'} style={{ color: '#fff', }} /> : item.icon)}
                </Box>
                <Box sx={{ flexGrow: 1, textAlign: i18n.language==="en"?'left':"right", display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    variant="body2" fontWeight="medium"
                    sx={{
                      fontFamily: '"Roboto", sans-serif',
                      textTransform: "none",
                      color: theme.palette.mode === 'dark' ? "#fff" : "#000"
                    }}
                  >
                    {item.label}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      fontFamily: '"Roboto", sans-serif',
                      textTransform: "none",
                    }}
                  >
                    {isActive ? item.descriptionRemove : item.descriptionAdd}
                  </Typography>
                </Box>
                {!isActive && <Add sx={{ width: 16, height: 16, color: 'text.secondary' }} />}
              </Box>
            </Button>

          )
        })}
      </Box>
    </>
  )
}

export default TestPage
