import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SyncIcon from "@mui/icons-material/Sync";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import ModalForm from "../../componentes/ModalForm";
import { Toast } from "../../helpers/Toast";
import { IncidenciasServices } from "../../services/IncidenciasServices";
const RegistroIncidencia = ({
  handleClose,
  tipo,
  dt,
}: {
  tipo: number;
  handleClose: Function;
  dt: any;
}) => {
  const [id, setId] = useState("");
  const [content, setContent] = useState("");
  const [NombreRegistra, setNombreRegistra] = useState("");
  const [EmailRegistra, setEmailRegistra] = useState("");
  const [fechaRegistro, setfechaRegistro] = useState("");

  const handleChange = (value: any) => {
    setContent(value);
  };

  const sendIncidence = () => {
    if (NombreRegistra != "" && EmailRegistra != "" && content != "") {
      let data = {
        Estatus: "86855e1c-fcd1-11ee-b2e9-c4346b72f0ba",
        TextoInc: content,
        NombreRegistra: NombreRegistra,
        EmailRegistra: EmailRegistra,
        IdUsuario: "30adc962-7109-11ed-a880-040300000000",
      };

      console.log(data);

      IncidenciasServices.Incidencias(data, 1).then((res) => {
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "¡Incidencia Enviada!",
          });
          setContent("");
          setNombreRegistra("");
          setEmailRegistra("");
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
    if (dt === "") {
    } else {
      setId(dt?.Id);
      setContent(dt?.TextoInc);
      setNombreRegistra(dt?.NombreRegistra);
      setEmailRegistra(dt?.EmailRegistra);
      setfechaRegistro(dt?.FechaCreacion);
    }
  }, [dt]);

  return (
    <div>
      <ModalForm
        title={tipo === 1 ? "Agregar Registro" : "Editar Registro"}
        handleClose={handleClose}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={2}>
            <Typography>Clave:</Typography>
            <Typography>{id}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography>Fecha de Registro:</Typography>
            <Typography>{fechaRegistro}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography>Nombre:</Typography>
            <Typography>{NombreRegistra}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography>Email Registra:</Typography>
            <Typography>{EmailRegistra}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            <Button
              onClick={sendIncidence}
              variant="contained"
              endIcon={<SyncIcon />}
            >
              Actualizar Incidencia
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={2}>
            <Typography>Asignado a :</Typography>
            <Typography>{}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography>Prioridad:</Typography>
            <Typography>{}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography>Nombre:</Typography>
            <Typography>{NombreRegistra}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography>Email Registra:</Typography>
            <Typography>{EmailRegistra}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={2}></Grid>
        </Grid>
        <Grid container spacing={2} sx={{ padding: "2%" }}>
          <Grid item xs={12}>
            <ReactQuill
              readOnly={true}
              value={content}
              onChange={handleChange}
              style={{ height: "300px" }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ padding: "2%" }}>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Notas</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>Historial</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </ModalForm>
    </div>
  );
};

export default RegistroIncidencia;
