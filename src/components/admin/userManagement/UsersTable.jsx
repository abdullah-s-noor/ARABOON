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
import MyTablePagination from '../shared/MyTablePagination';

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
                    maxHeight: 620,
                    overflowY: "auto",
                    willChange: "transform",
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
                    <Table sx={{ minWidth: 1200 }}>
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
                    <MyTablePagination count={count} rowsPerPage={pageSize} page={pageNumber-1} minWidth={1200}setPage={setPageNumber} setRowsPerPage={setPageSize} type="user"/>
                </TableContainer>
            </Card>
        </>
    );
}

export default UsersTable;
