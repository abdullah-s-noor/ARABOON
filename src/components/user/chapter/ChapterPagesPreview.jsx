import { Box } from '@mui/material'
import React from 'react'

function ChapterPagesPreview({containerRef,setOpen,pages}) {
    console.log(pages)
    return (
        <>
            <Box
                ref={containerRef}
                sx={{
                    flexGrow: 1,
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                    overflowY: "auto",
                }}
                onClick={() => setOpen((prev) => !prev)}
            >
                {pages.map((image, index) => (
                    <Box
                        key={index}
                        component="img"
                        src={image}
                        maxWidth="800px"
                        width="100%"
                        data-index={index}
                        loading="lazy"
                    />
                ))}
            </Box>
        </>
    )
}

export default React.memo(ChapterPagesPreview)
