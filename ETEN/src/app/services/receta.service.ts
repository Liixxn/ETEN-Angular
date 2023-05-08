import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Receta } from '../models/receta';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  recetaSeleccionada: any;
  constructor(private httpClient: HttpClient) { }

  public BuscarRecetasBuscadorTitulo(pagina: number, titulo: string) {
    return this.httpClient.post<any[]>("http://localhost:8000/api/recetas/BuscarReceta", {"pagina":pagina, "titulo":titulo});
  }

  public ObtenerTodasRecetas() {
    return this.httpClient.post<Receta[]>("http://localhost:8000/api/recetas/ObtenerRecetas", null);
  }

  public ObtenerUnaRecetas(idReceta: number) {
    return this.httpClient.get<Receta>("http://localhost:8000/api/recetas/ObtenerUnaReceta/" + idReceta);
  }

  public ObtenerRecetasPorCategoria(num_categoria: number, pagina: number) {
    return this.httpClient.get<any[]>("http://localhost:8000/api/recetas/ObtenerRecetasPorCategoria/" + num_categoria + "/" + pagina);
  }

  public ObtenerRecetasPorId(listaIdRecetas: number[]) {
    return this.httpClient.post<Receta[]>("http://localhost:8000/api/recetas/ObtenerRecetasPorId", {"ids":listaIdRecetas});
  }
  public ObtenerRecetasPorTitulo(titulo: string) {
    return this.httpClient.post<Receta[]>("http://localhost:8000/api/recetas/BuscarReceta", {"titulo": titulo});

  }
}
