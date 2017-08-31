/**
 * Created by MAKS on 23.08.2017.
 */
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { BootstrapTable, TableHeaderColumn, InsertButton } from "react-bootstrap-table";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import axios from 'axios';



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
            //insertModal: this.createCustomModal,
            noDataText: 'Данные отсутствуют',
            paginationPosition: 'bottom',
            afterInsertRow: this.onAfterInsertRow,
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
    onAfterInsertRow(row) {
        var url = "http://localhost:6013/create-organization"
            axios.post(url, {
                    organization: row.organization,
                    parentorgid: self.state.parentorgid,
                    agreement:row.agreement,
                    inventQty:row.inventQty
                }
            ).then(function (response) {
                let url = "http://localhost:6013/organizations?parentorgid=" + self.state.parentorgid
                axios.get(url).then(function (response) {
                    self.setState({data: response.data})}).catch(function (error) {});
            }).catch(function (error) {});
    }
    render() {
        return (
            <div>
                <h1>Клиенты</h1>
                <BootstrapTable data={ this.state.data }
                                insertRow={ true }
                                exportCSV={ true }
                                bordered={ true }
                                options={  this.options }
                                scrollTop={ 'TOP' }
                                search={ true }
                                multiColumnSearch={ true }
                                striped hover condensed pagination>
                    <TableHeaderColumn row='1' width='150' dataField='id' dataSort dataFormat={hrefFormatter} hiddenOnInsert>Управление</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='organization' isKey dataSort>Организация</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='active' dataSort hiddenOnInsert={true}>Активность</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='agreement' dataSort>Договор</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='agreementDate' dataSort dataFormat={adjustDateCell} hiddenOnInsert>Дата договора</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='inventQty' dataSort>Остаток</TableHeaderColumn>
                </BootstrapTable >
            </div>
        )}
}

function adjustDateCell(cell, row) {
    return cell;
}
function hrefFormatter(cell, row) {
    const newTo = { pathname: "/orgcard", orgid: cell };
    return  <Link to={newTo}>Детали...</Link>;
}

export default CustomersComponent