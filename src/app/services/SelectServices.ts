import axios from "axios";

export const getEstado = (setState: Function) => {
  axios
    .get(process.env.REACT_APP_APPLICATION_BASE_URL + "Select", {
      params: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      setState(r.data.RESPONSE);
    });
};
export const getUsuarioInci = (setState: Function) => {
  axios
    .get(process.env.REACT_APP_APPLICATION_BASE_URL + "SelectUsuarioInci", {
      params: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      setState(r.data.RESPONSE);
    });
};
export const getPrioridad = (setState: Function) => {
  axios
    .get(process.env.REACT_APP_APPLICATION_BASE_URL + "SelectPrioridad", {
      params: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      setState(r.data.RESPONSE);
    });
};

export const getEstadoNext = (setState: Function, TIPO: string) => {
  axios
    .get(process.env.REACT_APP_APPLICATION_BASE_URL + "SelectEstadoNext", {
      params: { TIPO },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      setState(r.data.RESPONSE);
    });
};

export const getSLA = (setState: Function, CHID: string) => {
  axios
    .get(process.env.REACT_APP_APPLICATION_BASE_URL + "getSLA", {
      params: { CHID },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      setState(r.data.RESPONSE[0].tiempo);
    });
};

export const sendMail = (CLAVE: string, ID: string, EMAIL: string) => {
  axios
    .get(process.env.REACT_APP_APPLICATION_BASE_URL + "sendEmail", {
      params: { CLAVE, ID, EMAIL },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      return r.data.RESPONSE;
    });
};
