import { Component, ReactNode } from "react";
import style from "./modal.module.css"

interface Props{
    children: ReactNode
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}
interface State{

}

export class Modal extends Component<Props, State>{
    render(){
        return(
            <div className={this.props.isOpen ? style.isOpen : style.modal} onClick={() => this.props.setIsOpen(false)}>
                <div className={this.props.isOpen ? style.componentIsOpen : style.component} onClick={e => e.stopPropagation()}>
                        {this.props.children}
                </div>
            </div>
        )
    }
}