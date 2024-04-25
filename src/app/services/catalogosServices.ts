import { post } from "./apiService";

export class CatalogosServices {
  public static async SelectIndex(data: any) {
    return await post("SelectIndex", data);
  }
}
