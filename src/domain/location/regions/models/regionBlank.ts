import { CountryCode } from "../../countries/countryCode";

export interface RegionBlank{
    id: number | null,
    name: string | null,
    shortName: string | null,
    countryCodes: CountryCode[] | null    
}
