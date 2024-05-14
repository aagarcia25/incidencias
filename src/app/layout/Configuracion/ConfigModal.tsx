import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ModalForm from "../../componentes/ModalForm";
import { Toast } from "../../helpers/Toast";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { ConfiguracionesServices } from "../../services/ConfiguracionesServices";
import { getUser } from "../../services/localStorage";

export const ConfigModal = ({
  handleClose,
  tipo,
  dt,
}: {
  tipo: number;
  handleClose: Function;
  dt: any;
}) => {
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [id, setId] = useState("");

  const [nombre, setNombre] = useState("");
  const [valor, setValor] = useState("");
  const [slug, setSlug] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleEdit = () => {
    let data = {
      IdParametro: id,
      Nombre: nombre,
      Valor: valor,
      Slug: slug,
      Descripcion: descripcion,
      CHUSER: user.Id,
    };

    ConfiguracionesServices.Configuracion(data, 4).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Actualizado!",
        });
        handleClose();
      } else {
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

  const handleSend = () => {
    let data = {
      Nombre: nombre,
      Valor: valor,
      Slug: slug,
      Descripcion: descripcion,
      IdUsuario: user.Id,
    };

    ConfiguracionesServices.Configuracion(data, 1).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Agregado!",
        });
        handleClose();
      } else {
        Swal.fire(res.STRMESSAGE, "¡Error!", "info");
      }
    });
  };

  useEffect(() => {
    if (dt === "") {
    } else {
      setId(dt?.row?.Id);
      setNombre(dt?.row?.Nombre);
      setValor(dt?.row?.Valor);
      setSlug(dt?.row?.slug);
      setDescripcion(dt.row?.Descripcion);
    }
  }, [dt]);

  return (
    <ModalForm
      title={tipo === 1 ? "Agregar Registro" : "Editar Registro"}
      handleClose={handleClose}
    >
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
        alignItems="center"
        sx={{ padding: "2%" }}
      >
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            margin="dense"
            id="Nombre"
            label="Nombre"
            type="text"
            fullWidth
            variant="standard"
            value={nombre}
            required
            onChange={(v) => setNombre(v.target.value)}
            disabled={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            margin="dense"
            id="Valor"
            label="Valor"
            type="text"
            fullWidth
            variant="standard"
            value={valor}
            required
            onChange={(v) => setValor(v.target.value)}
            disabled={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            margin="dense"
            id="Slug"
            label="Slug"
            type="text"
            fullWidth
            variant="standard"
            value={slug}
            required
            onChange={(v) => setSlug(v.target.value)}
            disabled={false}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            margin="dense"
            id="Descripcion"
            label="Descripcion"
            type="text"
            fullWidth
            variant="standard"
            value={descripcion}
            onChange={(v) => setDescripcion(v.target.value)}
            disabled={false}
          />
        </Grid>
      </Grid>
      <Grid
        item
        alignItems="center"
        justifyContent="flex-end"
        xs={6}
        paddingRight={1}
        sx={{ display: "flex" }}
      >
        <Button
          // disabled={descripcion === "" || nombre === ""}
          className={tipo === 1 ? "guardar" : "actualizar"}
          onClick={() => {
            tipo === 1 ? handleSend() : handleEdit();
          }}
        >
          {tipo === 1 ? "Agregar" : "Actualizar"}
        </Button>
      </Grid>
    </ModalForm>
  );
};
