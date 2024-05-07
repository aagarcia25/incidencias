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
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import ModalForm from "../../componentes/ModalForm";
import { Toast } from "../../helpers/Toast";
import { IncidenciasServices } from "../../services/IncidenciasServices";
import SelectFrag from "../../componentes/SelectFrag";
import SelectValues from "../../interfaces/Share";
import { getEstado, getPrioridad, getUsuarioInci } from "../../services/SelectServices";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { getUser } from "../../services/localStorage";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import MUIXDataGrid from "../../componentes/MUIXDataGrid";
import { log } from "console";
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

  const [data, setData] = useState([]);

  const consulta = () => {
    console.log("dt.id",dt.Id);
    
    let data = {IdIncidencia: dt.Id}
    // setOpen(true);
    IncidenciasServices.Incidencias(data, 5).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        console.log(res.RESPONSE);
        setData(res.RESPONSE);
        //setOpen(false);
      } else {
        //setOpen(false);
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
    setContent( value);
  };

  const sendIncidence = () => {
    console.log("usuarioInci",usuarioInci);
    
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

      console.log(data);

      IncidenciasServices.Incidencias(data, 4).then((res) => {
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "¡Incidencia Actualizada!",
          });
        } else {
          Swal.fire("¡Error!", res.STRMESSAGE, "error");
        }
      });
   consulta();
  };

const sendNota = () => {
    let data = {
      CHID: id,
      Observaciones: nota,
      CHUSER: user.Id,
      Estatus: dt.ceId,
    };
    console.log("data",data);
    

    IncidenciasServices.Incidencias(data,4).then(
      (res) => {
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "Nota Agregada!",
          });
          setNota("")
          handleClose();
        } else {
          Swal.fire(res.STRMESSAGE, "¡Error!", "info");
        }
      }
    )

    
    
  
  
 }

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
    getEstado(setListEstado)
    getUsuarioInci(setListUsuarioInci)
    getPrioridad(setListPrioridad)
    console.log("dt",dt);
    consulta();

    
    if (dt === "") {
    } else { 
     
      setId(dt?.Id);
      setContent(dt?.TextoInc);
      setNombreRegistra(dt?.NombreRegistra);
      setEmailRegistra(dt?.EmailRegistra);
      setfechaRegistro(dt?.FechaCreacion);
      setUsuarioInci(dt.idAsignadoa);
      setPrioridad(dt.prId);
      setEstado(dt.ceId);
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
            <SelectFrag
                value={usuarioInci}
                options={ListUsuarioInci}
                onInputChange={handleFilterUsuarioInci}
                placeholder={"Seleccione.."}
                disabled={false} 
                />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography>Prioridad:</Typography>
            <SelectFrag
                value={prioridad}
                options={ListPrioridad}
                onInputChange={handleFilterPrioridad}
                placeholder={"Seleccione.."}
                disabled={false} 
                />
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
          <Typography>Estado:</Typography>
          <SelectFrag
                value={estado}
                options={ListEstado}
                onInputChange={handleFilterEstado}
                placeholder={"Seleccione.."}
                disabled={false} 
                />
          </Grid>
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
              <TextField
                id="outlined-multiline-static"
                label="Escribe una nota"
                multiline
                fullWidth
                variant="standard"
                rows={5}
                value={nota}
                onChange={(v) => setNota(v.target.value)}
                disabled={false}

              />
              <Grid item alignItems="center" justifyContent="center" xs={12} paddingTop={2} sx={{ display: "flex" }}>
              <Button
                  // disabled={descripcion === "" || nombre === ""}
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