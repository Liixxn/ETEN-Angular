import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) { }


  public Registro(usuario: Usuario) {
    return this.httpClient.post<Usuario>(environment.apiUrl + "usuarios/Registro", usuario);
  }

  public login(usuario: Usuario) {
    return this.httpClient.post<any>(environment.apiUrl + "usuarios/login", usuario);
  }

  public refreshToken() {
    return this.httpClient.get<any>(environment.apiUrl +"usuarios/refresh");
  }

  public getUser() {
    return this.httpClient.get<Usuario>(environment.apiUrl +"usuarios/ObtenerUnUsuario");
  }

  public modificarUsuario(usuario: Usuario) {
    return this.httpClient.put<any>(environment.apiUrl +"usuarios/ActualizarDatosUsuario", usuario);
  }

  public comprobarContrasena(password: string) {
    return this.httpClient.post<string>(environment.apiUrl +"usuarios/ComprobarContrasena", {password});
  }

  public getAllUsuarios() {
    return this.httpClient.get<Usuario[]>(environment.apiUrl +"usuarios/obtenerUsuarios");
  }


}
