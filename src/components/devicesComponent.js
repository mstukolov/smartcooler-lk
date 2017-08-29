/**
 * Created by MAKS on 23.08.2017.
 */
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
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
class DevicesComponent extends Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            data: [],
            parentorgid: '13445412'
        }
        this.options = {
            defaultSortName: 'devid',
            defaultSortOrder: 'asc',
            sizePerPage: 25,
            noDataText: 'This is custom text for empty data',
            paginationPosition: 'bottom',
            afterInsertRow: onAfterInsertRow,
            afterDeleteRow: onAfterDeleteRow,
            insertText: 'Создать',
            deleteText: 'Удалить',
            exportCSVText: 'Выгрузить CSV',
        };
    }

    componentDidMount(){
        let url = "http://localhost:6013/devices?parentorgid=" + this.state.parentorgid
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
                                insertRow={ true }
                                deleteRow={ true }
                                exportCSV={ true }
                                bordered={ true }
                                options={  this.options }
                                scrollTop={ 'Bottom' }
                                search={ true }
                                multiColumnSearch={ true }
                                striped hover condensed pagination>
                    <TableHeaderColumn row='1' width='150' dataField='id' isKey dataSort>ID</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='orgid' dataSort>Код клиента</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='org' dataSort dataFormat={showCustomerName}>Наименование клиента</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='devid' dataSort>Устройство</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='devtype' dataSort>Тип устройства</TableHeaderColumn>
                </BootstrapTable >
            </div>
        )}
}
function showCustomerName(cell, row) {
    return cell.organization;
}

export default DevicesComponent