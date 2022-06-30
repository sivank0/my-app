import { CountryCode } from "../../countries/countryCode";

export class Region{
    constructor(
        public readonly id: number,
        public readonly  name: string,
        public readonly shortName: string,
        public readonly countryCodes: CountryCode[]    
    ){}
}
export function mapToRegion(data: any): Region{
    return new Region(data.id, data.name, data.shortName, data.countryCodes)
}