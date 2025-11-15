// AdminHomePage.jsx
import React from "react";
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

export default function AdminHomePage() {
    const { i18n } = useTranslation();
    const isArabic = i18n.language === "ar";
    const align = isArabic ? "right" : "left";
    const dir = isArabic ? "rtl" : "ltr";

    // ---- Demo numbers/data (replace with API later) ----
    const stats = {
        categories: { value: 12, change: +4.2 },
        mangas: { value: 234, change: +1.8 },
        users: { value: 5432, change: +2.6 },
        pendingReviews: { value: 18, change: -0.9 },
        activeMangasPercent: 72,
        systemHealth: 92,
    };

    const recentMangas = [
        { id: 1, title_en: "Skybound Chronicle", added: "Nov 8, 2025", chapters: 24 },
        { id: 2, title_en: "Crimson Garden", added: "Nov 6, 2025", chapters: 8 },
        { id: 3, title_en: "Neon Samurai", added: "Nov 3, 2025", chapters: 12 },
    ];

    const recentActivity = [
        { id: 1, who: "Admin", what: isArabic ? "أضاف مانغا جديدة" : "Added new manga", when: "2h" },
        { id: 2, who: "Moderator", what: isArabic ? "فعّل فئة" : "Activated a category", when: "6h" },
        { id: 3, who: "System", what: isArabic ? "مزامنة يومية ناجحة" : "Daily sync succeeded", when: "12h" },
    ];

    const topCategories = [
        { id: 1, name: isArabic ? "أكشن" : "Action", count: 58 },
        { id: 2, name: isArabic ? "رومانسية" : "Romance", count: 41 },
        { id: 3, name: isArabic ? "خيال" : "Fantasy", count: 37 },
        { id: 4, name: isArabic ? "كوميديا" : "Comedy", count: 30 },
    ];

    const fmt = (n) => new Intl.NumberFormat(i18n.language === "ar" ? "ar-EG" : "en-US").format(n);

    const Trend = ({ change }) => {
        const positive = change >= 0;
        const Icon = positive ? TrendingUpIcon : TrendingDownIcon;
        const color = positive ? "success.main" : "error.main";
        return (
            <Stack direction="row" spacing={0.5} alignItems="center">
                <Icon sx={{ fontSize: 18, color }} />
                <Typography variant="caption" sx={{ color }}>
                    {Math.abs(change).toFixed(1)}%
                </Typography>
            </Stack>
        );
    };

    const KpiCard = ({ title, value, change, icon, to }) => (
        <Card>
            <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography color="text.secondary" gutterBottom sx={{ textAlign: align }}>
                            {title}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="baseline">
                            <Typography variant="h5" component="div" sx={{ textAlign: align }}>
                                {fmt(value)}
                            </Typography>
                            {typeof change === "number" && <Trend change={change} />}
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
                        value={stats.categories.value}
                        change={stats.categories.change}
                        icon={<CategoryIcon />}
                        to="/dashboard/category-management"
                    />
                </Box>
                <Box sx={{ gridColumn: { xs: "1 / -1", sm: "span 1", md: "span 3" } }}>
                    <KpiCard
                        title={isArabic ? "المانغا" : "Mangas"}
                        value={stats.mangas.value}
                        change={stats.mangas.change}
                        icon={<MenuBookIcon />}
                        to="/dashboard/manga-management"
                    />
                </Box>
                <Box sx={{ gridColumn: { xs: "1 / -1", sm: "span 1", md: "span 3" } }}>
                    <KpiCard
                        title={isArabic ? "المستخدمون" : "Users"}
                        value={stats.users.value}
                        change={stats.users.change}
                        icon={<GroupIcon />}
                        to="/dashboard/user-management"
                    />
                </Box>
                <Box sx={{ gridColumn: { xs: "1 / -1", sm: "span 1", md: "span 3" } }}>
                    <KpiCard
                        title={isArabic ? "مراجعات معلّقة" : "Pending Reviews"}
                        value={stats.pendingReviews.value}
                        change={stats.pendingReviews.change}
                        icon={<QueryStatsIcon />}
                        to="/dashboard"
                    />
                </Box>

                {/* System Health and Engagement */}
                <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 4" } }}>
                    <Card>
                        <CardContent>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                                <Typography variant="h6" sx={{ textAlign: align }}>
                                    {isArabic ? "صحة النظام" : "System Health"}
                                </Typography>
                                <Tooltip title={isArabic ? "عرض التفاصيل" : "View details"}>
                                    <IconButton size="small">
                                        <MoreVertIcon />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                            <Typography variant="body2" color="text.secondary" sx={{ textAlign: align, mb: 1 }}>
                                {isArabic ? "الحالة العامة للخدمات" : "Overall services status"}
                            </Typography>
                            <LinearProgress variant="determinate" value={stats.systemHealth} sx={{ height: 10, borderRadius: 5, mb: 1 }} />
                            <Typography variant="caption" color="text.secondary" sx={{ textAlign: align, display: "block" }}>
                                {isArabic ? "مستقر" : "Stable"} • {stats.systemHealth}%
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 8" } }}>
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
                                <Chip label={(isArabic ? "نشط: " : "Active: ") + stats.activeMangasPercent + "%"} color="success" size="small" />
                                <Chip label={(isArabic ? "خامل: " : "Inactive: ") + (100 - stats.activeMangasPercent) + "%"} size="small" />
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>

                {/* Recently Added Mangas */}
                <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 6" } }}>
                    <Paper>
                        <Box p={2}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" gutterBottom sx={{ textAlign: align }}>
                                    {isArabic ? "المانغا المضافة حديثًا" : "Recently Added Mangas"}
                                </Typography>
                                <Button
                                    size="small"
                                    component={RouterLink}
                                    to="/dashboard/manga-management"
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{ direction: "ltr" }}
                                >
                                    {isArabic ? "الانتقال" : "Go to list"}
                                </Button>
                            </Stack>
                            <List>
                                {recentMangas.map((manga) => (
                                    <React.Fragment key={manga.id}>
                                        <ListItem
                                            secondaryAction={
                                                <Button component={RouterLink} to={`/dashboard/manga-management`} size="small">
                                                    {isArabic ? "عرض" : "View"}
                                                </Button>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Avatar>{manga.title_en.charAt(0)}</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={manga.title_en}
                                                secondary={
                                                    isArabic
                                                        ? `تمت الإضافة في ${manga.added} - ${manga.chapters} فصول`
                                                        : `Added on ${manga.added} - ${manga.chapters} chapters`
                                                }
                                                sx={{ textAlign: align }}
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </React.Fragment>
                                ))}
                            </List>
                        </Box>
                    </Paper>
                </Box>

                {/* Recent Activity */}
                <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 6" } }}>
                    <Paper>
                        <Box p={2}>
                            <Typography variant="h6" gutterBottom sx={{ textAlign: align }}>
                                {isArabic ? "النشاط الأخير" : "Recent Activity"}
                            </Typography>
                            <List>
                                {recentActivity.map((item) => (
                                    <React.Fragment key={item.id}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>{item.who.charAt(0)}</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={`${item.who} • ${item.what}`}
                                                secondary={isArabic ? `${item.when} منذ` : `${item.when} ago`}
                                                sx={{ textAlign: align }}
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </React.Fragment>
                                ))}
                            </List>
                        </Box>
                    </Paper>
                </Box>

                {/* Top Categories */}
                <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 6" } }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ textAlign: align }}>
                                {isArabic ? "أفضل التصنيفات" : "Top Categories"}
                            </Typography>
                            <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1}>
                                {topCategories.map((cat) => (
                                    <Chip key={cat.id} label={`${cat.name} • ${fmt(cat.count)}`} />
                                ))}
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
                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<CategoryIcon />}
                                    component={RouterLink}
                                    to="/dashboard/category-management"
                                    sx={{ direction: "ltr" }}
                                >
                                    {isArabic ? "إدارة التصنيفات" : "Manage Categories"}
                                </Button>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<MenuBookIcon />}
                                    component={RouterLink}
                                    to="/dashboard/manga-management"
                                    sx={{ direction: "ltr" }}
                                >
                                    {isArabic ? "إدارة المانغا" : "Manage Mangas"}
                                </Button>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<GroupIcon />}
                                    component={RouterLink}
                                    to="/dashboard/user-management"
                                    sx={{ direction: "ltr" }}
                                >
                                    {isArabic ? "إدارة المستخدمين" : "Manage Users"}
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
}
