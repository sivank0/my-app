export class Error{
    constructor(
        public key: string | null,
        public value: string | null
    ){}
}

export function mapToError(data: any){
    return new Error(data.key, data.value)
}
export function mapToErrors(data: any[]){
    return data.map(mapToError)
}