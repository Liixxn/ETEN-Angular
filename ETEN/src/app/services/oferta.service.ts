import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Oferta } from '../models/oferta';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  constructor(private httpClient: HttpClient) { }

  public obtenerOfertasPorCategoria(num_categoria: number, pagina: number) {
    return this.httpClient.get<any[]>("http://localhost:8000/api/ofertas/obtenerOfertasPorCategoria/" + num_categoria + "/" + pagina);
  }

  public obtenerTodasOfertas() {
    return this.httpClient.get<Oferta[]>("http://localhost:8000/api/ofertas/ObtenerTodasOfertas");
  }

  public sumarVisita(id_oferta: number) {
    return this.httpClient.get("http://localhost:8000/api/ofertas/SumarVisitas/" + id_oferta);
  }
}
