import { Pagination, PaginationItem } from '@mui/material'
import React from 'react'

function MyPagination() {
    return (
        <Pagination
            count={10}
            variant="outlined"
            color="primary"
            shape="rounded"
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
