import { ChangeEvent, Component } from "react";

import style from "./select.module.css"

interface Props{
    currentValue: number
    label: string
    onChangeCountInPage: (count: number) => void
}
interface State{

}

export class Select extends Component<Props, State>{
    onChange = (event: ChangeEvent<HTMLSelectElement>) => {
        this.props.onChangeCountInPage(Number(event.target.value))
    }
    render(){
        return(
            <div className={style.container}>
                {this.props.label}
                <select className={style.select} value={this.props.currentValue} onChange={this.onChange}>
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                </select>
            </div>
        )
    }
}