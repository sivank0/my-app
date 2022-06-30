import { Country } from "./country"

export interface CountryBlank{
    code: number | null
    name: string | null
    populationNumber: number | null
    foundationDate: Date | null
}
export namespace CountryBlank{
    export function getDefault(): CountryBlank{
        return {code: null, name: null, populationNumber: null, foundationDate: null}
    }
    export function fromCountry(country: Country): CountryBlank{
        return {code: country.code, name: country.name, populationNumber: country.populationNumber, foundationDate: country.foundationDate}
    }
}