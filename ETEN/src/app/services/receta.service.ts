import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Receta } from '../models/receta';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  constructor(private httpClient: HttpClient) { }

  public ObtenerTodasRecetas() {
    return this.httpClient.post<Receta[]>("http://localhost:8000/api/recetas/ObtenerRecetas", null);
  }

  public ObtenerRecetasPorTitulo(titulo: string) {
    return this.httpClient.get<Receta[]>("http://localhost:8000/api/recetas/BuscarReceta/" + titulo);
	
  }
}
