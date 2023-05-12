import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Oferta } from '../models/oferta';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  constructor(private httpClient: HttpClient) { }

  public obtenerOfertasPorCategoria(num_categoria: number) {
    return this.httpClient.get<Oferta[]>("http://localhost:8000/api/recetas/ObtenerOfertasPorCategoria/" + num_categoria);
  }

  public obtenerTodasOfertas() {
    return this.httpClient.post<Oferta[]>("http://localhost:8000/api/recetas/ObtenerTodasOfertas", null);
  }
}
