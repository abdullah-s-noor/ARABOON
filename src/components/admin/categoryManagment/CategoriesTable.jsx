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
import CategoryTableSkeleton from './CategoryTableSkeleton';
import MyTablePagination from '../shared/MyTablePagination';
import CategoryRow from './CategoryRow';

function CategoriesTable({
    categories, // filtered array from your useAllCategories hook
    handleToggleActive,
    handleOpenDialog,
    handleDeleteCategory,
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

    // Local TablePagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Current page
    const displayedCategories = categories.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    // Reset to page 0 if filtering leaves you on non-existent page
    // (useMemo not required but can add if you want)
    if (page > 0 && displayedCategories.length === 0 && categories.length > 0) {
        setPage(0);
    }

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
                    placeholder={t("search_categories_placeholder")}
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
                                {i18n.language === "ar" ? "الاسم (إنجليزي / عربي)" : "Name (EN / AR)"}
                            </TableCell>
                            <TableCell sx={style.textAlign}>
                                {i18n.language === "ar" ? "عدد المانجا" : "Manga Count"}
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
                        {!loading && (serverError || displayedCategories.length === 0) ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 4, border: 0 }}>
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
                                            {i18n.language === "en" ? "Categories not found" : "لا توجد فئات"}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.7 }}>
                                            {i18n.language === "en"
                                                ? "Check your spelling or try a different keyword."
                                                : "تحقق من الكتابة أو جرّب كلمة مفتاحية مختلفة."}
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : loading ? (
                            Array.from({ length: rowsPerPage }).map((_, index) => (
                                <CategoryTableSkeleton key={index}/>
                            ))
                        ) : (
                            displayedCategories.map(category => (
                               <CategoryRow category={category} handleOpenDialog={handleOpenDialog} handleDeleteCategory={handleDeleteCategory} handleToggleActive={handleToggleActive}/>
                            ))
                        )}
                    </TableBody>
                </Table>

                {/* TablePagination at bottom */}
                <MyTablePagination count={categories.length} rowsPerPage={rowsPerPage} page={page} minWidth={630} setPage={setPage} setRowsPerPage={setRowsPerPage}/>
            </TableContainer>
        </Card>
    );
}

export default CategoriesTable;
