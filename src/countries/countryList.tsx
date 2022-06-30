import { ChangeEvent, Component } from "react";
import { CountriesProvider } from "../domain/location/countries/countriesProvider";
import { Country } from "../domain/location/countries/models/country";
import CountryCard from "../sharedComponents/cards/countryCard";
import { InputText } from "../sharedComponents/inputs/inputText";
import { Select } from "../sharedComponents/selects/select";
import { Pagination } from "../tools/pagination";

import style from "./countryList.module.css"

interface Props{
    
}
interface State{
    countries: Country[]
    pagination: PaginationState
}
interface PaginationState{
    currentPage: number
    countInPage: number 
    totalRows: number
    searchText: string
}

export class CountryList extends Component<Props, State>{
    constructor(props:Props){
        super(props)
        this.state = {
            countries: [],
            pagination: {currentPage: 1, countInPage: 5, totalRows: 0, searchText: ""}
        }
    }    

    async componentDidMount(){
        this.load({...this.state.pagination, currentPage: 1})
    }
    load = async (pagination: PaginationState) => {
        console.log(pagination)
        const page = await CountriesProvider.getCountriesPage(pagination.currentPage, pagination.countInPage, pagination.searchText)

        this.setState(prevState => ({
            ...prevState,
            pagination: {...pagination, totalRows: page.totalRows},
            countries: page.values
        }))
    }
    onSearchTextChange = (searchText:string) =>{
        this.load({...this.state.pagination, currentPage: 1, searchText})
    }
    onChangePage = (currentPage: number) =>{
        this.load({...this.state.pagination, currentPage})
    }
    onChangeCountInPage = (count: number) =>{
        this.load({...this.state.pagination, currentPage: 1, countInPage: count})
    }
    
    reloadPage = () =>{
        this.load({...this.state.pagination, currentPage: 1})
    }
    render() {
        return(
            <div className={style.main}>
                <div className={style.selectMain}>
                    <Select currentValue={this.state.pagination.countInPage} values={this.state.pagination.totalRows} 
                            label="Количество элементов на странице:" onChangeCountInPage={this.onChangeCountInPage}/>
                </div>

                <div className={style.searchMain}>
                    <InputText label={"Поиск страны"} value={this.state.pagination.searchText} onChange={this.onSearchTextChange}/>
                </div>

                <div> 
                    {this.state.countries.map((country) => (
                        <CountryCard key={country.code} country={country} reloadPage={this.reloadPage}/>
                    ))}  
                </div>
                
                <Pagination currentPage={this.state.pagination.currentPage} countInPage={this.state.pagination.countInPage} totalRows={this.state.pagination.totalRows} onChangePage={this.onChangePage}/>
            </div>          
        )
    }
}
