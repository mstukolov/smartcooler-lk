/**
 * Created by MAKS on 23.08.2017.
 */
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { BootstrapTable, TableHeaderColumn, InsertModalHeader } from "react-bootstrap-table";
import {Link} from 'react-router-dom'
import axios from 'axios';
import RootUrl from "../config/config";


function onAfterDeleteRow(rowKeys) {
    alert('The rowkey you drop: ' + rowKeys);
}

var self;
class CustomersComponent extends Component {
    static onEnter(nextState, replace) {
        debugger
        const login = window.localStorage.getItem('rr_login')
        if (login !== 'admin') {
            replace('/')
        }
    }
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            data: [],
            parentorgid: window.localStorage.getItem('c2m_orgid')
        }
        this.options = {
            insertModalHeader: this.createCustomModalHeader,
            noDataText: 'Данные отсутствуют',
            afterInsertRow: this.onAfterInsertRow,
            afterDeleteRow: onAfterDeleteRow,
            insertText: 'Создать',
            deleteText: 'Удалить',
            exportCSVText: 'Выгрузить CSV'
        };
    }
    createCustomModalHeader = (closeModal, save) => {
        return (
            <InsertModalHeader title='Создание новой организации'/>
        )}

    componentDidMount(){
        let url = RootUrl.ROOT_URL_PRODUCTION + "/organizations?parentorgid=" + this.state.parentorgid
        axios.get(url).then(function (response) {
            self.setState({data: response.data})}).catch(function (error) {});
    }
    onAfterInsertRow(row) {
        var url = RootUrl.ROOT_URL_PRODUCTION + "/create-organization"
            axios.post(url, {
                    organization: row.organization,
                    parentorgid: self.state.parentorgid,
                    agreement:row.agreement,
                    inventQty:row.inventQty
                }
            ).then(function (response) {
                let url = RootUrl.ROOT_URL_PRODUCTION + "/organizations?parentorgid=" + self.state.parentorgid
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
                    <TableHeaderColumn row='1' width='150' dataField='organization' isKey dataSort>Организация</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='active' dataSort hiddenOnInsert={true}>Активность</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='agreement' dataSort>Договор</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='contact' dataSort >Контактное лицо</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='phone' dataSort >Телефон</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='inventQty' dataSort>Остаток</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='id' dataSort dataFormat={hrefFormatter} hiddenOnInsert>Управление</TableHeaderColumn>
                </BootstrapTable >
            </div>
        )}
}

function hrefFormatter(cell, row) {
    const newTo = { pathname: "/orgcard", orgid: cell };
    return  <Link to={newTo}>Редактирование...</Link>;
}

export default CustomersComponent