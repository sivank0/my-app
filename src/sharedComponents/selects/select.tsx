import { ChangeEvent, Component } from "react";

import style from "./select.module.css"

interface Props{
    currentValue: number
    values: number
    label: string
    onChangeCountInPage: (count: number) => void
}
interface State{

}

export class Select extends Component<Props, State>{
    constructor(props:Props){
        super(props)
    }
    onChange = (event: ChangeEvent<HTMLSelectElement>) => {
        this.props.onChangeCountInPage(Number(event.target.value))
    }
    setOptions = () => {
        let countCountries : number[] = []
        for(let i=1; i<=this.props.values; i++){
            countCountries.push(i)
        }
        return(
            <select className={style.select} value={this.props.currentValue} onChange={this.onChange}>
                {countCountries.map((index) => (
                    <option  key={index}>
                        {index}
                    </option>)
                )}
            </select>)  
    }
    render(){
        return(
            <div className={style.container}>
                {this.props.label}
                <div >{this.setOptions()}</div>
            </div>
        )
    }
}