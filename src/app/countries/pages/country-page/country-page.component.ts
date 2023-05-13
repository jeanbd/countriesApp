import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit{

  public country?: Country | null;
  constructor(
    private activatedRoute:ActivatedRoute,
    private countryService:CountriesService
  ){}
  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(
    //   (params)=>{

    //     this.countryService.searchCountryByAlpha(params['id']).subscribe(
    //       (res)=>{
    //         console.log('El resultado final es:',res)
    //       }
    //     )
    //   }
    // )

    this.activatedRoute.params
    .pipe(
      switchMap(params => this.countryService.searchCountryByAlpha(params['id']))
    )
    .subscribe(
      (res)=>{
        console.log('esto es el res final',res)
        this.country=res;
      }
    )
  }
}
