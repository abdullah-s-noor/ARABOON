import { Box, Typography } from '@mui/material'
import MySkeleton from '../user/mySkeletons/MySkeleton'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import GeneralMangaCard from './GeneralMangaCard';
import { useTranslation } from 'react-i18next';
import usePhone from '../../hooks/usePhone';
import NoDataBox from './NoDataBox';
import { useLocation, useNavigate } from 'react-router-dom';

function GeneralPreviewCards({ mangas, loading, pageNumber, count, setPageNumber, hasNextPage, pageSize, setSelectedForDeletion = null }) {
    const { t } = useTranslation();
    const { isMobile, isTablet } = usePhone();


    const navigate = useNavigate();
    const skeletonStyle = {
        h: { xs: "150px", sm: "225px", md: "345px" },
        w: { xs: "100px", sm: "150px", md: "230px" },
        pd: '0px'
    }
    return (
        <>

            {
                loading && pageNumber === 1 ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', }}>
                        <MySkeleton
                            SkeletonCount={isMobile ? 6 : isTablet ? 10 : 12}
                            pd={skeletonStyle.pd} h={skeletonStyle.h} w={skeletonStyle.w}
                        />
                    </Box>
                ) :
                    mangas && mangas.length > 0 ?
                        (<InfiniteScroll
                            dataLength={mangas.length}
                            next={() => setPageNumber(prev => prev + 1)} // زيادة الصفحة عند تحميل المزيد
                            hasMore={hasNextPage} // true أو false حسب وجود صفحات إضافية
                            loader={<MySkeleton
                                SkeletonCount={Math.min(pageSize, count - pageSize * (pageNumber - 1))}
                                pd={skeletonStyle.pd} h={skeletonStyle.h} w={skeletonStyle.w}
                            />}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                gap: '10px'
                            }}
                        >
                            {
                                mangas?.map((manga, index) => (
                                    <GeneralMangaCard key={index} mangaData={manga} setSelectedForDeletion={setSelectedForDeletion} />
                                ))
                            }
                        </InfiniteScroll>
                        ) :
                        (
                            <NoDataBox/>
                        )
            }
        </>

    )
}

export default GeneralPreviewCards
