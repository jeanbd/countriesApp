import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';

const routes: Routes=[
  {
    path:'by-capital',
    component:ByCapitalPageComponent
  },
  {
    path:'by-region',
    component:ByRegionPageComponent
  },
  {
    path:'by-country',
    component:ByCountryPageComponent
  },
  {
    path:'country/:id',
    component:CountryPageComponent
  },

  //Ruta por defecto
  {
    path:'**',
    redirectTo:'by-capital'
  },
];

@NgModule({
  imports:[
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class CountriesRoutingModule { }
