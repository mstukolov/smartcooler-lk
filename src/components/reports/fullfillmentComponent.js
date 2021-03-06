/**
 * Created by MAKS on 10.09.2017.
 */
/**
 * Created by MAKS on 08.09.2017.
 */
/**
 * Created by MAKS on 23.08.2017.
 */
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import axios from 'axios';

import RootUrl from "../../config/config";

const selectRowProp = {
    mode: 'checkbox'
};
var self;

class FullfillmentComponent extends Component {
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
        let url = RootUrl.ROOT_URL_PRODUCTION +
                "/fulfillment-orders?parentorgid=" + this.state.parentorgid
        axios.get(url).then(function (response) {
            self.setState({data: response.data})}).catch(function (error) {});
    }

    render() {
        return (
            <div>
                <h1>План-факторный анализ</h1>
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
                        <TableHeaderColumn width='100' dataField='orderweekday' dataSort>День недели</TableHeaderColumn>
                        <TableHeaderColumn width='80' dataField='avgbottle' dataSort>Средн.</TableHeaderColumn>
                        <TableHeaderColumn width='80' dataField='orderQty' dataSort>План. кол-во</TableHeaderColumn>
                        <TableHeaderColumn width='80' dataField='realQty' dataSort>Факт. кол-во</TableHeaderColumn>
                        <TableHeaderColumn width='80' dataField='deltaQty' dataSort>Разница</TableHeaderColumn>
                        <TableHeaderColumn width='50' dataField='deltasignQty' dataFormat={formatDeltaDirection} dataSort>Изм</TableHeaderColumn>

                    </BootstrapTable >
                </div>
            </div>

        )}
}
function formatDeltaDirection(cell, row){
    if(cell === -1) {return '<i class="glyphicon glyphicon-arrow-down text-danger" style="font-size:1.5em;">'}
    if(cell === 1) {return '<i class="glyphicon glyphicon-arrow-up text-success" style="font-size:1.5em;">'}
    return '';
}

export default FullfillmentComponent