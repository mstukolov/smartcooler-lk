/**
 * Created by MAKS on 23.08.2017.
 */
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";

import mockData from '../mock/mockClients.json';

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


class CustomersComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: mockData
        }
        this.options = {
            defaultSortName: 'orgid',
            defaultSortOrder: 'asc',
            noDataText: 'This is custom text for empty data',
            paginationPosition: 'bottom',
            afterInsertRow: onAfterInsertRow,
            afterDeleteRow: onAfterDeleteRow,
            insertText: 'Создать',
            deleteText: 'Удалить',
            exportCSVText: 'Выгрузить CSV',
        };
    }

    componentDidMount() {
        console.log('componentDidMount is run')
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
                    <TableHeaderColumn row='1' width='150' dataField='orgid' isKey dataSort>ID</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='organization' dataSort>Организация</TableHeaderColumn>
                    <TableHeaderColumn row='1' width='150' dataField='address' dataSort>Адресс</TableHeaderColumn>
                </BootstrapTable >
            </div>
        )}
}

export default CustomersComponent