import { Route, Routes } from "react-router-dom";
import Bienvenido from "../componentes/Bienvenido";
import { Eo404 } from "../componentes/Eo404";
import Inicio from "../componentes/Inicio";
import { USUARIORESPONSE } from "../interfaces/UserInfo";
import Incidencias from "../layout/Incidencias/Incidencias";
import { getUser } from "../services/localStorage";
import { AuthRouter } from "./AuthRouter";
import Estadisticas from "../layout/Panel/Estadisticas";
import Config from "../layout/Configuracion/Config";
import IncidenciasByUser from "../layout/Incidencias/IncidenciasByUser";

export const AppRouter = ({ login }: { login: boolean }) => {
  const log = login;
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

  return (
    <Inicio user={user}>
      <Routes>
        <Route path="/*" element={log ? <Eo404 /> : <AuthRouter />} />
        <Route
          path="/"
          element={log ? <Bienvenido user={user} /> : <AuthRouter />}
        />

        <Route
          path="/pladin/admin"
          element={log ? <Estadisticas /> : <AuthRouter />}
        />
        <Route
          path="/pladin/incidencias"
          element={log ? <Incidencias /> : <AuthRouter />}
        />
        <Route
          path="/pladin/configuraciones"
          element={log ? <Config /> : <AuthRouter />}
        />

        <Route
          path="/pladin/Incidenciasbyuser"
          element={log ? <IncidenciasByUser /> : <AuthRouter />}
        />
      </Routes>
    </Inicio>
  );
};
