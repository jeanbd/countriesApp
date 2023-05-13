import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {

  public countries:Country[] =[];
  public isloading: boolean = false;
  public initialCapitalValue:string='';
  constructor (
    private countryService:CountriesService
  ){}

  ngOnInit(): void {
    this.countries=this.countryService.cacheStore.capital.countries;
    this.initialCapitalValue = this.countryService.cacheStore.capital.words
  }
  searchByCapital(words:string){
    // console.log('Palabra a buscar desde byCapital',words);
    this.isloading=true;

    this.countryService.searchCapital(words).subscribe(
      (res)=>{
        this.countries=res;
        this.isloading=false;
        console.log('response:',this.countries)
      }
    )
  }
}
