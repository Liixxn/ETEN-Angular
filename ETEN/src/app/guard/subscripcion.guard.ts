import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class SubscripcionGuard implements CanActivate {

  constructor(private autenticacionService: AutenticacionService, private route: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.autenticacionService.getToken() != null) {
      if ((this.autenticacionService.obtenerUsuarioDelToken().es_administrador == 0 || this.autenticacionService.obtenerUsuarioDelToken().es_administrador == 1) && this.autenticacionService.obtenerUsuarioDelToken().subscripcion == 1) {
        return true;
      } else {
        alert("Subscribete para poder acceder a las Ofertas");
        this.route.navigate(['/']);
        return false;
      }
    } else {
      alert("No has iniciado sesión");
      this.route.navigate(['/login']);
      return false;
    }
  }

}
