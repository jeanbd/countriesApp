import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {
  public isloading: boolean = false;
  public initialCountryValue:string='';

  constructor(
    private countryService:CountriesService
  ){}

  ngOnInit(): void {
    this.countries=this.countryService.cacheStore.country.countries;
    this.initialCountryValue = this.countryService.cacheStore.country.words
  }

  public countries:Country[] =[];
  searchCountry(words:string){
    this.isloading=true;
    console.log('Palabra a buscar desde byCountry',words);

    this.countryService.searchCountry(words).subscribe(
      (res)=>{
        this.countries=res;
        this.isloading=false;
        console.log('response:',this.countries)
      }
    )
  }
}
