/* eslint-disable jsx-a11y/alt-text */
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SendIcon from "@mui/icons-material/Send";
import { Collapse, Grid, Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/img/logo.svg";
import { menus } from "../interfaces/menu";
import { getMenus } from "../services/localStorage";
export default function Navigator(props: DrawerProps, logoFijo: any) {
  const { ...other } = props;
  const navigate = useNavigate();

  const list: menus[] = JSON.parse(String(getMenus()));
  const [open, setOpen] = useState(-1);
  const handleClick = (x: number) => {
    open === x ? setOpen(-1) : setOpen(x);
  };
  const consulta = (data: string) => {
    navigate(data);
  };

  const onLogOut = () => {
    localStorage.clear();
    var ventana = window.self;
    ventana.location.replace(
      String(process.env.REACT_APP_APPLICATION_BASE_URL_LOGIN)
    );
  };

  return (
    <Drawer variant="permanent" {...other} {...logoFijo}>
      <Grid
        container
        position="sticky"
        alignContent="center"
        sx={{ bgcolor: "rgb(255, 255, 255)", width: "100%" }}
      >
        <Grid item sx={{ width: "auto", higth: "5%" }}>
          <img
            src={Logo}
            style={{ width: "100%" }}
            onClick={() => consulta("/")}
          />
        </Grid>
        <Grid
          item
          sx={{ width: "auto", textAlign: "center", paddingLeft: "3%" }}
        >
          <Typography variant="h6" sx={{ fontWeight: "550" }}>
            PLATAFORMA DE ADMINISTRACIÓN DE INCIDENCIAS
          </Typography>
        </Grid>
      </Grid>

      <Box
        sx={{
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <div>
          <List>
            {list.map((item, indexx) => {
              return item?.item?.length !== 0 ? (
                <div key={indexx}>
                  <ListItemButton
                    sx={{
                      bgcolor:
                        open === indexx
                          ? "rgba(195, 165, 117)"
                          : "rgba(255, 255, 255, 0.291)",
                    }}
                    key={indexx}
                    onClick={() => handleClick(indexx)}
                  >
                    <ListItemText
                      key={indexx}
                      primary={
                        <Tooltip title={item.Descripcion}>
                          <Typography
                            variant="caption"
                            sx={{ fontFamily: "sans-serif", fontWeight: "800" }}
                            gutterBottom
                          >
                            {item.Menu}
                          </Typography>
                        </Tooltip>
                      }
                    />

                    {open === indexx ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>

                  {item?.item?.map((subitem, index) => {
                    return (
                      <Collapse
                        key={index}
                        in={open === indexx}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List
                          sx={{ borderRadius: "1" }}
                          key={index}
                          component="div"
                          disablePadding
                        >
                          <Divider />
                          <ListItemButton
                            className="itemMenu"
                            key={index}
                            onClick={() => consulta(subitem.Path)}
                            sx={{ pl: 4 }}
                          >
                            <ListItemText
                              key={index}
                              primary={
                                <>
                                  <Tooltip title={subitem.Descripcion}>
                                    <Typography
                                      variant="h5"
                                      className="menu-Typography"
                                      gutterBottom
                                    >
                                      {" >  " + subitem.Menu}
                                    </Typography>
                                  </Tooltip>
                                </>
                              }
                            />
                          </ListItemButton>
                          <Divider />
                        </List>
                      </Collapse>
                    );
                  })}
                </div>
              ) : (
                // SOLO IMPRIME EL BOTON CUANDO NO TIENE HIJOS RELACIONADOS
                <div key={Math.random()}>
                  <ListItemButton onClick={() => navigate(item.Path)}>
                    <ListItemIcon>
                      <SendIcon />
                    </ListItemIcon>
                    <ListItemText
                      key={Math.random()}
                      primary={
                        <Tooltip title={item.Descripcion}>
                          <Typography
                            variant="h5"
                            className="menu-Typography"
                            gutterBottom
                          >
                            {item.Menu}
                          </Typography>
                        </Tooltip>
                      }
                    />
                  </ListItemButton>
                  <Divider key={Math.random()} absolute />
                </div>
              );
            })}
          </List>
        </div>
        <ListItemButton onClick={() => onLogOut()}>
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText
            key={Math.random()}
            primary={
              <Tooltip title={"Cerrar Sessión"}>
                <Typography
                  variant="h5"
                  className="menu-Typography"
                  gutterBottom
                >
                  Cerrar Sessión
                </Typography>
              </Tooltip>
            }
          />
        </ListItemButton>
      </Box>
    </Drawer>
  );
}
