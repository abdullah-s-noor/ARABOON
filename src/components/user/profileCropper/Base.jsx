import React, { useState } from 'react'
import Cropper from 'react-easy-crop'
import { Box, Slider, Typography, Button } from '@mui/material'
import ImgDialog from './ImgDialog'
import { getCroppedImg, getRotatedImage } from './canvasUtils'
import { getOrientation } from 'get-orientation'

const ORIENTATION_TO_ANGLE = { '3': 180, '6': 90, '8': -90 }

export default function ProfileCropper() {
  const [imageSrc, setImageSrc] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const onCropComplete = (croppedArea, croppedPixels) => setCroppedAreaPixels(croppedPixels)

  const showCroppedImage = async () => {
    if (!croppedAreaPixels || !imageSrc) return
    const cropped = await getCroppedImg(imageSrc, croppedAreaPixels, rotation)
    setCroppedImage(cropped)
  }

  const onFileChange = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return
    const file = e.target.files[0]
    let imageDataUrl = await readFile(file)

    try {
      const orientation = await getOrientation(file)
      const rotation = ORIENTATION_TO_ANGLE[orientation]
      if (rotation) imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
    } catch {
    }

    setImageSrc(imageDataUrl)
  }

  return (
    <Box>
      {imageSrc ? (
        <>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: { xs: 200, sm: 400 },
              background: '#333',
            }}
          >
            <Cropper
              image={imageSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              p: 2,
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <Typography sx={{ minWidth: { xs: 65 } }}>Zoom</Typography>
              <Slider value={zoom} min={1} max={3} step={0.1} onChange={(e, val) => setZoom(val)} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <Typography sx={{ minWidth: { xs: 65 } }}>Rotation</Typography>
              <Slider value={rotation} min={0} max={360} step={1} onChange={(e, val) => setRotation(val)} />
            </Box>
            <Button variant="contained" color="primary" onClick={showCroppedImage}>
              Show Result
            </Button>
          </Box>

          <ImgDialog img={croppedImage} onClose={() => setCroppedImage(null)} />
        </>
      ) : (
        <input type="file" onChange={onFileChange} accept="image/*" />
      )}
    </Box>
  )
}

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.readAsDataURL(file)
  })
}
