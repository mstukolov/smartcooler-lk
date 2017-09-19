/**
 * Created by MAKS on 23.08.2017.
 */
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {Button, Form} from "react-bootstrap";
import axios from 'axios';

import FormGroup from "react-bootstrap/es/FormGroup";
import ControlLabel from "react-bootstrap/es/ControlLabel";
import DatePicker from "react-bootstrap-date-picker"

import Select from 'react-select';
import 'react-select/dist/react-select.css';
import ConsumptionChartComponent from "./recharts/consumptionChartComponent";

import RootUrl from "../config/config";

var self;
var organizations = [];

class ReportsComponent extends Component {
    constructor() {
        super();
        self = this;
        this.state = {
            dailyData: [],
            monthData: [],
            quartData: [],
            yearData: [],
            start: '',
            end: '',
            orgid: 141,
            organizations : organizations,
            reportOrganization: '',
            parentorgid : window.localStorage.getItem('c2m_orgid')
        }
        this.onChangeReportOrganization = this.onChangeReportOrganization.bind(this);

    }
    componentDidMount(){
        let url = RootUrl.ROOT_URL_PRODUCTION + "/organizations?parentorgid=" + this.state.parentorgid;
        organizations = []
        axios.get(url).then(function (response) {
            response.data.map((item) => {organizations.push({value: item.id, label: item.id +','+item.organization})})
            self.setState({organizations: self.state.organizations.concat(organizations)})
        }).catch(function (error) {});
    }
    requestChartsData(){
        this.setState({dailyData:[]})
        this.setState({monthData:[]})
        this.setState({quartData:[]})
        this.setState({yearData:[]})

        var urlDay = RootUrl.ROOT_URL_PRODUCTION + '/repdaystats?' +
                    'start='+ this.state.start +
                    '&end=' + this.state.end +
                    '&orgid=' + this.state.reportOrganization.value;

        var startDate = new Date(this.state.start);
        var endDate = new Date(this.state.end);

        let urlMonth = RootUrl.ROOT_URL_PRODUCTION +
                            '/repmonthstats?orgid=' + this.state.reportOrganization.value +
                            '&year_start=' + startDate.getFullYear() +
                            '&year_end=' + endDate.getFullYear() +
                            '&month_start=' + (startDate.getMonth()+1) +
                            '&month_end=' + (endDate.getMonth() + 1)

        let urlQuart = RootUrl.ROOT_URL_PRODUCTION +
                            '/repquartstats?orgid=' + this.state.reportOrganization.value +
                            '&year_start=' + startDate.getFullYear() +
                            '&year_end=' + endDate.getFullYear()

        let urlYear  = RootUrl.ROOT_URL_PRODUCTION +
                            '/repyeartstats?orgid=' + this.state.reportOrganization.value +
                            '&year_start=' + startDate.getFullYear() +
                            '&year_end=' + endDate.getFullYear()

        axios.get(urlDay).then(function (response) {
            self.setState({dailyData: self.state.dailyData.concat(response.data)})}).catch(function (error) {});

        axios.get(urlMonth).then(function (response) {
            self.setState({monthData: self.state.monthData.concat(response.data)})}).catch(function (error) {});

        axios.get(urlQuart).then(function (response) {
            self.setState({quartData: self.state.quartData.concat(response.data)})}).catch(function (error) {});

        axios.get(urlYear).then(function (response) {
            self.setState({yearData: self.state.yearData.concat(response.data)})}).catch(function (error) {});

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
                <h1>Анализ потребления</h1>
                <Form style={{width:'100%', padding: '20px'}}>
                    <FormGroup>
                        <ControlLabel>Дата с:</ControlLabel>
                        <DatePicker id="start" name='start' value={this.state.start} onChange={this.handleChangePeriodStart.bind(this)} />
                        <ControlLabel>Дата по:</ControlLabel>
                        <DatePicker id="end" name='end' value={this.state.end} onChange={this.handleChangePeriodEnd.bind(this)} />
                        <ControlLabel>Организация:</ControlLabel>
                        <Select
                            name="form-field-name"
                            autosize={true}
                            value={this.state.reportOrganization}
                            options={organizations}
                            onChange={this.onChangeReportOrganization}
                        />

                    </FormGroup>
                    <FormGroup>
                        <Button bsStyle="primary" style={{width:'100%'}} bsSize="large"
                                onClick={() => this.requestChartsData()}>Запустить запрос данных</Button>
                    </FormGroup>
                </Form>

                <div>

                    <ConsumptionChartComponent chartName="Дневное потребление(литры)"
                                               data={self.state.dailyData}
                                               dataKey={'recdate'}
                                               width={1500} height={500} barSize={5}/>
                    <Form inline>
                        <FormGroup>
                          <ConsumptionChartComponent chartName="Месячное потребление(литры)"
                                                     data={self.state.monthData}
                                                     dataKey={'recmonthyear'}
                                                     width={500} height={300} barSize={20}/>
                        </FormGroup>
                        <FormGroup>
                            <ConsumptionChartComponent chartName="Квартальное потребление(литры)"
                                                       data={self.state.quartData}
                                                       dataKey={'recquart'}
                                                       width={500} height={300} barSize={40}/>
                        </FormGroup>
                        <FormGroup>
                            <ConsumptionChartComponent chartName="Годовое потребление(литры)"
                                                       data={self.state.yearData}
                                                       dataKey={'recyear'}
                                                       width={500} height={300} barSize={80}/>
                        </FormGroup>
                    </Form>

                </div>
            </div>
        )}
}

export default ReportsComponent