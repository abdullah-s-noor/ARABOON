// AdminHomePage.jsx
import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    CardActions,
    Typography,
    Stack,
    Avatar,
    Button,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Divider,
    Chip,
    Tooltip,
    IconButton,
    Skeleton,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import BarChartIcon from "@mui/icons-material/BarChart";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link as RouterLink } from "react-router-dom";
import { api } from "../../services/api";

export default function AdminHomePage() {
    const { i18n } = useTranslation();
    const isArabic = i18n.language === "ar";
    const align = isArabic ? "right" : "left";
    const dir = isArabic ? "rtl" : "ltr";

    // ---- Demo numbers/data (replace with API later) ----
    const [stats, setStats] = useState(
        {
            categories: { totalCounts: 0, percentage: +0 },
            mangas: { totalCounts: 0, percentage: +0 },
            users: { totalCounts: 0, percentage: +0 },
            banners: { totalCounts: 0, percentage: +0 },
            activeMangasPercent: 0,
        }
    )
    const [topCategories, setTopCategories] = useState(null)

    const Trend = ({ percentage }) => {
        const positive = percentage >= 0;
        const Icon = positive ? TrendingUpIcon : TrendingDownIcon;
        const color = positive ? "success.main" : "error.main";
        return (
            <Stack direction="row" spacing={0.5} alignItems="center">
                <Icon sx={{ fontSize: 18, color }} />
                <Typography variant="caption" sx={{ color }}>
                    {Math.abs(percentage).toFixed(1)}%
                </Typography>
            </Stack>
        );
    };

    const KpiCard = ({ title, totalCounts, percentage, icon, to }) => (
        <Card>
            <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography color="text.secondary" gutterBottom sx={{ textAlign: align }}>
                            {title}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="baseline">
                            <Typography variant="h5" component="div" sx={{ textAlign: align }}>
                                {totalCounts}
                            </Typography>
                            {typeof percentage === "number" && <Trend percentage={percentage} />}
                        </Stack>
                    </Box>
                    <Avatar sx={{ bgcolor: "primary.main", width: 44, height: 44 }}>{icon}</Avatar>
                </Stack>
            </CardContent>
            {to && (
                <CardActions sx={{ justifyContent: isArabic ? "flex-start" : "flex-end" }}>
                    <Button
                        size="small"
                        endIcon={<ArrowForwardIcon />}
                        component={RouterLink}
                        to={to}
                        sx={{ direction: "ltr" }}
                    >
                        {isArabic ? "التفاصيل" : "Details"}
                    </Button>
                </CardActions>
            )}
        </Card>
    );
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await api.get("/dashboards")
                console.log(data)
                setStats({ activeMangasPercent: data.data.mangaPercentage.activePercentage, categories: data.data.categories, mangas: data.data.mangas, users: data.data.users, banners: data.data.banners })
                setTopCategories(data.data.topCategories)
            } catch (error) {
            }
        }
        fetchData()
    }, [])
    return (
        <Box dir={dir} sx={{ p: 3 }}>
            {/* Header */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3} spacing={2}>
                <Box>
                    <Typography variant="h5" component="h1" sx={{ textAlign: align }}>
                        {isArabic ? "لوحة التحكم" : "Admin Dashboard"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: align }}>
                        {isArabic ? "نظرة عامة على الأداء والأنشطة" : "Overview of performance and activity"}
                    </Typography>
                </Box>
                <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
                    <DashboardIcon />
                </Avatar>
            </Stack>

            <Box sx={{
                display: "grid",
                gap: 3,
                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(12, 1fr)",
                },
            }}>
                {/* KPI Cards */}
                <Box sx={{ gridColumn: { xs: "1 / -1", sm: "span 1", md: "span 3" } }}>
                    <KpiCard
                        title={isArabic ? "التصنيفات" : "Categories"}
                        totalCounts={stats.categories.totalCounts}
                        percentage={stats.categories.percentage}
                        icon={<CategoryIcon />}
                        to="/dashboard/category-management"
                    />
                </Box>
                <Box sx={{ gridColumn: { xs: "1 / -1", sm: "span 1", md: "span 3" } }}>
                    <KpiCard
                        title={isArabic ? "المانغا" : "Mangas"}
                        totalCounts={stats.mangas.totalCounts}
                        percentage={stats.mangas.percentage}
                        icon={<MenuBookIcon />}
                        to="/dashboard/manga-management"
                    />
                </Box>
                <Box sx={{ gridColumn: { xs: "1 / -1", sm: "span 1", md: "span 3" } }}>
                    <KpiCard
                        title={isArabic ? "المستخدمون" : "Users"}
                        totalCounts={stats.users.totalCounts}
                        percentage={stats.users.percentage}
                        icon={<GroupIcon />}
                        to="/dashboard/user-management"
                    />
                </Box>
                <Box sx={{ gridColumn: { xs: "1 / -1", sm: "span 1", md: "span 3" } }}>
                    <KpiCard
                        title={isArabic ? "اللافتات" : "Banners"}
                        totalCounts={stats.banners.totalCounts}
                        percentage={stats.banners.percentage}
                        icon={<QueryStatsIcon />}
                        to="/dashboard/banner-management"
                    />
                </Box>


                <Box sx={{ gridColumn: { xs: "1 / -1" } }}>
                    <Card>
                        <CardContent>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                                <Typography variant="h6" sx={{ textAlign: align }}>
                                    {isArabic ? "التفاعل ونشاط القراءة" : "Engagement & Reading Activity"}
                                </Typography>
                                <BarChartIcon color="primary" />
                            </Stack>
                            <Typography variant="body2" color="text.secondary" sx={{ textAlign: align, mb: 2 }}>
                                {isArabic
                                    ? "نسبة المانغا النشطة خلال الأسبوع الماضي"
                                    : "Active mangas ratio over the past week"}
                            </Typography>
                            <LinearProgress variant="determinate" value={stats.activeMangasPercent} sx={{ height: 8, borderRadius: 4 }} />
                            <Stack direction="row" spacing={2} mt={1}>
                                <Chip label={("Active: ") + stats.activeMangasPercent + "%"} color="success" size="small" />
                                <Chip label={("Inactive: ") + (100 - stats.activeMangasPercent) + "%"} size="small" />
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>


                {/* Top Categories */}
                <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 6" } }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ textAlign: align }}>
                                {isArabic ? "أفضل التصنيفات" : "Top Categories"}
                            </Typography>
                            <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1}>
                                {
                                    topCategories ? topCategories.map((cat, index) => (
                                        <Chip key={index} label={`${cat.name} • ${(cat.totalMangasCount)}`} />
                                    ))
                                        :
                                        [1, 2, 3, 4].map((index) => (
                                            <Skeleton key={index} variant="rectangular" width={66} height={23} sx={{ borderRadius: 4 }} />
                                        ))
                                }
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>

                {/* Quick Actions */}
                <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 6" } }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ textAlign: align }}>
                                {isArabic ? "إجراءات سريعة" : "Quick Actions"}
                            </Typography>
                            <Box sx={{
                                display: "grid",
                                gap: 3,
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    sm: "repeat(2, 1fr)",
                                },
                            }} gap={2}>
                                <Button
                                    variant="contained"
                                    startIcon={<CategoryIcon />}
                                    component={RouterLink}
                                    to="/dashboard/category-management"
                                    sx={{ direction: "ltr" }}

                                >
                                    {isArabic ? "إدارة التصنيفات" : "Manage Categories"}
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<MenuBookIcon />}
                                    component={RouterLink}
                                    to="/dashboard/manga-management"
                                    sx={{ direction: "ltr" }}
                                >
                                    {isArabic ? "إدارة المانغا" : "Manage Mangas"}
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<GroupIcon />}
                                    component={RouterLink}
                                    to="/dashboard/user-management"
                                    sx={{ direction: "ltr" }}
                                >
                                    {isArabic ? "إدارة المستخدمين" : "Manage Users"}
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<GroupIcon />}
                                    component={RouterLink}
                                    to="/dashboard/banner-management"
                                    sx={{ direction: "ltr" }}
                                >
                                    {isArabic ? "إدارة اللافتات" : "Manage Banners"}
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
}
