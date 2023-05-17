import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../services/autenticacion.service';
import { map } from 'rxjs/operators';

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
        this.autenticacionService.eliminarToken();
        this.route.navigate(['/login']);
        return false;
      }
    } else {
      alert("No has iniciado sesion");
      this.route.navigate(['/login']);
      return false;
    }


  }

}
