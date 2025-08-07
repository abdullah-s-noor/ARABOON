import { Box,Typography } from '@mui/material'
import GeneralMangaCard from '../../common/GeneralMangaCard'
import { useEffect } from 'react'

function MangaCards({ status, genre, sort }) {
  const card = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  useEffect(() => {

    const fetchData = () => {
      console.log("status", status)
      console.log("genre", genre)
      console.log("sort", sort)
    }
    fetchData()
  }, [status, genre, sort])
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap:{xs:1,sm:1.5,md:2}
        }}>
        {
          [1,2,3,4,5,6,7].map(()=>(
            card.map((n,index ) => (
              <GeneralMangaCard key={index} n={n}/>
            ))
          ))
        }
      </Box>
    </>
  )
}

export default MangaCards
