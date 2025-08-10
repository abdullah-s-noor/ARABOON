import { Box} from '@mui/material'
import RankingPageCard from './RankingPageCard'
import { useEffect, useState } from 'react'
import { api } from '../../../services/api';
import MyPagination from '../../common/MyPagination';
import Loader from '../../common/Loader';
import usePhone from '../../../hooks/usePhone';

function RankingPageContent() {
    const {isTablet, isMobile} = usePhone();
    const [mangas, setMangas] = useState([]);
    const [loading,setLoading] = useState(true);
    const[count, setCount] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const pageSize=isTablet?18:isMobile?12:20; ; 
    
    useEffect(() => {
        const fetchHottestManga= async()=>{
            try {
                const response = await api.get(`https://localhost:7099/Api/V1/Manga/GetMangaByStatus?Status=ongoing&PageNumber=${pageNumber}&OrderBy=1&pageSize=${pageSize}`);
                const data = response.data.data;
                console.log("Fetched Manga Data:", data);
                setCount(data.totalPages);
                console.log("Total Pages:", data.totalPages);
                setMangas(data.data);
                console.log("Mangas:", data.data);
                setHasNextPage(data.hasNextPage);
                console.log("Has Next Page:", data.hasNextPage);
                setHasPreviousPage(data.hasPreviousPage);
                console.log("Has Previous Page:", data.hasPreviousPage);
            }catch (error) {
                console.error("Error fetching hottest manga:", error.response ? error.response.data.message : error.message);
            }finally{
                setLoading(false);
            }
        }
        fetchHottestManga();
    }, [pageNumber]);
    return (
        <>
        {loading ? <Loader /> : 
        <>
            <Box
                sx={{
                    p: { xs: "20px 3px", sm: "30px 10px" },
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: { xs: .5, sm: 2 }
                }}>
                {mangas.map((mangaData, index) => (
                    <RankingPageCard key={index} mangaData={mangaData} rate={index}/>
                ))}
            </Box>
                        <MyPagination page={pageNumber} setPage={setPageNumber} count={count} />
        </>
        }
        </>
    )
}

export default RankingPageContent
