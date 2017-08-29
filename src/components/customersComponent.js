/**
 * Created by MAKS on 23.08.2017.
 */
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import axios from 'axios';

function onAfterInsertRow(row) {
    let newRowStr = '';
    for (const prop in row) {
        newRowStr += prop + ': ' + row[prop] + ' \n';
    }
    alert('The new row is:\n ' + newRowStr);
}
function onAfterDeleteRow(rowKeys) {
    alert('The rowkey you drop: ' + rowKeys);
}

var self;
class CustomersComponent extends Component {

    constructor(props) {
        super(props);
        self = this;
        this.state = {
            data: [],
            parentorgid: '13445412'
        }
        this.options = {
            noDataText: 'Данные отсутствуют',
            paginationPosition: 'bottom',
            afterInsertRow: onAfterInsertRow,
            afterDeleteRow: onAfterDeleteRow,
            insertText: 'Создать',
            deleteText: 'Удалить',
            exportCSVText: 'Выгрузить CSV',
        };
    }

    componentDidMount(){
        let url = "http://localhost:6013/organizations?parentorgid=" + this.state.parentorgid
        axios.get(url).then(function (response) {
            self.setState({data: response.data})}).catch(function (error) {});
    }
    render() {
        return (
            <div>
                <h1>Клиенты</h1>
                <BootstrapTable data={ this.state.data }
                                insertRow={ true }
                                deleteRow={ true }
                                exportCSV={ true }
                                bordered={ true }
                                options={  this.options }
                                scrollTop={ 'TOP' }
                                search={ true }
                                multiColumnSearch={ true }
                                striped hover condensed pagination>
                    <TableHeaderColumn row='1' width='150' dataField='id' isKey dataSort dataFormat={hrefFormatter}>Код</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='organization' dataSort>Организация</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='active' dataSort>Активность</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='agreement' dataSort>Договор</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='agreementDate' dataSort dataFormat={adjustDateCell}>Дата договора</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='inventQty' dataSort>Остаток</TableHeaderColumn>
                </BootstrapTable >
            </div>
        )}
}

function adjustDateCell(cell, row) {
    return cell;
}
function hrefFormatter(cell, row) {
    var url = "/orgcard?" + cell;
    return  <Link to={url}>{cell}</Link>;
}

export default CustomersComponent