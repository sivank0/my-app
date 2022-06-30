import {Component} from "react";
import style from "./customButton.module.css"

interface Props{
    value: string
    onClick: () => void
}

interface State{

}
export class CustomButton extends Component<Props, State>{
    render() {
        return(
            <div className={style.centerAlign}>
                <button className={style.button} onClick={this.props.onClick}>{this.props.value}</button>
            </div>
        )
    }

}