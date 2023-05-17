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

  public eliminarToken() {
    localStorage.removeItem('token');
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  /*
  public verificarToken() {
    return this.httpClient.get<string>("http://localhost:8000/api/usuarios/verificacionToken");
  }
*/

  //quitar
  public obtenerUsuarioDelToken() {

    const token = this.getToken();
    const decodedToken = jwt_decode(token!) as any;
    const usuario = decodedToken.usuario;
    return usuario;
  }
}
