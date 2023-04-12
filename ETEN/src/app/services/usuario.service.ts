import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario} from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) { }

  public getAllUsuarios() {
    return this.httpClient.get<Usuario[]>("http://localhost:8000/api/usuarios/obtenerUsuarios");
  }


}
