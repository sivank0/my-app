import { Component } from "react";

import { CountriesProvider } from "../domain/location/countries/countriesProvider";
import { CountryBlank } from "../domain/location/countries/models/countryBlank";
import { CustomButton } from "../sharedComponents/buttons/customButton";
import { InputNumber } from "../sharedComponents/inputs/inputNumber";
import { InputText } from "../sharedComponents/inputs/inputText";
import { Error, mapToErrors } from "../tools/error";
import { Modal } from "../sharedComponents/modals/modal";
import { withRouter } from "../tools/withRouter";
import { Params } from "react-router-dom";
import DatePicker from "react-datepicker"

import style from './countryEditor.module.css' 
import "react-datepicker/dist/react-datepicker.css";

interface Props{
    params?: Params
}
interface State{
    modalIsOpen: boolean
    errors: Error[]
    countryBlank: CountryBlank
}

class CountryEditor extends Component<Props, State>{
    constructor(props: Props){
        super(props)
        this.state = {
            modalIsOpen: false,
            errors: [],
            countryBlank: CountryBlank.getDefault()
        }
    }
    async componentDidMount(){
        if(this.props.params!.code != undefined){
            const data = await CountriesProvider.getCountry(Number(this.props.params!.code))
            this.setState({countryBlank: CountryBlank.fromCountry(data)})
        }
    }
    setModalIsOpen = (isOpen: boolean) =>{
        this.setState({modalIsOpen: isOpen})
    }

    saveCountry = async () =>{
        const data = await CountriesProvider.saveCountry(this.state.countryBlank)
        this.setState({errors: mapToErrors(data.errors)})
        this.setModalIsOpen(true)
    }
    changeCode =(code: number)=>{
        this.setState((prevState)=>({
            ...prevState, 
            countryBlank:{
                ...prevState.countryBlank, 
                code
            } 
        }))
    }
    changeName =(name: string)=>{
        this.setState((prevState)=>({
            ...prevState, 
            countryBlank:{
                ...prevState.countryBlank, 
                name
            } 
        }))
    }
    changePopulationNumber =(populationNumber: number)=>{
        console.log(this.state.countryBlank)
        this.setState((prevState)=>({
            ...prevState, 
            countryBlank:{
                ...prevState.countryBlank, 
                populationNumber
            } 
        }))
    }
    changeFoundationDate= (foundationDate: Date)=>{
        this.setState((prevState)=>({
            ...prevState, 
            countryBlank:{
                ...prevState.countryBlank, 
                foundationDate
            } 
        }))
    }
    render(){
        return(
            <div>
                <div className={style.container}>
                    <div className={style.countryEditor}>
                        <div className={style.centerAlign}>{this.props.params!.code == undefined ? "Добавление" : "Изменение"} страны</div>

                        <InputNumber label="Код страны: " value={this.state.countryBlank.code} onChange={this.changeCode}/>
                        
                        <InputText label="Наименование страны:" value={this.state.countryBlank.name} onChange={this.changeName} />

                        <InputNumber label="Население: " value={this.state.countryBlank.populationNumber} onChange={this.changePopulationNumber}/>
                        <div className={style.datePickerMain}>
                            <label>Дата основания:</label>
                            <DatePicker className={style.datePicker} selected={this.state.countryBlank.foundationDate} onChange={(date:Date) => this.changeFoundationDate(date)}
                            dateFormat="dd/MM/y"/>
                        </div>
   
                        <CustomButton value={this.props.params!.code == undefined ? "Добавить" : "Сохранить"} onClick={this.saveCountry}/>
                    </div>
                </div>
                <Modal isOpen={this.state.modalIsOpen} setIsOpen={this.setModalIsOpen}>
                    <div>{this.state.errors.length == 0 ? "Страна сохранена" : this.state.errors.map(error => error.value)}</div>
                </Modal>
            </div>

        )
    }
}
export default withRouter<Props>(CountryEditor)