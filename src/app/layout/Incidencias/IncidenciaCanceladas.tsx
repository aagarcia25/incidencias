import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Grid } from "@mui/material";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ButtonsDetail } from "../../componentes/ButtonsDetail";
import MUIXDataGrid from "../../componentes/MUIXDataGrid";
import TitleComponent from "../../componentes/TitleComponent";
import { Toast } from "../../helpers/Toast";
import { IncidenciasServices } from "../../services/IncidenciasServices";
import RegistroIncidencia from "./RegistroIncidencia";
const IncidenciaCanceladas = () => {
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
    IncidenciasServices.Incidencias({}, 7).then((res) => {
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
      <TitleComponent title={"Listado de Incidencias Canceladas"} show={open} />

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

export default IncidenciaCanceladas;
