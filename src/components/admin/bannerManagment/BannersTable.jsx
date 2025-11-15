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
import BannerTableSkeleton from './BannerTableSkeleton';
import BannerRow from './BannerRow';
import PreviewImage from './PreviewImage';

function BannersTable({
    banners, // filtered array from your useAllCategories hook
    handleToggleActive,
    handleOpenEditDialog,
    handleDeleteBanner,
    search,
    handleSearchChange,
    serverError,
    loading,
}) {
    const { i18n, t } = useTranslation();
    const style = {
        textAlign: {
            textAlign: i18n.language === "ar" ? "right" : "left"
        }
    };
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const displayedCategories = banners.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );
    if (page > 0 && displayedCategories.length === 0 && banners.length > 0) {
        setPage(0);
    }
    const [previewImage, setPreviewImage] = useState(null);
    return (
        <Card
            sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                maxHeight: 620, // أقصى ارتفاع للجدول
                overflowY: "auto",
            }}
        >
            {/* Search Box */}
            <Box sx={{ p: 3, borderBottom: "1px solid", borderColor: "divider" }}>
                <TextField
                    onChange={e => handleSearchChange(e.target.value)}
                    value={search}
                    fullWidth
                    placeholder={t("search_banners_placeholder")}
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
            <TableContainer
                component={Paper}
            >
                <Table sx={{ minWidth: 630 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={style.textAlign}>
                                {i18n.language === "ar" ? "(إنجليزي / عربي) ملاحظات" : "Note (EN / AR)"}
                            </TableCell>
                            <TableCell sx={style.textAlign}>
                                {i18n.language === "ar" ? "الرابط" : "Link"}
                            </TableCell>
                            <TableCell sx={style.textAlign}>
                                {i18n.language === "ar" ? "المعاينة" : "Preview"}
                            </TableCell>
                            <TableCell sx={style.textAlign}>
                                {i18n.language === "ar" ? "الحالة" : "Status"}
                            </TableCell>
                            <TableCell sx={style.textAlign}>
                                {i18n.language === "ar" ? "تاريخ الإنشاء" : "Created At"}
                            </TableCell>
                            <TableCell align="center">
                                {i18n.language === "ar" ? "الإجراءات" : "Actions"}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading&&(serverError || displayedCategories.length) === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 4, border: 0 }}>
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
                                        <Typography variant="h6" color="text.secondary" fontWeight={500} sx={{ letterSpacing: 0.5 }}>
                                            {i18n.language === "en" ? "Banners not found" : "لا توجد لافتات"}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary"sx={{ opacity: 0.7 }}>
                                            {i18n.language === "en"
                                                ? "Check your spelling or try a different keyword."
                                                : "تحقق من الكتابة أو جرّب كلمة مفتاحية مختلفة."}
                                        </Typography>

                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : loading ? (
                            <>
                                {
                                    Array.from({ length: rowsPerPage }).map((_, index) => (
                                        <BannerTableSkeleton />
                                    ))
                                }
                            </>
                        ) : (
                            displayedCategories.map(banner => (
                                <BannerRow key={banner.id} banner={banner} handleDeleteBanner={handleDeleteBanner} handleToggleActive={handleToggleActive} handleOpenEditDialog={handleOpenEditDialog} setPreviewImage={setPreviewImage} />
                            ))
                        )}
                    </TableBody>
                </Table>

                {/* TablePagination at bottom */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={banners.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    sx={{ direction: i18n.language === "ar" ? "rtl" : "ltr", minWidth: 630 }}
                    onPageChange={(e, newPage) => setPage(newPage)}
                    onRowsPerPageChange={e => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                    }}
                    labelRowsPerPage={i18n.language === "ar" ? "عدد العناصر في الصفحة :" : "Rows per page:"}
                    labelDisplayedRows={({ from, to, count }) => i18n.language === "ar" ? ` ${to}-${from} من ${count}` : ` ${from}-${to} of ${count}`}
                />
            </TableContainer>
            <PreviewImage previewImage={previewImage} setPreviewImage={setPreviewImage} />
        </Card>
    );
}

export default BannersTable;
