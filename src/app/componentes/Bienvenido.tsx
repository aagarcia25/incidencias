import { Box } from "@mui/material";

export default function Bienvenido({ user }: { user: any }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider" }}
        display="flex"
        justifyContent="center"
        alignItems={"center"}
      ></Box>
    </Box>
  );
}
