import { Box, Typography } from '@mui/material'
import GeneralMangaCard from '../../common/GeneralMangaCard'
import { useEffect, useState } from 'react'
import MyPagination from '../../../components/common/MyPagination'
import axios from 'axios'

function MangaCards({ status, genre, sort }) {
  const card = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(null);
  const [mangaList, setMangaList] = useState([])
  useEffect(() => {

    const fetchData = async () => {
      console.log("status", status)
      console.log("genre", genre)
      console.log("sort", sort)
      try {
        const { data } = await axios.get(`/data/page${page}.json`)
        setMangaList(data.data.data)
        setCount(data.data.totalPages)

      } catch {

      } finally {

      }
    }
    fetchData()
  }, [status, genre, sort, page])
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: { xs: 1, sm: 1.5, md: 2 }
        }}>
        {
          mangaList?.map((manga, index) => (
            <GeneralMangaCard key={index} mangaData={manga} />
          ))
        }
      </Box>
      <Box
        sx={{
          margin: 'auto'
        }}>
        <MyPagination page={page} setPage={setPage} count={count} />
      </Box>
    </>
  )
}

export default MangaCards
