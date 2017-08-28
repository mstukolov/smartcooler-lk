/**
 * Created by MAKS on 23.08.2017.
 */
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {Button, Form} from "react-bootstrap";
import axios from 'axios';
import { TimeSeries, TimeEvent, TimeRange } from "pondjs";
import FormGroup from "react-bootstrap/es/FormGroup";
import ControlLabel from "react-bootstrap/es/ControlLabel";
import DatePicker from "react-bootstrap-date-picker"

import Select from 'react-select';
import 'react-select/dist/react-select.css';
import ConsumptionChartComponent from "./recharts/consumptionChartComponent";


var self;
const organizations = [];

class ReportsComponent extends Component {
    constructor() {
        super();
        self = this;
        this.state = {
            data: [],
            start: '',
            end: '',
            orgid: 141,
            organizations : organizations,
            reportOrganization: ''
        }
        this.onChangeReportOrganization = this.onChangeReportOrganization.bind(this);

    }
    componentDidMount(){
        let url = "http://localhost:6013/organizations"
        axios.get(url).then(function (response) {
            response.data.map((item) => {organizations.push({value: item.id, label: item.id +','+item.organization})})
            self.setState({organizations: self.state.organizations.concat(organizations)})
        }).catch(function (error) {});
    }
    requestChartsData(){
        this.setState({data:[]})
        var url = 'http://localhost:6013/repdaystats?' +
                    'start='+ this.state.start +
                    '&end=' + this.state.end +
                    '&orgid=' + this.state.reportOrganization.value

        console.log('Построение данных по: ' + this.state.reportOrganization.value)
        axios.get(url).then(function (response) {
            self.setState({
                data: self.state.data.concat(response.data)})
        }).catch(function (error) {});
    }
    handleChangePeriodStart(start, formattedValue) {
        this.setState({
            start: start, // ISO String, ex: "2016-11-19T12:00:00.000Z"
            formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
        });
        console.log('период: ' + formattedValue)
    }
    handleChangePeriodEnd(end, formattedValue) {
        self.setState({
            end: end, // ISO String, ex: "2016-11-19T12:00:00.000Z"
            formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
        });
    }
    onChangeReportOrganization(reportOrganization){
        this.setState({ reportOrganization });
    }
    render() {
        return (
            <div>
                <h1>Аналитика потребления</h1>
                <Form inline>
                    <FormGroup>
                        <ControlLabel>Дата с:</ControlLabel>
                        <DatePicker id="start" name='start' value={this.state.start} onChange={this.handleChangePeriodStart.bind(this)} />
                        <ControlLabel>Дата по:</ControlLabel>
                        <DatePicker id="end" name='end' value={this.state.end} onChange={this.handleChangePeriodEnd.bind(this)} />
                        <Select
                            name="form-field-name"
                            autosize={true}
                            value={this.state.reportOrganization}
                            options={organizations}
                            onChange={this.onChangeReportOrganization}
                        />

                    </FormGroup>
                    <FormGroup>
                        <Button bsStyle="primary" bsSize="large" onClick={() => this.requestChartsData()}>Сформировать аналитику</Button>
                    </FormGroup>
                </Form>

                <div>

                    <ConsumptionChartComponent chartName="Дневное потребление" data={self.state.data} width={1500} height={500}/>
                    <Form inline>
                        <FormGroup>
                          <ConsumptionChartComponent chartName="Месячное потребление" data={self.state.data} width={500} height={300}/>
                        </FormGroup>
                        <FormGroup>
                            <ConsumptionChartComponent chartName="Квартальное потребление" data={self.state.data} width={500} height={300}/>
                        </FormGroup>
                        <FormGroup>
                            <ConsumptionChartComponent chartName="Годовое потребление" data={self.state.data} width={500} height={300}/>
                        </FormGroup>
                    </Form>

                </div>
            </div>
        )}
}

export default ReportsComponent