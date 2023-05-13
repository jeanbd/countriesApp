import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private baseUrl:string = 'https://restcountries.com/v3.1'

  public cacheStore: CacheStore = {
    capital:{words:'',countries:[]},
    region:{words:'',countries:[]},
    country:{words:'',countries:[]}
  }

  constructor(
    private http:HttpClient
  ) { }

  private getCountriesRequest(url:string):Observable<Country[]>{
    return this.http.get<Country[]>(url)
    .pipe(
      catchError(error => {
        console.log('error en la consulta por capital',error)
        return of ([])
      })
    );
  }

  searchCountryByAlpha(code:string):Observable<Country | null>{
    return this.http.get<Country[]>(`${this.baseUrl}/alpha/${code}`)
    .pipe(
      map(countries => countries.length > 0 ? countries[0]:null),
      catchError(error => {
        console.log('error en la consulta por alpha',error)
        return of (null)
      })
    )
  }

  searchCapital(words:string):Observable<Country[]>{
    const url = `${this.baseUrl}/capital/${words}`
    return this.getCountriesRequest(url).pipe(
      tap(countries =>this.cacheStore.capital={words,countries})
    );
    // return this.http.get<Country[]>(`${this.baseUrl}/capital/${words}`)
    //         .pipe(
    //           catchError(error => {
    //             console.log('error en la consulta por capital',error)
    //             return of ([])
    //           })
    //         )
  };

  searchCountry(words:string):Observable<Country[]>{
    const url = `${this.baseUrl}/name/${words}`;
    return this.getCountriesRequest(url).pipe(
      tap(countries => this.cacheStore.country={words,countries})
    );
    // return this.http.get<Country[]>(`${this.baseUrl}/name/${words}`)
    //         .pipe(
    //           catchError(error => {
    //             console.log('error en la consulta por pais',error)
    //             return of ([])
    //           })
    //         )
  };

  searchRegion(words:string):Observable<Country[]>{
    const url=`${this.baseUrl}/region/${words}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries =>this.cacheStore.region={words,countries})
    );
    // return this.http.get<Country[]>(`${this.baseUrl}/region/${words}`)
    //         .pipe(
    //           catchError(error => {
    //             console.log('error en la consulta por region',error)
    //             return of ([])
    //           })
    //         )
  };

}
