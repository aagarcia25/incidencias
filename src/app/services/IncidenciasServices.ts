import { deleted, get, post, put } from "./apiService";

export class IncidenciasServices {
  public static async Incidencias(data: any, tipo: number) {
    if (tipo == 1) {
      return await post("Incidencias", data);
    } else if (tipo == 2) {
      return await deleted("Incidencias", data);
    } else if (tipo == 3) {
      return await get("Incidencias", data);
    } else if (tipo == 4) {
      return await put("Incidencias", data);
    } else {
      return {
        RESPONSE: null,
        SUCCESS: false,
        NUMCODE: 0,
        STRMESSAGE: "No response",
      };
    }
  }
}
