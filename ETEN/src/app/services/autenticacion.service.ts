import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private httpClient: HttpClient) { }

  public guardarToken(token: string) {
    localStorage.setItem('token', token)
  }
  public getToken() {
    return localStorage.getItem('token');
  }

  public verificarToken() {
    let token = this.getToken();
    return this.httpClient.post<string>("http://localhost:8000/api/usuarios/verificacionConToken", token);
  }

  //pruebas
  public obtenerToken() {

    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token!) as any;
    const usuario = decodedToken.usuario;
    //alert(usuario.nombre);
    return usuario;
  }
}
