import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { menus } from "../../interfaces/menu";
import { getMenus, getUser } from "../../services/localStorage";
import TitleComponent from "../../componentes/TitleComponent";

const Estadisticas = () => {
  const [open, setOpen] = useState(false);
  const listMenus: menus[] = JSON.parse(String(getMenus()));
  const navigate = useNavigate();
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

  useEffect(() => {}, []);

  return (
    <>
      <TitleComponent title={"Panel de Adminsitración"} show={open} />
      <Grid
        container
        item
        spacing={1}
        xs={12}
        sm={12}
        md={12}
        lg={12}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        sx={{ padding: "2%" }}
      ></Grid>
    </>
  );
};
export default Estadisticas;
