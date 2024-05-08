import { deleted, get, post, put } from "./apiService";

export class ConfiguracionesServices {
  public static async Configuracion(data: any, tipo: number) {
    if (tipo == 1) {
      return await post("Configuracion", data);
    } else if (tipo == 2) {
      return await deleted("Configuracion", data);
    } else if (tipo == 3) {
      return await get("Configuracion", data);
    } else if (tipo == 4) {
      return await put("Configuracion", data);
    } else {
      return {
        RESPONSE: null,
        SUCCESS: false,
        NUMCODE: 0,
        STRMESSAGE: "No response",
      };
    }
  }

  public static async getEstadisticas() {
    return await get("getEstadisticas");
  }
}
