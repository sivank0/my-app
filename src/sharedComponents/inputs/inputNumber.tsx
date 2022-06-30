import { ChangeEvent, Component} from "react";
import style from "./input.module.css"

interface Props {
    label: string
    value: number | null
    onChange: (value: number) => void
}
interface State {

}
export class InputNumber extends Component<Props, State>{
    constructor(props: Props) {
        super(props)
    }
    onChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(event.target.valueAsNumber)
    }
    render() {
        return (
            <div className={style.main}>
                <div>{this.props.label}</div>
                <input className={style.input} type="number" value={this.props.value ?? ""} onChange={this.onChange} placeholder='Введите значение' />
            </div>
        )
    }
}