import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit{
  public countries:Country[] =[];
  public isloading: boolean = false;

  public initialRegionValue:string='';

  constructor(
    private countryService:CountriesService
  ){}

  ngOnInit(): void {
    this.countries=this.countryService.cacheStore.region.countries;
    this.initialRegionValue = this.countryService.cacheStore.region.words
  }

  searchRegion(words:string){
    this.isloading=true;
    console.log('Palabra a buscar desde byRegion',words);

    this.countryService.searchRegion(words).subscribe(
      (res)=>{
        this.countries=res;
        this.isloading=false;
        console.log('response:',this.countries)
      }
    )
  }

}
