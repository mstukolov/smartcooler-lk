/**
 * Created by MAKS on 23.08.2017.
 */
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {Link} from 'react-router-dom'
import axios from 'axios';
import RootUrl from "../config/config";
var dateFormat = require('dateformat');

var self;
class DevicesComponent extends Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            data: [],
            parentorgid: window.localStorage.getItem('c2m_orgid')
        }
        this.options = {
            defaultSortName: 'devid',
            defaultSortOrder: 'asc',
            sizePerPage: 25,
            noDataText: 'Данные отсутствуют',
            paginationPosition: 'bottom',
            insertText: 'Создать',
            deleteText: 'Удалить',
            exportCSVText: 'Выгрузить CSV',
        };
    }

    componentDidMount(){
        let url = RootUrl.ROOT_URL_PRODUCTION + "/devices?parentorgid=" + this.state.parentorgid
        axios.get(url).then(function (response) {
            self.setState({data: response.data})}).catch(function (error) {});
    }

    componentWillMount() {
        console.log('componentWillMount is run')
    }
    render() {
        return (
            <div>
                <h1>Управление устройствами</h1>
                <BootstrapTable data={ this.state.data }
                                exportCSV={ true }
                                bordered={ true }
                                options={  this.options }
                                scrollTop={ 'Bottom' }
                                search={ true }
                                multiColumnSearch={ true }
                                striped hover condensed pagination>
                    <TableHeaderColumn row='1' width='150' dataField='devid' dataSort>Устройство</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='org' dataSort dataFormat={showCustomerName}>Организация</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='devtype' dataSort>Тип устройства</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='lasttrans' dataFormat={showLastTransValue} dataSort>Последнее значение</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='lasttrans' dataFormat={showLastTransTime} dataSort>Выход на связь</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='id' isKey dataFormat={hrefFormatter} hiddenOnInsert>Управление</TableHeaderColumn>
                </BootstrapTable >
            </div>
        )}
}
function showCustomerName(cell, row) {
    return cell.organization;
}
function showLastTransValue(cell, row) {
    if(cell != null) {return cell.nparam1} else return null
}
function showLastTransTime(cell, row) {
    if(cell != null) {return dateFormat(cell.createdAt, "dd-mm-yyyy HH:MM:ss")} else return null
}

function hrefFormatter(cell, row) {
    const goTo = { pathname: "/devicecard", deviceid: cell };
    return  <Link to={goTo}>Редактирование...</Link>;
}

export default DevicesComponent