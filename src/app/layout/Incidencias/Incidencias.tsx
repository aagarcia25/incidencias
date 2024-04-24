import { Grid, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import TitleComponent from "../../componentes/TitleComponent";
import ButtonsAdd from "../../componentes/ButtonsAdd";
import { GridColDef } from "@mui/x-data-grid";
import MUIXDataGrid from "../../componentes/MUIXDataGrid";

const Incidencias = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

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
  ];
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
          style={{ backgroundColor: "goldenrod" }}
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
          style={{ backgroundColor: "yellow" }}
        >
          <Tooltip
            title="Una vez que se ha revisado la incidencia y se ha decidido que es válida, se mueve a este estado. Aceptada significa que el equipo responsable ha reconocido el problema y se compromete a abordarlo. Aquí, se puede asignar una prioridad a la incidencia y planificar las próximas acciones para su resolución."
            placement="top-start"
          >
            <Typography>Aceptada</Typography>
          </Tooltip>
        </Grid>
        <Grid
          item
          xs={2}
          sm={2}
          md={2}
          lg={1}
          style={{ backgroundColor: "cyan" }}
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
            <MUIXDataGrid columns={columnsRel} rows={data} />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Incidencias;
