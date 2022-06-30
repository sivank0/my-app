import { Component } from "react";
import { NavigateFunction } from "react-router-dom";
import { CountriesProvider } from "../../domain/location/countries/countriesProvider";
import { Country } from "../../domain/location/countries/models/country";
import { withRouter } from "../../tools/withRouter";
import { CustomButton } from "../buttons/customButton";
import { Modal } from "../modals/modal";

import style from "./countryCard.module.css"

interface Props{
    navigate?: NavigateFunction
    country: Country 
    reloadPage: () => void
}
interface State{
    modalIsOpen: boolean
}
class CountryCard extends Component<Props,State>{
    constructor(props:Props){
        super(props)
        this.state = {
            modalIsOpen: false
        }
    }
    setModalIsOpen = (isOpen: boolean) =>{
        this.setState({modalIsOpen: isOpen})
    }
    removeCountry = async () =>{
        await CountriesProvider.removeCountry(this.props.country.code)
        this.props.reloadPage()        
        this.setModalIsOpen(false)
    }
    toLocalDate=()=>{
        return<div>Дата основания: {this.props.country.foundationDate.toLocaleDateString()}</div> 
    }
    render() {
        return(
            <div className={style.main}>
                <div className={style.bord}>
                    <div className={style.countryName}>{this.props.country.name}</div>
                    <div>Код страны: {this.props.country.code}</div>
                    <div>Численность населения: {this.props.country.populationNumber}</div>
                    {this.toLocalDate()}
                    <div className={style.buttons}>
                        <CustomButton value={"Изменить"} onClick={() => this.props.navigate!(`/country/edit/${this.props.country.code}`)}/>
                        <CustomButton value={"Удалить"} onClick={()=>this.setModalIsOpen(true)}/>
                    </div>
                </div>
                <Modal isOpen={this.state.modalIsOpen} setIsOpen={this.setModalIsOpen}>
                    Удалить элемент: {this.props.country.name}?
                    <div className={style.buttons}>
                        <CustomButton value={"Да"} onClick={this.removeCountry}/>
                        <CustomButton value={"Нет"} onClick={()=>this.setModalIsOpen(false)}/>
                    </div>
                </Modal>
            </div>
        )
    }
}
export default withRouter<Props>(CountryCard)