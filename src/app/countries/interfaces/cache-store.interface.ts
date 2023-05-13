import { Country } from "./country.interface"

export interface CacheStore {
  capital: WordCountries,
  region: WordCountries,
  country: WordCountries
}

export interface WordCountries {

  words: string,
  countries: Country[]

}
