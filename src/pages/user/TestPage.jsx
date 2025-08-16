"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  Button,
  TextField,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
  Box,
  Container,
  Grid,
  InputAdornment,
} from "@mui/material"
import { Search, Delete } from "@mui/icons-material"

// Mock data for bookmarks
const mockBookmarks = [
  { id: "1", title: "Book One", image: "image1.jpg", genre: "Fiction" },
  { id: "2", title: "Book Two", image: "image2.jpg", genre: "Non-Fiction" },
  // Add more mock bookmarks as needed
]

export default function FavoritesPageMUI() {
  const [bookmarks, setBookmarks] = useState(mockBookmarks)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedForDeletion, setSelectedForDeletion] = useState(null)
  const [clearAllDialogOpen, setClearAllDialogOpen] = useState(false)

  // Function to handle bookmark removal
  const handleRemoveBookmark = (id) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id))
    setSelectedForDeletion(null) // إغلاق الديالوج بعد الحذف
  }

  // Function to handle clearing all bookmarks
  const handleClearAllBookmarks = () => {
    setBookmarks([])
  }

  // Filter bookmarks based on search term
  const filteredBookmarks = bookmarks.filter((bookmark) =>
    bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Header Section */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "background.paper" }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Search Bar */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <TextField
              placeholder="Search bookmarks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ maxWidth: 400, width: "100%" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {filteredBookmarks.length === 0 ? (
          <Typography variant="h6" color="text.secondary">
            No bookmarks found.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredBookmarks.map((bookmark) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={bookmark.id}>
                <Card
                  sx={{
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: 6,
                      "& .delete-button": {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <Box
                      component="img"
                      src={bookmark.image || "/placeholder.svg"}
                      alt={bookmark.title}
                      sx={{ width: "100%", height: 192, objectFit: "cover" }}
                    />

                    <IconButton
                      className="delete-button"
                      size="small"
                      color="error"
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        opacity: 0,
                        transition: "opacity 0.2s ease",
                        bgcolor: "error.main",
                        color: "error.contrastText",
                        "&:hover": {
                          bgcolor: "error.dark",
                        },
                      }}
                      onClick={() => setSelectedForDeletion(bookmark.id)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>

                    <Chip
                      label={bookmark.genre}
                      size="small"
                      sx={{
                        position: "absolute",
                        bottom: 8,
                        left: 8,
                      }}
                    />
                  </Box>

                  <CardContent>
                    <Typography variant="h5" component="div">
                      {bookmark.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Footer Section */}
        {bookmarks.length > 0 && (
          <Box sx={{ mt: 6, pt: 4, borderTop: 1, borderColor: "divider", textAlign: "center" }}>
            <Button
              variant="contained"
              color="error"
              startIcon={<Delete />}
              onClick={() => setClearAllDialogOpen(true)}
              sx={{
                bgcolor: "error.main",
                "&:hover": {
                  bgcolor: "error.dark",
                },
              }}
            >
              Clear All Bookmarks
            </Button>
          </Box>
        )}
      </Container>

      <Dialog open={selectedForDeletion !== null} onClose={() => setSelectedForDeletion(null)}>
        <DialogTitle>Remove Bookmark</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove "
            {bookmarks.find((b) => b.id === selectedForDeletion)?.title}" from your bookmarks? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedForDeletion(null)}>Cancel</Button>
          <Button
            onClick={() => selectedForDeletion && handleRemoveBookmark(selectedForDeletion)}
            color="error"
            variant="contained"
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={clearAllDialogOpen} onClose={() => setClearAllDialogOpen(false)}>
        <DialogTitle>Clear All Bookmarks</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove all bookmarks? This will permanently delete all {bookmarks.length} items
            from your collection. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClearAllDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleClearAllBookmarks()
              setClearAllDialogOpen(false)
            }}
            color="error"
            variant="contained"
          >
            Clear All
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
