import React, { useEffect, useState } from "react";
import TitleComponent from "../../componentes/TitleComponent";
import { Grid } from "@mui/material";
import ButtonsAdd from "../../componentes/ButtonsAdd";
import MUIXDataGrid from "../../componentes/MUIXDataGrid";
import { ButtonsDetail } from "../../componentes/ButtonsDetail";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import ButtonsEdit from "../../componentes/ButtonsEdit";
import { ConfigModal } from "./ConfigModal";
import { ConfiguracionesServices } from "../../services/ConfiguracionesServices";
import Swal from "sweetalert2";
import { Toast } from "../../helpers/Toast";
import ButtonsDeleted from "../../componentes/ButtonsDeleted";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { getUser } from "../../services/localStorage";

const Config = () => {
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [openModal, setopenModal] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});


  const consulta = () => {
    setOpen(true);
    ConfiguracionesServices.Configuracion({}, 3).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        // console.log(res.RESPONSE);
        setData(res.RESPONSE);
        setOpen(false);
      } else {
        setOpen(false);
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };
const handleClose = () => {
    setopenModal(false);
    consulta();
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
    { field: "Nombre", headerName: "Nombre", width: 200 },
    { field: "Valor", headerName: "Valor", width: 200 },
    { field: "slug", headerName: "Slug", width: 200 },
    { field: "Descripcion", headerName: "Descripcion", width: 200 },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "",
      sortable: false,
      width: 200,

      renderCell: (v) => {
        console.log("v antesd return",v.row);
        

        return (

          <>
            
             <ButtonsEdit
             handleAccion={handleEdit}
             row={v}
             show={true}
           ></ButtonsEdit>
            <ButtonsDeleted
                handleAccion={handleAccion}
                row={v}
                show={true}
              ></ButtonsDeleted>
          </>
        );
      },
    },
  ];
  const handleAccion = (v: any) => {
    
    Swal.fire({
      icon: "info",
      title: "¿Estás seguro de eliminar este registro?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          IdParametro: v.data.row.Id,
          IdUsuario: user.Id,
        };
        

        ConfiguracionesServices.Configuracion({data},2).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "¡Registro Eliminado!",
            });
            consulta();
          } else {
            Swal.fire("¡Error!", res.STRMESSAGE, "error");
          }
        });
      } else if (result.isDenied) {
        Swal.fire("No se realizaron cambios", "", "info");
      }
    });
  };

  const handleOpen = () => {
    setTipoOperacion(1);
    setopenModal(true);
    setVrows("")
  };
  const handleEdit = (data: any) => {
    setTipoOperacion(2);
    setopenModal(true);
    setVrows(data.data);
    console.log("vdata",data.data);

  };

  useEffect(() => {
    consulta();
  }, []);

  return (<div>
    <TitleComponent title={"Configuración"} show={open} />
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
            <ButtonsAdd handleOpen={handleOpen} agregar={true} />
            <MUIXDataGrid columns={columnsRel} rows={data} />
          </div>
        </Grid>
      </Grid>
      {openModal ? (
        <ConfigModal
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
        />
      ) : (
        ""
      )}
  </div>);
};

export default Config;
