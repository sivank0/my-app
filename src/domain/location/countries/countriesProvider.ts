import HttpClient from "../../../tools/httpClient";
import { Page } from "../../../tools/page";
import { mapToResult, Result } from "../../../tools/result";
import { CountryCode } from "./countryCode";
import { Country, mapToCountry } from "./models/country"
import { CountryBlank } from "./models/countryBlank";

export class CountriesProvider{
    public static async saveCountry(countryBlank: CountryBlank): Promise<Result>{
        const data = await HttpClient.postJsonAsync("/SaveCountry", countryBlank, undefined, "https://localhost:7001")
        return mapToResult(data)
    }
    public static async removeCountry(code: CountryCode): Promise<Result>{
        const data = await HttpClient.getJsonAsync("/RemoveCountry", {code}, "https://localhost:7001")
        return mapToResult(data)
    }
    public static async getCountry(code: CountryCode): Promise<Country>{
        const data = await HttpClient.getJsonAsync("/GetCountry", {code}, "https://localhost:7001")
        return mapToCountry(data)
    }
    public static async getCountriesPage(page: number, countInPage: number, searchText: string): Promise<Page<Country>>{
        const data = await HttpClient.getJsonAsync("/GetCountriesPage", {page, countInPage, searchText}, "https://localhost:7001")
        return Page.fromData(data, mapToCountry)
    }
}   