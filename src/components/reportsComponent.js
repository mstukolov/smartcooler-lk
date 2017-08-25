/**
 * Created by MAKS on 23.08.2017.
 */
import React, {Component} from 'react';
import { ComposedChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "bootstrap/dist/css/bootstrap.css";
import {Button, Form} from "react-bootstrap";
import axios from 'axios';
import { TimeSeries, TimeEvent, TimeRange } from "pondjs";
import FormGroup from "react-bootstrap/es/FormGroup";
import ControlLabel from "react-bootstrap/es/ControlLabel";
import DatePicker from "react-bootstrap-date-picker"
var self;

class ReportsComponent extends Component {
    constructor() {
        super();
        self = this;
        this.state = {
            data: [],
            start: '',
            end: '',
            orgid: 141
        }
    }
    componentDidMount(){

    }
    printData(){
        this.setState({data:[]})
        var url = 'http://localhost:6013/repdaystats?' +
                    'start='+ this.state.start +
                    '&end=' + this.state.end +
                    '&orgid=' + this.state.orgid

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
    render() {
        return (
            <div>
                <h1>Аналитика потребления</h1>
                <Button bsStyle="primary" onClick={() => this.printData()}>Сформировать отчеты</Button>
                <FormGroup>
                    <ControlLabel>Дата с:</ControlLabel>
                    <DatePicker id="start" name='start' value={this.state.start} onChange={this.handleChangePeriodStart.bind(this)} />
                    <ControlLabel>Дата по:</ControlLabel>
                    <DatePicker id="end" name='end' value={this.state.end} onChange={this.handleChangePeriodEnd.bind(this)} />
                </FormGroup>
                <div>
                    <h3>Потребление организации по дням</h3>
                    {<ComposedChart  width={1500} height={300} data={self.state.data}
                               margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="recdate"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend />
                        <Bar dataKey='valuein' barSize={5} fill='#413ea0'/>
                        <Line type="monotone" dataKey="valueend" stroke="#8884d8"/>
                    </ComposedChart >}

                    <Form inline>
                        <FormGroup>
                            <h3>Потребление организации по месяцам</h3>
                            {<ComposedChart  width={500} height={300} data={self.state.data}
                                             margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                <XAxis dataKey="recdate"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip/>
                                <Legend />
                                <Bar dataKey='valuein' barSize={5} fill='#413ea0'/>
                                <Line type="monotone" dataKey="valueend" stroke="#8884d8"/>
                            </ComposedChart >}
                        </FormGroup>
                        <FormGroup>
                            <h3>Потребление организации по-квартально</h3>
                            {<ComposedChart  width={500} height={300} data={self.state.data}
                                             margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                <XAxis dataKey="recdate"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip/>
                                <Legend />
                                <Bar dataKey='valuein' barSize={5} fill='#413ea0'/>
                                <Line type="monotone" dataKey="valueend" stroke="#8884d8"/>
                            </ComposedChart >}
                        </FormGroup>
                        <FormGroup>
                            <h3>Потребление организации за год</h3>
                            {<ComposedChart  width={500} height={300} data={self.state.data}
                                             margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                <XAxis dataKey="recdate"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip/>
                                <Legend />
                                <Bar dataKey='valuein' barSize={5} fill='#413ea0'/>
                                <Line type="monotone" dataKey="valueend" stroke="#8884d8"/>
                            </ComposedChart >}
                        </FormGroup>
                    </Form>

                </div>
            </div>
        )}
}

export default ReportsComponent