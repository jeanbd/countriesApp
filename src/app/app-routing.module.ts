import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';

const routes: Routes=[
  {
    path:'',
    component:HomePageComponent
  },
  {
    path:'home',
    component:HomePageComponent
  },
  {
    path:'about',
    component:AboutPageComponent
  },
  {
    path:'contact',
    component:ContactPageComponent
  },
  {
    path:'countries',
    loadChildren:() => import('./countries/countries.module')
    .then(module => module.CountriesModule)
  },
  // {
  //   path:'**',
  //   redirectTo:'countries/by-capital' FUNCIONA ASI O TAMBIEN DE LA SIGUIENTE FORMA
  // },                                  ABAJO!

  {
    path:'**',
    redirectTo:'countries'//Se apunta a countries y dentro del routing de contries
                          // se establece un path con una ruta por defecto
  },
];

@NgModule({
  imports:[
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
