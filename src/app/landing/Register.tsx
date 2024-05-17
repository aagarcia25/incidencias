import SendIcon from "@mui/icons-material/Send";
import { Button, Grid, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Estilos para el editor de texto
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import TitleComponent from "../componentes/TitleComponent";
import VisorDocumentosOficios from "../componentes/VisorDocumentosOficios";
import { Toast } from "../helpers/Toast";
import { IncidenciasServices } from "../services/IncidenciasServices";
import { sendMail } from "../services/SelectServices";
import { ConfiguracionesServices } from "../services/ConfiguracionesServices";
const Register = () => {
  const [content, setContent] = useState("");
  const [NombreRegistra, setNombreRegistra] = useState("");
  const [EmailRegistra, setEmailRegistra] = useState("");
  const [uuidid, setuuidid] = useState("");
  const [EmailI, setEmailI] = useState("aagarcia@cecapmex.com");

  const handleChange = (value: any) => {
    setContent(value);
  };

  const getEmail = () => {
    let data = {
      Nombre: "EMAIL_RECIBIDOR",
    };

    ConfiguracionesServices.Configuracion(data, 5).then((res) => {
      if (res.SUCCESS) {
        console.log(res.RESPONSE[0].Valor);
        setEmailI(res.RESPONSE[0].Valor);
      } else {
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

  const sendIncidence = () => {
    if (NombreRegistra !== "" && EmailRegistra !== "" && content !== "") {
      let data = {
        Estatus: "86855e1c-fcd1-11ee-b2e9-c4346b72f0ba",
        TextoInc: content,
        NombreRegistra: NombreRegistra,
        EmailRegistra: EmailRegistra,
        IdUsuario: "30adc962-7109-11ed-a880-040300000000",
        ID: uuidid,
      };

      IncidenciasServices.Incidencias(data, 1).then((res) => {
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "¡Incidencia Enviada!",
          });
          setContent("");
          setNombreRegistra("");
          setEmailRegistra("");
          sendMail("001", res.RESPONSE[0].id, EmailI);
          sendMail("004", res.RESPONSE[0].id, EmailRegistra);

          Swal.fire({
            title: "¡Incidencia Enviada!",
            icon: "success",
            html: "Trataremos de solucionar la incidencia lo más pronto posible",
            width: 600,
            padding: "3em",
            backdrop: `
      rgba(0,0,123,0.4)
      left top
      no-repeat
    `,
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "https://nl.gob.mx/";
            }
          });
        } else {
          Swal.fire("¡Error!", res.STRMESSAGE, "error");
        }
      });
    } else {
      Swal.fire({
        title: "Favor de completar los siguientes campos:",
        html: `
              <ul>
              <li>Nombre</li>
             <li>Correo Electrónico</li>
             <li>Descripción de la Incidencia</li>
              </ul>
            `,
        icon: "warning",
      });
    }
  };

  useEffect(() => {
    getEmail();
    setuuidid(uuidv4());
  }, []);

  return (
    <>
      <TitleComponent title={"Registro de Incidencia"} show={false} />

      <Grid
        sx={{ padding: ".5%" }}
        container
        alignItems="center"
        justifyContent="center"
      >
        <Tooltip title={"Puedes Copiar y Pegar la captura de pantalla"}>
          <Typography>Describe la incidencia, incluyendo imágenes </Typography>
        </Tooltip>
      </Grid>

      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ padding: "1%" }}
      >
        <>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <TextField
              fullWidth
              id="standard-basic"
              label="Nombre"
              variant="outlined"
              value={NombreRegistra}
              required
              autoComplete="off"
              onChange={(v) => setNombreRegistra(v.target.value)}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <TextField
              fullWidth
              id="standard-basic"
              label="Correo Electrónico"
              variant="outlined"
              required
              autoComplete="off"
              value={EmailRegistra}
              onChange={(v) => setEmailRegistra(v.target.value)}
            />
          </Grid>
        </>
      </Grid>

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
        <Grid style={{ height: "400px" }} item xs={12} sm={6} md={6} lg={6}>
          <ReactQuill
            value={content}
            onChange={handleChange}
            style={{ height: "350px" }}
          />
        </Grid>
        <Grid style={{ height: "400px" }} item xs={12} sm={6} md={6} lg={6}>
          <VisorDocumentosOficios
            obj={uuidid}
            Tipe={0}
          ></VisorDocumentosOficios>
        </Grid>
      </Grid>

      <Grid container alignItems="center" justifyContent="center">
        <Button
          onClick={() => sendIncidence()}
          variant="contained"
          endIcon={<SendIcon />}
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "darkgray",
            },
          }}
        >
          Enviar Incidencia
        </Button>
      </Grid>
    </>
  );
};

export default Register;
