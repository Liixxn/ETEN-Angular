import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './views/about-us/about-us.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';


import { BuscadorCategoriaComponent } from './views/buscador-categoria/buscador-categoria.component';


const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'index', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'sign-up', component:SignUpComponent},
  {path: 'about-us', component:AboutUsComponent},
  {path: 'buscador-categoria', component:BuscadorCategoriaComponent }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
