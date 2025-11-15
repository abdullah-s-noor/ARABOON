import { useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import AlertSnackbar from "../../components/admin/bannerManagment/AlertSnackbar ";
import BannerDialog from "../../components/admin/bannerManagment/BannerDialog";
import BannerTable from "../../components/admin/bannerManagment/BannersTable";
import StatsCards from "../../components/admin/shared/StatsCards";
import { api } from "../../services/api";
import { useTranslation } from "react-i18next";
import useResource from "../../hooks/useResource";
import BannersTable from "../../components/admin/bannerManagment/BannersTable";

export default function BannerManagement() {
    const {
        data: banners,
        setData: setBanners,
        loading,
        search,
        stats: statsBanners,
        handleSearchChange,
        handleAdd: handleAddBanner,
        handleUpdate: handleUpdateBanner,
        handleDelete: handleDeleteBanner,
        serverError,
        handleToggleActive,
        snackbar,
        setSnackbar,
    } = useResource({
        baseUrl: "/swipers/dashboard",
        resourceName: "banner",
        searchableFields: ["noteEn", "noteAr"],
    });
    const [selectedBanner, setSelectedBanner] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const handleOpenEditDialog = (chapter) => {
        setSelectedBanner(chapter)
        setDialogOpen(true)
    }
    const handleOpenAddDialog = () => {
        setSelectedBanner(null)
        setDialogOpen(true)
    }
    const handleSaveBanner = (form,message) => {
        if (selectedBanner) {
            handleUpdateBanner(form,message);
        } else {
            handleAddBanner(form,message);
        }
    }
    const { t } = useTranslation()
    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Stack spacing={3}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box>
                        <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
                            {t("banners")}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {t("manage_banners")}
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpenAddDialog()}
                        sx={{ height: "fit-content", borderRadius: 3, direction: "ltr" }}
                    >
                        {t("add_banner")}
                    </Button>
                </Box>
                <StatsCards stats={statsBanners} resource={"banners"} />
                <Box sx={{ width: "100%", overflowX: "auto" }}>
                    <BannersTable
                        serverError={serverError}
                        banners={banners}
                        handleOpenEditDialog={handleOpenEditDialog}
                        handleDeleteBanner={handleDeleteBanner}
                        handleToggleActive={handleToggleActive}
                        search={search}
                        handleSearchChange={handleSearchChange}
                        loading={loading}
                    />
                </Box>
            </Stack>
            <AlertSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />

            <BannerDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSave={handleSaveBanner}
                banner={selectedBanner}
            />
        </Container>
    );
}
