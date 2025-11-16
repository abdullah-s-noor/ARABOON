import { TablePagination } from '@mui/material';
import { t } from 'i18next';
import React from 'react'
import { useTranslation } from 'react-i18next';

function MyTablePagination({rowsPerPage, setRowsPerPage, page, setPage, count,minWidth,type=""}) {
    const {i18n} = useTranslation();
    return (
        <>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                sx={{
                    minWidth: minWidth,
                    width: "100%",
                    textAlign: "center",
                    "& .MuiTablePagination-actions button": {
                        borderRadius: "8px",
                        marginInline: "4px",
                        transition: "0.2s",
                    },
                    "& .MuiTablePagination-actions button:hover": {
                        transform: "scale(1.12)"
                    },
                    "& .MuiTablePagination-actions svg": {
                        fontSize: "1.4rem",
                        transform: i18n.language === "ar" ? "scaleX(-1)" : "none", // flip only in RTL
                    },
                }}
                onPageChange={(e, newPage) => setPage(type==="user"?newPage+1:newPage)}
                onRowsPerPageChange={e => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(type==="user"?1:0);
                }}
                labelRowsPerPage={i18n.language === "ar" ? "عدد العناصر في الصفحة :" : "Rows per page:"}
                labelDisplayedRows={({ from, to, count }) => i18n.language === "ar" ? ` ${to}-${from} من ${count}` : ` ${from}-${to} of ${count}`}
            />
        </>
    )
}

export default MyTablePagination
