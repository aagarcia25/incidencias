import DownloadingIcon from "@mui/icons-material/Downloading";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Grid, IconButton, ToggleButton, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getToken } from "../services/localStorage";
import ButtonsDeleted from "./ButtonsDeleted";
import { ButtonsDetail } from "./ButtonsDetail";
import { TooltipPersonalizado } from "./CustomizedTooltips";
import MUIXDataGrid from "./MUIXDataGrid";
import Progress from "./Progress";
import { base64ToArrayBuffer } from "../helpers/Files";

const VisorDocumentosOficios = ({ obj, Tipe }: { obj: any; Tipe: Number }) => {
  const [openSlider, setOpenSlider] = useState(false);
  const [data, setData] = useState([]);

  const consulta = () => {
    if (obj !== "") {
      setOpenSlider(true);
      const token = JSON.parse(String(getToken()));
      const formData = new FormData();
      formData.append(
        "ROUTE",
        process.env.REACT_APP_APPLICATION_DOC_ROUTE + obj
      );
      formData.append("TOKEN", token);
      formData.append("ADDROUTE", "TRUE");

      // Enviar la petición POST con todos los archivos
      axios
        .post(
          process.env.REACT_APP_APPLICATION_DOCUMENTACION +
            "/api/ApiDoc/ListFileSimple",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
              "X-Requested-With": "XMLHttpRequest",
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((response) => {
          if (response.data.SUCCESS) {
            setData(response.data.RESPONSE);
          } else {
            Swal.fire("¡Error!", "No se pudo completar la carga", "error");
          }
        })
        .catch((error) => {
          Swal.fire(
            "¡Error!",
            `Error durante la carga: ${error.message}`,
            "error"
          );
        })
        .finally(() => {
          setOpenSlider(false);
        });
    }
  };

  const ProcesaSPeis = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenSlider(true);
    const token = JSON.parse(String(getToken()));

    let count = 0;
    let encontrados: any[] = [];
    let counfiles = event?.target?.files?.length;
    let peticiones: any[] = [];

    //Recorremos los registros de la busqueda
    for (let i = 0; i < Number(counfiles); i++) {
      let file = event?.target?.files?.[i] || "";
      let namefile = event?.target?.files?.[i].name || "";
      encontrados.push({ Archivo: file, NOMBRE: namefile });
    }

    encontrados.map((item: any) => {
      const formData = new FormData();

      formData.append(
        "ROUTE",
        process.env.REACT_APP_APPLICATION_DOC_ROUTE + obj
      );
      formData.append("TOKEN", JSON.parse(String(getToken())));
      formData.append("FILE", item.Archivo, item.NOMBRE);
      formData.append("ADDROUTE", "TRUE");
      let p = axios.post(
        process.env.REACT_APP_APPLICATION_DOCUMENTACION +
          "/api/ApiDoc/SaveFile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            "X-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      peticiones.push(p);
    });

    axios.all(peticiones).then((resposeArr) => {
      resposeArr.map((item) => {
        if (item.data.SUCCESS) {
          count++;
        } else {
          count--;
        }
      });

      if (count === 0 || count === -1) {
        Swal.fire("¡Error!", "No se Realizo la Operación", "error");
        setOpenSlider(false);
      } else {
        Swal.fire({
          icon: "success",
          title: "Información",
          text: "Archivos Subidos " + count,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            setOpenSlider(false);
            consulta();
          }
        });
      }
    });
  };

  const handleDescargarFile = (v: any) => {
    setOpenSlider(true);
    const token = JSON.parse(String(getToken()));
    const formData = new FormData();
    formData.append(
      "ROUTE",
      process.env.REACT_APP_APPLICATION_DOC_ROUTE + obj + "/"
    );
    formData.append("TOKEN", token);
    formData.append("NOMBRE", v.row.NOMBRE);

    // Enviar la petición POST con todos los archivos
    axios
      .post(
        process.env.REACT_APP_APPLICATION_DOCUMENTACION +
          "/api/ApiDoc/GetByName",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            "X-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        if (response.data.SUCCESS) {
          var bufferArray = base64ToArrayBuffer(
            String(response.data.RESPONSE.FILE)
          );
          var blobStore = new Blob([bufferArray], {
            type: response.data.RESPONSE.TIPO,
          });
          var data = window.URL.createObjectURL(blobStore);
          var link = document.createElement("a");
          document.body.appendChild(link);
          link.href = data;
          link.download = v.row.NOMBRE;
          link.click();
          window.URL.revokeObjectURL(data);
          link.remove();
          setOpenSlider(false);
        } else {
          Swal.fire("¡Error!", "No se pudo completar la carga", "error");
        }
      })
      .catch((error) => {
        Swal.fire(
          "¡Error!",
          `Error durante la carga: ${error.message}`,
          "error"
        );
      })
      .finally(() => {
        setOpenSlider(false);
      });
  };

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
        const token = JSON.parse(String(getToken()));
        const formData = new FormData();
        formData.append("TOKEN", token);

        formData.append(
          "ROUTE",
          process.env.REACT_APP_APPLICATION_DOC_ROUTE +
            obj +
            "/" +
            v.data.row.NOMBRE
        );

        axios
          .post(
            process.env.REACT_APP_APPLICATION_DOCUMENTACION +
              "/api/ApiDoc/DeleteFileByRoute",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
                "X-Requested-With": "XMLHttpRequest",
                "Access-Control-Allow-Origin": "*",
              },
            }
          )
          .then((response) => {
            if (response.data.SUCCESS) {
              Swal.fire("¡Información!", "El Documento se Elimino", "success");
              consulta();
              setOpenSlider(false);
            } else {
              Swal.fire("¡Error!", "No se pudo completar la carga", "error");
            }
          })
          .catch((error) => {
            Swal.fire(
              "¡Error!",
              `Error durante la carga: ${error.message}`,
              "error"
            );
          })
          .finally(() => {
            setOpenSlider(false);
          });
      } else if (result.isDenied) {
        Swal.fire("No se realizaron cambios", "", "info");
      }
    });
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      width: 150,
    },

    {
      field: "NOMBRE",
      description: "NOMBRE",
      headerName: "Nombre",
      width: 350,
    },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 150,
      renderCell: (v) => {
        return (
          <>
            <ButtonsDetail
              title={"Descargar"}
              handleFunction={handleDescargarFile}
              show={true}
              icon={<DownloadingIcon />}
              row={v}
            ></ButtonsDetail>
            {Tipe === 1 ? (
              ""
            ) : (
              <ButtonsDeleted
                handleAccion={handleAccion}
                row={v}
                show={true}
              ></ButtonsDeleted>
            )}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    console.log(obj);
    consulta();
  }, [obj]);

  return (
    <>
      <Progress open={openSlider}></Progress>

      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {true ? (
            <>
              <TooltipPersonalizado
                title={
                  <React.Fragment>
                    <Typography color="inherit">Cargar Documentos</Typography>
                    {"Permite la carga de Documentos de Forma Masiva "}
                  </React.Fragment>
                }
              >
                <ToggleButton value="check">
                  <IconButton
                    color="primary"
                    aria-label="upload documento"
                    component="label"
                    size="small"
                  >
                    <input
                      multiple
                      hidden
                      accept=".*"
                      type="file"
                      value=""
                      onChange={(v) => ProcesaSPeis(v)}
                    />
                    <FileUploadIcon />
                  </IconButton>
                </ToggleButton>
              </TooltipPersonalizado>
            </>
          ) : (
            ""
          )}

          <MUIXDataGrid columns={columns} rows={data} />
        </Grid>
      </Grid>
    </>
  );
};

export default VisorDocumentosOficios;
