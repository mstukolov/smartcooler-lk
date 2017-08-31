/**
 * Created by MAKS on 29.08.2017.
 */
'use strict'
import React, {Component} from 'react';
import axios from 'axios';
import {FormGroup, ControlLabel, FormControl, Button} from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker"
import MessageComponent from "../util/messageComponent";

var self;
class OrganizationCard extends Component {
    constructor(props, context){
        super(props, context);
        self = this;
        this.state = {
            organizationDetails: '',
            orgid:this.props.location.orgid,
            status: 'null'
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);

    }
    componentDidMount(){
        var url = "http://localhost:6013/organization-details?orgid=" + this.props.location.orgid
        axios.get(url).then(function (response) {
            self.setState({organizationDetails: response.data})}).catch(function (error) {});
    }
    handleChange(e) {
        var fieldName = e.target.name;
        this.setState({ organizationDetails: {[fieldName]: e.target.value }});
    }
    handleChangeDate(e){
        this.setState({ organizationDetails: {agreementDate: e }});
    }
    saveCard(){
        var url = "http://localhost:6013/save-organization-details"
        axios.post(url, {
                    orgid:self.state.orgid,
                    organization: self.state.organizationDetails.organization,
                    active: self.state.organizationDetails.active,
                    inventQty:self.state.organizationDetails.inventQty,
                    agreement:self.state.organizationDetails.agreement,
                    agreementDate:self.state.organizationDetails.agreementDate,
                    email:self.state.organizationDetails.email,
                    phone:self.state.organizationDetails.phone,
                    contact:self.state.organizationDetails.contact
        }).then(function (response) {self.setState({status: 'success'})}).catch(function (error) {});
    }
    deleteCard(){
        var url = "http://localhost:6013/delete-organization";
        axios.post(url, {orgid:self.state.orgid})
                .then(function (response) {
                    self.setState({status: 'success'})
                    self.props.history.push('/customers');
                }).catch(function (error) {self.setState({status: 'warning'})});
    }
    render() {
        return (
            <div>
                <h1>{this.state.organizationDetails.organization}</h1>
                <form style={{width:'800px', padding: '20px'}}>
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

                            <ControlLabel>Остаток:</ControlLabel>
                            <FormControl type="text"
                                         name="inventQty"
                                         value={this.state.organizationDetails.inventQty}
                                         onChange={this.handleChange}/>
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
                        <hr/>
                        <Button bsStyle="success" bgSize="large" onClick={this.saveCard}>Сохранить</Button>
                        <Button bsStyle="danger" bgSize="large" onClick={this.deleteCard}>Удалить....</Button>
                    </FormGroup>
                </form>
                <MessageComponent status={this.state.status}/>
            </div>
        )}
}


export default OrganizationCard