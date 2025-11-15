import { Card, Typography, Box, Stack, alpha } from "@mui/material";
import {
  Category,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import React from "react";

 function StatsCards({ stats, resource, Icon = Category }) {
  const { t } = useTranslation();
  const { total = 0, active = 0, inactive = 0 } = stats;
  console.log(stats)
  const cards = [
    {
      label: t(`total_${resource}`),
      value: total,
      color: "#6366f1",
      icon: <Icon sx={{ color: "#6366f1", fontSize: 28 }} />,
    },
    {
      label: t(`active_${resource}`),
      value: active,
      color: "#10b981",
      icon: <ActiveIcon sx={{ color: "#10b981", fontSize: 28 }} />,
    },
    {
      label: t(`inactive_${resource}`),
      value: inactive,
      color: "#ef4444",
      icon: <InactiveIcon sx={{ color: "#ef4444", fontSize: 28 }} />,
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
        gap: 3,
      }}
    >
      {cards.map((card, index) => (
        <Card
          key={index}
          sx={{
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <Box sx={{ p: 3 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={500}
                  gutterBottom
                >
                  {card.label}
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight={700}
                  color={
                    index === 1
                      ? "success.main"
                      : index === 2
                      ? "error.main"
                      : "text.primary"
                  }
                >
                  {card.value}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  bgcolor: alpha(card.color, 0.1),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {card.icon}
              </Box>
            </Stack>
          </Box>
        </Card>
      ))}
    </Box>
  );
}

export default React.memo(StatsCards, (prevProps, nextProps) => {
    return (
        prevProps.stats === nextProps.stats
    );
});