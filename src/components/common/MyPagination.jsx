import { Pagination, PaginationItem } from '@mui/material'
import React, { useState } from 'react'

function MyPagination({page,setPage,count}) {

    const handleChange = (event, value) => {
        setPage(value);
    };
    return (
        <Pagination
            count={count}
            variant="outlined"
            color="primary"
            shape="rounded"
            page={page}
            onChange={handleChange}
            renderItem={(item) => (
                <PaginationItem

                    {...item}
                    sx={{
                        fontSize: { sm: 20, md: 24 },
                        minWidth: { sm: 50, md: 60 },
                        height: { sm: 50, md: 60 },
                        borderRadius: 2,
                    }}
                />
            )}
        />
    )
}

export default MyPagination
