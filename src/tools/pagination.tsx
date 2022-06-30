import { Component } from "react";

import style from "./pagination.module.css"

interface Props {
    currentPage: number
    countInPage: number
    totalRows: number
    onChangePage: (currentPage: number) => void
}
interface State {
    countPages: number
}

export class Pagination extends Component<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            countPages: 0
        }
    }

    setCountPages = () => {
        let countPages = this.props.totalRows / this.props.countInPage
        if (countPages % 1 != 0)
            countPages = (countPages - (countPages % 1)) + 1
        
        return countPages 
    }
    onChangePage = (currentPage: number) => {
        this.props.onChangePage(currentPage)
    }
    listPages = () => {
        let pageIndex = []
        const countPages = this.setCountPages()
        for (let i = 1; i <= countPages; i++) {
            pageIndex.push(i)
        }
        return this.mapToList(pageIndex)
    }
    mapToList(pageIndex: number[]){
        return pageIndex.map((index) => (
            <div key={index}
                 className={this.props.currentPage == index ? style.activePage : style.pageNumber}
                 onClick={() => this.onChangePage(index)}
                >
                {index}
            </div>
        ))
    }
    
    render() {
        return (
            <div>
                <div className={style.main}>
                    {this.listPages()}
                </div>
            </div>
        )
    }
}