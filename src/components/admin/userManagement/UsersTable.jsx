import { useState } from 'react';
import {
    Box,
    Card,
    Chip,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    CheckCircle as ActiveIcon,
    Cancel as InactiveIcon,
    Search,
    SearchOff
} from "@mui/icons-material";
import { useTranslation } from 'react-i18next';
import UserRow from './UserRow';
import UserTableSkeleton from './UserTableSkeleton';

function UsersTable({ users, search, handleSearch, count, pageSize, pageNumber, setPageNumber, setPageSize, loading, serverError, updateUserLocally }) {
    const { t, i18n } = useTranslation()
    const style = {
        textAlign: {
            textAlign: i18n.language === "ar" ? "right" : "left"
        }
    };
    return (
        <>
            <Card
                sx={{
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    maxHeight: 620, // أقصى ارتفاع للجدول
                    overflowY: "auto",
                    willChange: "transform",
                    // تحسين أداء التمرير
                    // تحسين ألوان الـ scrollbar في الوضع الداكن
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: (theme) => i18n.language === "ar" && theme.palette.mode === 'dark' ? '#191919' : '#f1f1f1',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: (theme) => i18n.language === "ar" && theme.palette.mode === 'dark' ? '#555' : '#888',
                        borderRadius: '8px',
                    },
                    // تجنب ظل كبير في الوضع الداكن
                    WebkitBoxShadow: (theme) => i18n.language === "ar" && theme.palette.mode === 'dark' ? 'none' : '0 2px 8px rgba(0,0,0,0.04)',


                }}
            >
                {/* Search Box */}
                <Box sx={{ p: 3, borderBottom: "1px solid", borderColor: "divider" }}>
                    <TextField
                        value={search}
                        onChange={e => { handleSearch(e.target.value) }}
                        fullWidth
                        placeholder={t("search_users_placeholder")}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: "text.secondary" }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                bgcolor: "background.default",
                            },
                        }}
                    />
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 630 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={style.textAlign}>{i18n.language === "ar" ? "الصورة" : "Profile"}</TableCell>
                                <TableCell sx={style.textAlign}>{i18n.language === "ar" ? "الاسم" : "Name"}</TableCell>
                                <TableCell sx={style.textAlign}>{i18n.language === "ar" ? "اسم المستخدم" : "Username"}</TableCell>
                                <TableCell sx={style.textAlign}>{i18n.language === "ar" ? "البريد الإلكتروني" : "Email"}</TableCell>
                                <TableCell sx={style.textAlign}>{i18n.language === "ar" ? "الدور" : "Role"}</TableCell>
                                <TableCell sx={style.textAlign}>{i18n.language === "ar" ? "الحالة" : "Status"}</TableCell>
                                <TableCell sx={style.textAlign}>{i18n.language === "ar" ? "تاريخ الإنشاء" : "Created At"}</TableCell>
                                <TableCell sx={style.textAlign}>{i18n.language === "ar" ? "آخر تسجيل دخول" : "Last Login"}</TableCell>
                                <TableCell align="center">{i18n.language === "ar" ? "الإجراءات" : "Actions"}</TableCell>
                            </TableRow>

                        </TableHead>
                        <TableBody>
                            {serverError && users.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={9} align="center" sx={{ py: 4, border: 0 }}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                gap: 1,
                                                justifyContent: "center",
                                                minHeight: 120,
                                            }}
                                        >
                                            <SearchOff color="disabled" sx={{ fontSize: 40, mb: 1 }} />
                                            <Typography
                                                variant="h6"
                                                color="text.secondary"
                                                fontWeight={500}
                                                sx={{ letterSpacing: 0.5 }}
                                            >
                                                {t("users_not_found")}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.7 }}>
                                                {t("users_not_found_hint")}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )}
                            {/* Loading Skeleton */}
                            {loading &&
                                Array.from({ length: pageSize }).map((_, index) => (
                                    <UserTableSkeleton />
                                ))
                            }
                            {!loading && users.map((user) => (
                                <UserRow key={user.id} user={user} updateUserLocally={updateUserLocally} />
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[3, 5, 10, 25, 50]}
                        component="div"
                        count={count} // العدد الكلي من السيرفر مو users.length
                        rowsPerPage={pageSize}
                        page={pageNumber - 1} // لأن MUI يبدأ من 0
                        sx={{
                            minWidth: 1000,
                            width: "100%",
                            textAlign: "center",

                            // نجبر أزرار pagination فقط إنها تكون LTR
                            "& .MuiTablePagination-actions": {
                            },

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

                        onPageChange={(e, newPage) => {
                            setPageNumber(newPage + 1); // نعيدها لصيغة API
                        }}

                        onRowsPerPageChange={e => {
                            setPageSize(parseInt(e.target.value, 10));
                            setPageNumber(1); // أي تغيير بالعدد يرجع لأول صفحة
                        }}

                        labelRowsPerPage={i18n.language === "ar" ? "عدد العناصر في الصفحة :" : "Rows per page:"}

                        labelDisplayedRows={({ from, to, count }) =>
                            i18n.language === "ar"
                                ? `${to}-${from} من ${count}`
                                : `${from}-${to} of ${count}`
                        }
                    />
                </TableContainer>
            </Card>
        </>
    );
}

export default UsersTable;
