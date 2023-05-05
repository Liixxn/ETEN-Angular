import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor() { }

  public guardarToken(token: string) {
    localStorage.setItem('token', token)
  }

  public obtenerToken() {

    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token!) as any;
    const usuario = decodedToken.usuario;
    //alert(usuario.nombre);
    return usuario;
  }
}
