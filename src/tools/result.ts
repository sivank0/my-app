import {Error, mapToErrors} from './error'

export class Result{

    public readonly isSucces = this.errors.length == 0

    constructor(
        public readonly errors: Error[]
    ){}
}


export function mapToResult(data: any): Result{
    return new Result(mapToErrors(data.errors))
}