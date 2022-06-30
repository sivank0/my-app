import { ChangeEvent, Component } from "react";
import style from "./input.module.css"

interface Props{
    label: string
    value: string | null
    onChange: (value: string) => void
}
interface State{

}

export class InputText extends Component<Props, State>{
    onChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(event.target.value)
    }
    render(){
        return(
            <div className={style.main}>
                <div>{this.props.label}</div>
                <input className={style.input} type="string" value={this.props.value ?? ""} onChange={this.onChange} placeholder='Введите значение'/>
            </div>
        )
    }
}