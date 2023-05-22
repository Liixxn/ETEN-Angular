import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) { }


  public Registro(usuario: Usuario) {
    return this.httpClient.post<Usuario>("http://localhost:8000/api/usuarios/Registro", usuario);
  }

  public login(usuario: Usuario) {
    return this.httpClient.post<any>("http://localhost:8000/api/usuarios/login", usuario);
  }

  public refreshToken() {
    return this.httpClient.get<any>("http://localhost:8000/api/usuarios/refresh");
  }

  public getUser() {
    return this.httpClient.get<Usuario>("http://localhost:8000/api/usuarios/ObtenerUnUsuario");
  }

  public modificarUsuario(usuario: Usuario) {
    return this.httpClient.put<any>("http://localhost:8000/api/usuarios/ActualizarDatosUsuario", usuario);
  }

  public comprobarContrasena(password: string) {
    return this.httpClient.post<string>("http://localhost:8000/api/usuarios/ComprobarContrasena", {password});
  }

  public getAllUsuarios() {
    return this.httpClient.get<Usuario[]>("http://localhost:8000/api/usuarios/obtenerUsuarios");
  }
  

}
