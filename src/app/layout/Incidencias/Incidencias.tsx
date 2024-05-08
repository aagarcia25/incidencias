import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Grid, Tooltip, Typography } from "@mui/material";
import { GridColDef, GridCellParams } from "@mui/x-data-grid";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ButtonsAdd from "../../componentes/ButtonsAdd";
import { ButtonsDetail } from "../../componentes/ButtonsDetail";
import MUIXDataGrid from "../../componentes/MUIXDataGrid";
import TitleComponent from "../../componentes/TitleComponent";
import { Toast } from "../../helpers/Toast";
import { IncidenciasServices } from "../../services/IncidenciasServices";
import RegistroIncidencia from "./RegistroIncidencia";
const Incidencias = () => {
  const [open, setOpen] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [data, setData] = useState([]);
  const [vrows, setVrows] = useState({});
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const handleClose = () => {
    setopenModal(false);
    consulta();
  };

  const consulta = () => {
    setOpen(true);
    IncidenciasServices.Incidencias({}, 3).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        setData(res.RESPONSE);
        setOpen(false);
      } else {
        setOpen(false);
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

  const handleOpen = () => {
    setVrows({});
    setTipoOperacion(1);
    setopenModal(true);
  };
  const handleVer = (data: any) => {
    setVrows(data.row);
    setTipoOperacion(2);
    setopenModal(true);
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
    { field: "NombreRegistra", headerName: "Registrado Por", width: 200 },
    { field: "asignadoa", headerName: "Asignado a", width: 200 },
    { field: "prDescripcion", headerName: "Prioridad", width: 200 },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "",
      sortable: false,
      width: 200,

      renderCell: (v) => {
        return (
          <>
            {true ? (
              <ButtonsDetail
                title={"Ver Incidencia"}
                handleFunction={handleVer}
                show={true}
                icon={<RemoveRedEyeIcon />}
                row={v}
              ></ButtonsDetail>
            ) : (
              ""
            )}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    consulta();
  }, []);

  return (
    <>
      <TitleComponent title={"Listado de Incidencias"} show={open} />
      <Grid
        container
        item
        spacing={1}
        xs={12}
        sm={12}
        md={12}
        lg={12}
        direction="row"
        alignItems="flex-start"
        sx={{ padding: "1%" }}
      >
        <Grid
          item
          xs={2}
          sm={2}
          md={2}
          lg={1}
          style={{
            backgroundColor: "goldenrod",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Tooltip
            title="Una incidencia recién creada, pendiente de revisión. Este estado indica que el problema, error o solicitud ha sido registrado en la plataforma, pero aún no ha sido evaluado por el equipo responsable. Se espera que las incidencias en este estado sean revisadas para asignarlas a la persona o equipo adecuado y para determinar la prioridad."
            placement="top-start"
          >
            <Typography>Nueva</Typography>
          </Tooltip>
        </Grid>
        <Grid
          item
          xs={2}
          sm={2}
          md={2}
          lg={1}
          style={{
            backgroundColor: "yellow",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Tooltip
            title="Una vez que se ha revisado la incidencia y se ha decidido que es válida, se mueve a este estado. En Validación significa que el equipo responsable ha reconocido el problema y se compromete a abordarlo. Aquí, se puede asignar una prioridad a la incidencia y planificar las próximas acciones para su resolución."
            placement="top-start"
          >
            <Typography>En Validación</Typography>
          </Tooltip>
        </Grid>
        <Grid
          item
          xs={2}
          sm={2}
          md={2}
          lg={1}
          style={{
            backgroundColor: "cyan",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Tooltip
            title="En este estado, la incidencia ya ha sido asignada a un miembro específico del equipo o a un grupo para su resolución. Esto significa que hay una persona o equipo responsable de trabajar en la solución del problema. Este estado también puede incluir información adicional sobre el progreso y el tiempo estimado para la resolución."
            placement="top-start"
          >
            <Typography>Asignada</Typography>
          </Tooltip>
        </Grid>
        <Grid
          item
          xs={2}
          sm={2}
          md={2}
          lg={1}
          style={{
            backgroundColor: "greenyellow",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%", // Para asegurar la altura completa del Grid
          }}
        >
          <Tooltip
            title="Cuando la incidencia ha sido solucionada, se mueve a este estado. Resuelta significa que el problema o error ha sido corregido, o que la solicitud ha sido atendida satisfactoriamente. Sin embargo, esto no necesariamente implica que el ciclo de vida de la incidencia haya terminado. Dependiendo del proceso, puede requerir validación o confirmación del usuario para cerrar la incidencia definitivamente."
            placement="top-start"
          >
            <Typography>En Proceso</Typography>
          </Tooltip>
        </Grid>
        <Grid
          item
          xs={2}
          sm={2}
          md={2}
          lg={1}
          style={{
            backgroundColor: "green",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%", // Para asegurar la altura completa del Grid
          }}
        >
          <Tooltip
            title="Cuando la incidencia ha sido solucionada, se mueve a este estado. Resuelta significa que el problema o error ha sido corregido, o que la solicitud ha sido atendida satisfactoriamente. Sin embargo, esto no necesariamente implica que el ciclo de vida de la incidencia haya terminado. Dependiendo del proceso, puede requerir validación o confirmación del usuario para cerrar la incidencia definitivamente."
            placement="top-start"
          >
            <Typography>Resuelta</Typography>
          </Tooltip>
        </Grid>
        <Grid
          item
          xs={2}
          sm={2}
          md={2}
          lg={1}
          style={{
            backgroundColor: "orangered",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%", // Para asegurar la altura completa del Grid
          }}
        >
          <Tooltip
            title="Cuando la incidencia se mueve a este estado, significa que a la Incidencia le hace falta información para que pueda ser asignada al área correspondiente o hace falta algún dato específico para que se pueda atender."
            placement="top-start"
          >
            <Typography>Cancelada</Typography>
          </Tooltip>
        </Grid>
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
        alignItems="flex-start"
        sx={{ padding: "2%" }}
      >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div style={{ height: 400, width: "100%" }}>
            {/* <ButtonsAdd handleOpen={handleOpen} agregar={true} /> */}
            <MUIXDataGrid columns={columnsRel} rows={data} />
          </div>
        </Grid>
      </Grid>

      {openModal ? (
        <RegistroIncidencia
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Incidencias;
