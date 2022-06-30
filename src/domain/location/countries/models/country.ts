import { CountryCode } from "../countryCode"

export class Country{
    constructor(
        public readonly code: CountryCode,
        public readonly name: string,
        public readonly populationNumber: number,
        public readonly foundationDate: Date
        ){}
}

export function mapToCountry(data: any): Country{
    return new Country(data.code, data.name, data.populationNumber, new Date(data.foundationDate))
}


export function mapToCountries(data: any[]): Country[]{
    return data.map(mapToCountry) 
}