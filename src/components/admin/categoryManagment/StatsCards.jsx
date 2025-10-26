import { Category } from "@mui/icons-material"
import { Card, CardContent, Typography, Box, Stack, alpha } from "@mui/material"
import { useTranslation } from "react-i18next"
import {
    CheckCircle as ActiveIcon,
    Cancel as InactiveIcon,
} from "@mui/icons-material";
export default function StatsCards({ statsCategories }) {
    const {t}=useTranslation()
    const total = statsCategories.totalCategories
    const active = statsCategories.activeCategories
    const inactive =  statsCategories.inActiveCategories
    return (
        <>
             {/* Stats Cards */}
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 3 }}>
            <Card
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <Box sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="body2" color="text.secondary" fontWeight={500} gutterBottom>
                      {t("total_categories")}
                    </Typography>
                    <Typography variant="h3" fontWeight={700}>
                      {total}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      bgcolor: alpha("#6366f1", 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Category sx={{ color: "#6366f1", fontSize: 28 }} />
                  </Box>
                </Stack>
              </Box>
            </Card>

            <Card
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <Box sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="body2" color="text.secondary" fontWeight={500} gutterBottom>
                      {t("active_categories")}
                    </Typography>
                    <Typography variant="h3" fontWeight={700} color="success.main">
                      {active}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      bgcolor: alpha("#10b981", 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ActiveIcon sx={{ color: "#10b981", fontSize: 28 }} />
                  </Box>
                </Stack>
              </Box>
            </Card>

            <Card
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <Box sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="body2" color="text.secondary" fontWeight={500} gutterBottom>
                      {t("inactive_categories")}
                    </Typography>
                    <Typography variant="h3" fontWeight={700} color="error.main">
                      {inactive}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      bgcolor: alpha("#ef4444", 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <InactiveIcon sx={{ color: "#ef4444", fontSize: 28 }} />
                  </Box>
                </Stack>
              </Box>
            </Card>
          </Box>
            </>
    )
}
