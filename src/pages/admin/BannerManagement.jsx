import { useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Add as AddIcon, ViewCarouselOutlined } from "@mui/icons-material";
import AlertSnackbar from "../../components/admin/bannerManagment/AlertSnackbar ";
import BannerDialog from "../../components/admin/bannerManagment/BannerDialog";
import StatsCards from "../../components/admin/shared/StatsCards";
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
    const handleSaveBanner = (form, message) => {
        if (selectedBanner) {
            handleUpdateBanner(form, message);
        } else {
            handleAddBanner(form, message);
        }
    }
    const { t } = useTranslation()
    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Stack spacing={3}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3} spacing={2}>
                    <Box>
                        <Typography variant="h5" component="h1" >
                            {t("banners")}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" >
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
                </Stack>
                <StatsCards stats={statsBanners} resource={"banners"} Icon={ViewCarouselOutlined} />
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
