import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import KPIR from "../../componentes/KPIR";
import TitleComponent from "../../componentes/TitleComponent";
import { ConfiguracionesServices } from "../../services/ConfiguracionesServices";

interface Incidencia {
  Descripcion: string; // Descripción del estado
  Incidencias_Actual: number; // Recuento de incidencias actuales
  Incidencias_Anterior: number | null; // Recuento del mes anterior
  Porcentaje_Cambio: number | null; // Cambio porcentual
}

const Estadisticas = () => {
  const [list, setlist] = useState<Incidencia[]>([]);

  const asignada = list.find((item) => item?.Descripcion === "ASIGNADA");
  const cancelada = list.find((item) => item?.Descripcion === "CANCELADA");
  const enProceso = list.find((item) => item?.Descripcion === "EN PROCESO");
  const enValidacion = list.find(
    (item) => item?.Descripcion === "EN VALIDACIÓN"
  );
  const nueva = list.find((item) => item?.Descripcion === "NUEVA");
  const resuelta = list.find((item) => item?.Descripcion === "RESUELTA");

  // Mover `useEffect` fuera de `getEsta`
  useEffect(() => {
    const getEsta = () => {
      ConfiguracionesServices.getEstadisticas().then((res) => {
        if (res?.SUCCESS) {
          setlist(res.RESPONSE);
        }
      });
    };

    getEsta(); // Llamar a la función al montar el componente
  }, []); // Dependencia vacía para que se ejecute solo una vez al montar

  return (
    <div>
      <>
        <TitleComponent title={"Panel de Administración"} show={false} />
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
          <Grid item xs={12} sm={6} md={2}>
            <KPIR
              label="Nuevas"
              value={nueva ? nueva.Incidencias_Actual : 0} // Si no se encuentra, usa 0 como predeterminado
              change={
                nueva && nueva.Porcentaje_Cambio ? nueva.Porcentaje_Cambio : 0
              } // Asegurarse de obtener un número
              changeLabel={
                nueva && nueva.Porcentaje_Cambio
                  ? `${nueva.Porcentaje_Cambio}% respecto al mes pasado`
                  : "Sin datos de cambio"
              } // Mensaje predeterminado si no hay cambio
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <KPIR
              label="Asignadas"
              value={asignada ? asignada.Incidencias_Actual : 0} // Si no se encuentra, usa 0 como predeterminado
              change={
                asignada && asignada.Porcentaje_Cambio
                  ? asignada.Porcentaje_Cambio
                  : 0
              } // Asegurarse de obtener un número
              changeLabel={
                asignada && asignada.Porcentaje_Cambio
                  ? `${asignada.Porcentaje_Cambio}% respecto al mes pasado`
                  : "Sin datos de cambio"
              } // Mensaje predeterminado si no hay cambio
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <KPIR
              label="En Proceso"
              value={enProceso ? enProceso.Incidencias_Actual : 0} // Si no se encuentra, usa 0 como predeterminado
              change={
                enProceso && enProceso.Porcentaje_Cambio
                  ? enProceso.Porcentaje_Cambio
                  : 0
              } // Asegurarse de obtener un número
              changeLabel={
                enProceso && enProceso.Porcentaje_Cambio
                  ? `${enProceso.Porcentaje_Cambio}% respecto al mes pasado`
                  : "Sin datos de cambio"
              } // Mensaje predeterminado si no hay cambio
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <KPIR
              label="En Validación"
              value={enValidacion ? enValidacion.Incidencias_Actual : 0} // Si no se encuentra, usa 0 como predeterminado
              change={
                enValidacion && enValidacion.Porcentaje_Cambio
                  ? enValidacion.Porcentaje_Cambio
                  : 0
              } // Asegurarse de obtener un número
              changeLabel={
                enValidacion && enValidacion.Porcentaje_Cambio
                  ? `${enValidacion.Porcentaje_Cambio}% respecto al mes pasado`
                  : "Sin datos de cambio"
              } // Mensaje predeterminado si no hay cambio
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <KPIR
              label="Resueltas"
              value={resuelta ? resuelta.Incidencias_Actual : 0} // Si no se encuentra, usa 0 como predeterminado
              change={
                resuelta && resuelta.Porcentaje_Cambio
                  ? resuelta.Porcentaje_Cambio
                  : 0
              } // Asegurarse de obtener un número
              changeLabel={
                resuelta && resuelta.Porcentaje_Cambio
                  ? `${resuelta.Porcentaje_Cambio}% respecto al mes pasado`
                  : "Sin datos de cambio"
              } // Mensaje predeterminado si no hay cambio
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <KPIR
              label="Canceladas"
              value={cancelada ? cancelada.Incidencias_Actual : 0} // Si no se encuentra, usa 0 como predeterminado
              change={
                cancelada && cancelada.Porcentaje_Cambio
                  ? cancelada.Porcentaje_Cambio
                  : 0
              } // Asegurarse de obtener un número
              changeLabel={
                cancelada && cancelada.Porcentaje_Cambio
                  ? `${cancelada.Porcentaje_Cambio}% respecto al mes pasado`
                  : "Sin datos de cambio"
              } // Mensaje predeterminado si no hay cambio
            />
          </Grid>
        </Grid>
      </>
    </div>
  );
};

export default Estadisticas;
