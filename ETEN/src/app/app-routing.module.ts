import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './views/about-us/about-us.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { BuscarCategoriaComponent } from './views/buscar-categoria/buscar-categoria.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'index', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'sign-up', component:SignUpComponent},
  {path: 'about-us', component:AboutUsComponent},
  {path: 'buscar-categoria', component:BuscarCategoriaComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
