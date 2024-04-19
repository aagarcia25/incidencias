import { USUARIORESPONSE, User } from "../interfaces/UserInfo";
import { post, postDoc, postEasy } from "./apiService";
import { getToken, getUser } from "./localStorage";

export class AuthService {
  public static async login(obj: User) {
    return await postEasy("login", obj);
  }
}
