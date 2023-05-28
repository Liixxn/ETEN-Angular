import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private autenticacionService: AutenticacionService, private route: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.autenticacionService.getToken() != null) {
      if (this.autenticacionService.obtenerUsuarioDelToken().es_administrador == 1) {
        return true;
      } else {
        alert("No tienes permiso para acceder a esta página..");
        //al refrescar el token cuando se actualiza la pagina esto no se puede hacer.
        //this.autenticacionService.eliminarToken();  
        this.route.navigate(['/']);
        return false;
      }
    } else {
      alert("No tienes permiso para acceder a esta página.");
      this.route.navigate(['/login']);
      return false;
    }


  }

}
