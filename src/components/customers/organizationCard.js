/**
 * Created by MAKS on 29.08.2017.
 */
'use strict'
import React, {Component} from 'react';
import axios from 'axios';
import {FormGroup, ControlLabel, FormControl, Button} from "react-bootstrap";

var self;
class OrganizationCard extends Component {
    constructor(props){
        super(props);
        self = this;
        this.state = {
            organizationDetails: '',
            inventQty: ''
        }

    }
    componentDidMount(){
        var url = "http://localhost:6013/organization-details?orgid=" + this.props.location.orgid
        axios.get(url).then(function (response) {
            self.setState(
                {
                    organizationDetails: response.data,
                    inventQty:response.data.inventQty
                }
                )}).catch(function (error) {});
    }
    handleChange(e) {
        self.setState({ organizationDetails: {organization: e.target.value }});
    }
    saveCard(){
        var url = "http://localhost:6013/save-organization-details"
        axios.post(url, {
                    orgid:self.state.organizationDetails.id,
                    organization: self.state.organizationDetails.organization,
                    active: self.state.organizationDetails.organization,
                    inventQty:self.state.organizationDetails.inventQty
            }
        ).then(function (response) {console.log('Saved Card...........')       }).catch(function (error) {});
    }
    render() {
        return (
            <div>
                <h1>Карточка Организации: {this.props.location.orgid}</h1>
                <h3>Код Организации: {this.state.organizationDetails.id}</h3>
                <h3>Название Организации: {this.state.organizationDetails.organization}</h3>
                <h3>Головная орагнизация: {this.state.organizationDetails.parentorgId}</h3>
                <h3>Активен: {this.state.organizationDetails.active}</h3>
                <h3>Остаток: {this.state.inventQty}</h3>
                <h3>Договор: {this.state.organizationDetails.agreement}</h3>
                <h3>Дата договора: {this.state.organizationDetails.agreementDate}</h3>
                <h3>Email: {this.state.organizationDetails.email}</h3>
                <h3>Телефон: {this.state.organizationDetails.phone}</h3>
                <h3>Контактное лицо: {this.state.organizationDetails.contact}</h3>
                <form>
                    <FormGroup controlId="organizationCard">
                        <FormGroup inline>
                            <ControlLabel>Код Организации:</ControlLabel>
                            <FormControl type="text" value={this.state.organizationDetails.id}/>
                        </FormGroup>
                            <ControlLabel>Название Организации</ControlLabel>
                            <FormControl type="text" value={this.state.organizationDetails.organization}  onChange={this.handleChange}/>
                        <Button bsStyle="success" bgSize="large" onClick={this.saveCard}>Сохранить</Button>
                    </FormGroup>
                </form>
            </div>
        )}
}


export default OrganizationCard