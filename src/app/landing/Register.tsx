import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import ReactQuill from "react-quill";
import TitleComponent from "../componentes/TitleComponent";
import "react-quill/dist/quill.snow.css"; // Estilos para el editor de texto
const Register = () => {
  const [content, setContent] = useState("<p></p>");

  const handleChange = (value: any) => {
    setContent(value);
  };

  return (
    <>
      <TitleComponent title={"Registro de Incidencia"} show={false} />
      <Typography>Describe la incidencia, incluyendo imágenes </Typography>
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
      >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ReactQuill value={content} onChange={handleChange} />
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
