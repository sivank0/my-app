export class Page<TValue>{
    constructor(
        public readonly values:TValue[],
        public readonly totalRows: number,
    ){}
    public static fromData<TValue>(data: any, converter: (data: any) => TValue): Page<TValue>{
        return new Page(data.values.map((element: any) => converter(element)), data.totalRows)
    }
}