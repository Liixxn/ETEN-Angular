import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) { }

  public getAllUsuarios() {
    return this.httpClient.get<Usuario[]>("http://localhost:8000/api/usuarios/obtenerUsuarios");
  }

  public Registro(usuario: Usuario) {
    return this.httpClient.post<Usuario>("http://localhost:8000/api/usuarios/Registro", usuario);
  }


  public login(usuario: Usuario) {
    return this.httpClient.post<Usuario>("http://localhost:8000/api/usuarios/login", usuario);
  }

  public getUser(usuario: Usuario) {
    return this.httpClient.post<Usuario>("http://localhost:8000/api/usuarios/ObtenerUnUsuario", usuario);
  }

  public modificarUsuario(usuario: Usuario) {
    return this.httpClient.put<Usuario>("http://localhost:8000/api/usuarios/ActualizarDatosUsuario", usuario);
  }

  public comprobarContrasena(id: number, password: string) {
    return this.httpClient.post<string>("http://localhost:8000/api/usuarios/ComprobarContrasena", { id, password });
  }

}
