import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

// Definir una interfaz para las propiedades del componente
interface KPIProps {
  label: string; // El nombre del KPI
  value: number; // El valor actual del KPI
  change: number; // El cambio respecto al periodo anterior
  changeLabel: string; // Texto que describe el cambio
}

const KPIR: React.FC<KPIProps> = ({ label, value, change, changeLabel }) => {
  const theme = useTheme(); // Usar el tema para estilos y colores

  // Determinar el ícono y el color según el cambio
  const getChangeIcon = (): JSX.Element => {
    if (change > 0) {
      return <ArrowUpwardIcon color="success" />;
    } else if (change < 0) {
      return <ArrowDownwardIcon color="error" />;
    } else {
      return <TrendingFlatIcon color="disabled" />;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "8px",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
      }}
    >
      <Typography variant="h6">{label}</Typography>
      <Typography variant="h4">{value}</Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {getChangeIcon()}
        <Typography variant="body2" sx={{ marginLeft: "0.5rem" }}>
          {changeLabel}
        </Typography>
      </Box>
    </Box>
  );
};

export default KPIR;
