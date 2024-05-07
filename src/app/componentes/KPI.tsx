import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

// Definir una interfaz para las propiedades del componente
interface KPIProps {
  label: string; // El nombre del KPI
  value: string; // El valor actual del KPI
}

const KPI: React.FC<KPIProps> = ({ label, value }) => {
  const theme = useTheme(); // Usar el tema para estilos y colores

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
        <AccessTimeIcon />
      </Box>
    </Box>
  );
};

export default KPI;
