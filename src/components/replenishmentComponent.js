/**
 * Created by MAKS on 23.08.2017.
 */
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import axios from 'axios';

import RootUrl from "../config/config";

const selectRowProp = {
    mode: 'checkbox'
};
var self;

class ReplenishmentComponent extends Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            data: [],
            parentorgid: window.localStorage.getItem('c2m_orgid')
        }

        this.options = {
            noDataText: 'Данные отсутствуют',
            paginationPosition: 'bottom',
            sizePerPage: 25,
            exportCSVText: 'Выгрузить CSV',
        };
    }
    componentDidMount(){
        let url = RootUrl.ROOT_URL_PRODUCTION + "/replenishment?parentorgid=" + this.state.parentorgid
        axios.get(url).then(function (response) {
            self.setState({data: response.data})}).catch(function (error) {});
    }

    render() {
        return (
            <div>
                <h1>Активные заказы на пополнение</h1>
                <div>
                    <BootstrapTable data={ self.state.data }
                                    selectRow={ selectRowProp }
                                    exportCSV={ true }
                                    bordered={ true }
                                    options={  this.options }
                                    scrollTop={ 'Bottom' }
                                    search={ true }
                                    multiColumnSearch={ true }
                                    striped hover condensed pagination>
                        <TableHeaderColumn width='50' dataField='id' isKey dataSort hidden>ID</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='orgid' dataSort>Код клиента</TableHeaderColumn>
                        <TableHeaderColumn width='150' dataField='organization' dataSort>Название клиента</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='orderdate' dataSort>Дата заказа</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='ordertype' dataSort>Тип заказа</TableHeaderColumn>
                        <TableHeaderColumn width='150' dataField='orderweekday' dataSort>День недели</TableHeaderColumn>
                        <TableHeaderColumn width='150' dataField='orderqty' dataSort>Количество</TableHeaderColumn>

                    </BootstrapTable >
                </div>
            </div>

        )}
}


export default ReplenishmentComponent