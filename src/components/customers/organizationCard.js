/**
 * Created by MAKS on 29.08.2017.
 */
'use strict'
import React, {Component} from 'react';
import axios from 'axios';
import {Form, FormGroup, ControlLabel, FormControl, Button, ToggleButtonGroup, ToggleButton,Checkbox} from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker"
import MessageComponent from "../util/messageComponent";
import RootUrl from "../../config/config";

var self;
class OrganizationCard extends Component {
    constructor(props, context){
        super(props, context);
        self = this;
        this.state = {
            organizationDetails: '',
            orgid:this.props.location.orgid,
            status: 'null',
            checkboxMonday: false,
            checkboxTuesday: false,
            checkboxWednesday: false,
            checkboxThursday: false,
            checkboxFriday: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeDeliverySchedule = this.handleChangeDeliverySchedule.bind(this);

    }
    componentDidMount(){
        var url = RootUrl.ROOT_URL_PRODUCTION + "/organization-details?orgid=" + this.props.location.orgid
        axios.get(url).then(function (response) {
            self.setState({organizationDetails: response.data})}).catch(function (error) {});

        var urlDeliverySchedule = RootUrl.ROOT_URL_PRODUCTION
                            + "/get-deliveryschedule?orgid=" + this.props.location.orgid
        axios.get(urlDeliverySchedule).then(function (response) {
            self.setState({
                checkboxMonday: response.data[0].markmon,
                checkboxTuesday: response.data[0].marktue,
                checkboxWednesday: response.data[0].markwen,
                checkboxThursday: response.data[0].markthu,
                checkboxFriday: response.data[0].markfri
            })}).catch(function (error) {});
    }
    handleChange(e) {
        var fieldName = e.target.name;
        var currDate = new Date();
        if(fieldName != "currQty"){
            this.setState({ organizationDetails: {[fieldName]: e.target.value }})
        }else{
            this.setState({ organizationDetails: {[fieldName]: e.target.value,  updatedQty: currDate}})
        };
    }
    handleChangeDate(e){
        this.setState({ organizationDetails: {agreementDate: e }});
    }
    handleChangeDeliverySchedule(evt){
        this.setState({[evt.target.name]: evt.target.checked})
    }
    saveCard(){
        var url = RootUrl.ROOT_URL_PRODUCTION + "/save-organization-details"
        axios.post(url, {
                    orgid:self.state.orgid,
                    organization: self.state.organizationDetails.organization,
                    active: self.state.organizationDetails.active,
                    inventQty:self.state.organizationDetails.inventQty,
                    currQty:self.state.organizationDetails.currQty,
                    updatedQty:self.state.organizationDetails.updatedQty,
                    agreement:self.state.organizationDetails.agreement,
                    agreementDate:self.state.organizationDetails.agreementDate,
                    email:self.state.organizationDetails.email,
                    phone:self.state.organizationDetails.phone,
                    contact:self.state.organizationDetails.contact
        }).then(function (response) {self.setState({status: 'success'})}).catch(function (error) {});

        var urlUpdateSchedule = RootUrl.ROOT_URL_PRODUCTION + "/update-deliveryschedule"

        axios.post(urlUpdateSchedule, {
            orgid:self.state.orgid,
            markmon:self.state.checkboxMonday,
            marktue: self.state.checkboxTuesday,
            markwen: self.state.checkboxWednesday,
            markthu:self.state.checkboxThursday,
            markfri:self.state.checkboxFriday
        }).then(function (response) {self.setState({status: 'success'})}).catch(function (error) {});
    }
    deleteCard(){
        var url = RootUrl.ROOT_URL_PRODUCTION + "/delete-organization";
        axios.post(url, {orgid:self.state.orgid})
                .then(function (response) {
                    self.setState({status: 'success'})
                    self.props.history.push('/customers');
                }).catch(function (error) {self.setState({status: 'warning'})});
    }
    render() {
        return (
            <div>
                <Form style={{width:'50%', padding: '20px'}}>
                    <h1>{this.state.organizationDetails.organization}</h1>

                    <FormGroup controlId="organizationCard">
                        <FormGroup>
                            <ControlLabel>Код Организации:</ControlLabel>
                            <FormControl type="text" value={this.state.organizationDetails.id}/>
                            <ControlLabel>Головная орагнизация:</ControlLabel>
                            <FormControl type="text" value={this.state.organizationDetails.parentorgId}/>
                        </FormGroup>
                            <ControlLabel>Название Организации</ControlLabel>
                            <FormControl type="text"
                                         name="organization"
                                         value={this.state.organizationDetails.organization}
                                         onChange={this.handleChange}/>

                            <ControlLabel>Активность:</ControlLabel>
                            <FormControl componentClass="select" placeholder="select" value={this.state.organizationDetails.active} onChange={this.handleChange}>
                                <option value="Активен">Активен</option>
                                <option value="Блокирован">Блокирован</option>
                                <option value="Отключен">Отключен</option>
                            </FormControl>

                            <FormGroup>
                                <ControlLabel>Текущий Остаток:</ControlLabel>
                                <FormControl type="text"
                                             name="currQty"
                                             value={this.state.organizationDetails.currQty}
                                             onChange={this.handleChange}/>
                            </FormGroup>

                            <ControlLabel>Договор:</ControlLabel>
                            <FormControl type="text"
                                         name="agreement"
                                         value={this.state.organizationDetails.agreement}
                                         onChange={this.handleChange}/>
                            <ControlLabel>Дата договора:</ControlLabel>
                            <DatePicker id="agreementDate"
                                        name='agreementDate'
                                        value={this.state.organizationDetails.agreementDate}
                                        onChange={this.handleChangeDate} />

                            <ControlLabel>Email:</ControlLabel>
                            <FormControl type="text"
                                         name="email"
                                         value={this.state.organizationDetails.email}
                                         onChange={this.handleChange}/>

                            <ControlLabel>Телефон:</ControlLabel>
                            <FormControl type="text"
                                         name="phone"
                                         value={this.state.organizationDetails.phone}
                                         onChange={this.handleChange}/>

                            <ControlLabel>Контактное лицо:</ControlLabel>
                            <FormControl type="text"
                                         name="contact"
                                         value={this.state.organizationDetails.contact}
                                         onChange={this.handleChange}/>
                        <FormGroup>
                            <ControlLabel>График поставок:</ControlLabel>
                            <FormGroup>
                                <Checkbox inline
                                          name="checkboxMonday"
                                          checked={this.state.checkboxMonday}
                                          onChange={this.handleChangeDeliverySchedule}>
                                    Понедельник
                                </Checkbox>
                                {' '}
                                <Checkbox inline
                                          name="checkboxTuesday"
                                          checked={this.state.checkboxTuesday}
                                          onChange={this.handleChangeDeliverySchedule}>
                                    Вторник
                                </Checkbox>
                                {' '}
                                <Checkbox inline
                                          name="checkboxWednesday"
                                          checked={this.state.checkboxWednesday}
                                          onChange={this.handleChangeDeliverySchedule}>
                                    Среда
                                </Checkbox>
                                {' '}
                                <Checkbox inline
                                          name="checkboxThursday"
                                          checked={this.state.checkboxThursday}
                                          onChange={this.handleChangeDeliverySchedule}>
                                    Четверг
                                </Checkbox>
                                {' '}
                                <Checkbox inline
                                          name="checkboxFriday"
                                          checked={this.state.checkboxFriday}
                                          onChange={this.handleChangeDeliverySchedule}>
                                    Пятница
                                </Checkbox>
                            </FormGroup>
                            <hr/>
                        </FormGroup>
                        <hr/>
                        <Button bsStyle="success" bgSize="large" onClick={this.saveCard}>Сохранить</Button>
                        <Button bsStyle="danger" bgSize="large" onClick={this.deleteCard}>Удалить....</Button>
                    </FormGroup>
                </Form>
                <MessageComponent status={this.state.status}/>
            </div>
        )}
}


export default OrganizationCard