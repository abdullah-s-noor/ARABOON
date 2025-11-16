import { Box, Button, Container, Stack, Typography } from "@mui/material";
import AlertSnackbar from "../../components/admin/userManagement/AlertSnackbar ";
import UsersTable from "../../components/admin/userManagement/UsersTable";
import StatsCards from "../../components/admin/userManagement/StatsCards";
import { useTranslation } from "react-i18next";
import usePaginatedUsers from "../../hooks/usePaginatedUsers";

export default function UserManagement() {
    const { users, loading, count, pageNumber, setPageNumber, pageSize, serverError, statsUsers, search, handleSearch, setPageSize, updateUserLocally, snackbar, setSnackbar } = usePaginatedUsers({ baseUrl: `/users` });
    console.log(users)


    const { t } = useTranslation()

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Stack spacing={3}>
                <Box>
                    <Typography variant="h5" component="h1" >
                        {t("users")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" >
                        {t("manage_users")}
                    </Typography>
                </Box>
                <StatsCards statsUsers={statsUsers} />
                <Box sx={{ width: "100%", overflowX: "auto" }}>
                    <UsersTable
                        users={users}
                        search={search}
                        handleSearch={handleSearch}
                        count={count}
                        pageSize={pageSize}
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                        setPageSize={setPageSize}
                        serverError={serverError}
                        loading={loading}
                        updateUserLocally={updateUserLocally}
                    />
                </Box>
            </Stack>
            <AlertSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
        </Container>
    );
}
