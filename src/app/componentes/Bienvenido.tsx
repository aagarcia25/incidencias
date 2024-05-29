import { Box } from "@mui/material";
import { FavIconAvisos } from "../avisosPAUA/componentes/FavIconAvisos";

export default function Bienvenido({ user }: { user: any }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider" }}
        display="flex"
        justifyContent="center"
        alignItems={"center"}
      ></Box>
      <FavIconAvisos/>
    </Box>
  );
}
