import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SyncIcon from "@mui/icons-material/Sync";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import MUIXDataGrid from "../../componentes/MUIXDataGrid";
import ModalForm from "../../componentes/ModalForm";
import SelectFrag from "../../componentes/SelectFrag";
import { Toast } from "../../helpers/Toast";
import SelectValues from "../../interfaces/Share";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { IncidenciasServices } from "../../services/IncidenciasServices";
import {
  getEstadoNext,
  getPrioridad,
  getSLA,
  getUsuarioInci,
  sendMail,
} from "../../services/SelectServices";
import { getUser } from "../../services/localStorage";
import KPI from "../../componentes/KPI";
import VisorDocumentosOficios from "../../componentes/VisorDocumentosOficios";

const RegistroIncidencia = ({
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
  const [content, setContent] = useState("");
  const [NombreRegistra, setNombreRegistra] = useState("");
  const [EmailRegistra, setEmailRegistra] = useState("");
  const [fechaRegistro, setfechaRegistro] = useState("");
  const [ListEstado, setListEstado] = useState<SelectValues[]>([]);
  const [estado, setEstado] = useState("");
  const [ListUsuarioInci, setListUsuarioInci] = useState<SelectValues[]>([]);
  const [usuarioInci, setUsuarioInci] = useState("");
  const [ListPrioridad, setListPrioridad] = useState<SelectValues[]>([]);
  const [prioridad, setPrioridad] = useState("");
  const [nota, setNota] = useState("");
  const [sla, setsla] = useState("");
  const [data, setData] = useState([]);

  const consulta = () => {
    let data = { IdIncidencia: dt.Id };
    IncidenciasServices.Incidencias(data, 5).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        setData(res.RESPONSE);
      } else {
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

  const columnsRel: GridColDef[] = [
    {
      field: "id",
    },
    {
      field: "FechaCreacion",
      headerName: "Fecha de Creación",
      description: "Fecha de Creación",
      width: 200,
    },
    {
      field: "ceDescripcion",
      headerName: "Estado",
      width: 150,
      cellClassName: (params: GridCellParams) => {
        // Asigna clase CSS dependiendo del valor del campo
        return `super-app ${params.value}`;
      },
    },
    { field: "Observaciones", headerName: "Observaciones", width: 150 },
    { field: "modificadopor", headerName: "Actualizado por", width: 150 },
  ];

  const handleChange = (value: any) => {
    setContent(value);
  };

  const sendIncidence = () => {
    let validacion = true;

    if (estado == "") {
      validacion = false;
      Swal.fire("¡Error!", "Favor de Seleccionar el siguiente Estado", "error");
    }

    if (!usuarioInci || usuarioInci.trim() == "") {
      validacion = false;
      Swal.fire("¡Error!", "Por favor, seleccione a quién se asigna", "error");
    }

    if (!prioridad || prioridad.trim() == "") {
      validacion = false;
      Swal.fire("¡Error!", "Favor de Seleccionar la Prioridad", "error");
    }

    if (validacion) {
      let data = {
        CHID: id,
        Estatus: estado,
        TextoInc: content,
        NombreRegistra: NombreRegistra,
        EmailRegistra: EmailRegistra,
        CHUSER: user.Id,
        AsignadoA: usuarioInci,
        Prioridades: prioridad,
      };

      IncidenciasServices.Incidencias(data, 4).then((res) => {
        if (res.SUCCESS) {
          if (
            estado == "f84eaf47-0677-11ef-b2e9-c4346b72f0ba" &&
            res.RESPONSE[0].ceDescripcion == "ASIGNADA" &&
            nota == ""
          ) {
            sendMail("002", res.RESPONSE[0].Id, res.RESPONSE[0].Emailasignadoa);
          }

          Toast.fire({
            icon: "success",
            title: "¡Incidencia Actualizada!",
          });
          consulta();
        } else {
          Swal.fire("¡Error!", res.STRMESSAGE, "error");
        }
      });
      consulta();
    }
  };

  const sendNota = () => {
    if (nota !== "") {
      let data = {
        CHID: id,
        Observaciones: nota,
        CHUSER: user.Id,
        Estatus: dt.ceId,
        EmailRegistra: dt.EmailRegistra,
        NombreRegistra: dt.NombreRegistra,
        TextoInc: dt.TextoInc,
        AsignadoA: dt.idAsignadoa,
        Prioridades: dt.prId,
      };

      IncidenciasServices.Incidencias(data, 4).then((res) => {
        if (res.SUCCESS) {
          sendMail("003", res.RESPONSE[0].Id, res.RESPONSE[0].Emailasignadoa);

          Toast.fire({
            icon: "success",
            title: "Nota Agregada!",
          });

          setNota("");
          consulta();
        } else {
          Swal.fire(res.STRMESSAGE, "¡Error!", "info");
        }
      });
    }
  };

  const handleFilterEstado = (v: any) => {
    setEstado(v);
  };
  const handleFilterUsuarioInci = (v: any) => {
    setUsuarioInci(v);
  };
  const handleFilterPrioridad = (v: any) => {
    setPrioridad(v);
  };

  useEffect(() => {
    getEstadoNext(setListEstado, dt.ceDescripcion);
    getUsuarioInci(setListUsuarioInci);
    getPrioridad(setListPrioridad);
    consulta();

    if (dt == "") {
    } else {
      setId(dt?.Id);
      setContent(dt?.TextoInc);
      setNombreRegistra(dt?.NombreRegistra);
      setEmailRegistra(dt?.EmailRegistra);
      setfechaRegistro(dt?.FechaCreacion);
      setUsuarioInci(dt.idAsignadoa);
      setPrioridad(dt.prId);
      setEstado(dt.ceId);
      if (
        dt.ceDescripcion != "RESUELTA" &&
        dt.ceDescripcion != "NUEVA" &&
        dt.ceDescripcion != "CANCELADA" &&
        dt.ceDescripcion != ""
      ) {
        const intervalId = setInterval(() => {
          getSLA(setsla, dt?.Id); // Ejecuta la función cada 2 segundos
        }, 2000); // Intervalo de 2 segundos (2000 milisegundos)
        return () => clearInterval(intervalId);
      }
    }
  }, [dt]);

  return (
    <div>
      <ModalForm
        title={tipo == 1 ? "Agregar Registro" : "Editar Registro"}
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
            {dt.ceDescripcion == "RESUELTA" ||
            dt.ceDescripcion == "CANCELADA" ? (
              ""
            ) : (
              <>
                <Button
                  onClick={sendIncidence}
                  variant="contained"
                  endIcon={<SyncIcon />}
                >
                  Actualizar Incidencia
                </Button>
              </>
            )}
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={2}>
            <Typography>Asignado a :</Typography>
            <SelectFrag
              value={usuarioInci}
              options={ListUsuarioInci}
              onInputChange={handleFilterUsuarioInci}
              placeholder={"Seleccione.."}
              disabled={dt.ceDescripcion == "NUEVA" ? false : true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography>Prioridad:</Typography>
            <SelectFrag
              value={prioridad}
              options={ListPrioridad}
              onInputChange={handleFilterPrioridad}
              placeholder={"Seleccione.."}
              disabled={dt.ceDescripcion == "NUEVA" ? false : true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography>Estado Actual:</Typography>
            {dt.ceDescripcion}
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            {dt.ceDescripcion == "RESUELTA" ||
            dt.ceDescripcion == "CANCELADA" ? (
              ""
            ) : (
              <>
                {dt.idAsignadoa == user.Id ||
                dt.ceDescripcion == "NUEVA" ||
                dt.ceDescripcion == "EN VALIDACIÓN" ? (
                  <>
                    <Typography>Siguiente Estado:</Typography>
                    <SelectFrag
                      value={estado}
                      options={ListEstado}
                      onInputChange={handleFilterEstado}
                      placeholder={"Seleccione.."}
                      disabled={false}
                    />
                  </>
                ) : (
                  ""
                )}
              </>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            {sla != "" ? <KPI label="Tiempo de Atención" value={sla} /> : ""}
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ padding: "2%" }}>
          <Grid item xs={6}>
            <ReactQuill
              readOnly={true}
              value={content}
              onChange={handleChange}
              style={{ height: "300px" }}
            />
          </Grid>

          <Grid item xs={6}>
            <VisorDocumentosOficios obj={id} Tipe={1}></VisorDocumentosOficios>
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
                <TextField
                  id="outlined-multiline-static"
                  label="Escribe una nota"
                  multiline
                  fullWidth
                  variant="standard"
                  rows={5}
                  value={nota}
                  onChange={(v) => setNota(v.target.value)}
                  disabled={dt.ceDescripcion == "RESUELTA" ? true : false}
                />
                <Grid
                  item
                  alignItems="center"
                  justifyContent="center"
                  xs={12}
                  paddingTop={2}
                  sx={{ display: "flex" }}
                >
                  <Button
                    disabled={
                      dt.ceDescripcion == "RESUELTA" ||
                      dt.ceDescripcion == "CANCELADA"
                        ? true
                        : false
                    }
                    className={"actualizar"}
                    onClick={() => sendNota()}
                  >
                    {"Agregar Nota"}
                  </Button>
                </Grid>
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
                <MUIXDataGrid columns={columnsRel} rows={data} />
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </ModalForm>
    </div>
  );
};

export default RegistroIncidencia;
