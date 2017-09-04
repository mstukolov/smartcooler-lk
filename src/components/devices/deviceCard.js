/**
 * Created by MAKS on 01.09.2017.
 */
'use strict'
import React, {Component} from 'react';
import axios from 'axios';
import {FormGroup, ControlLabel, FormControl, Button, Col, InputGroup, Form} from "react-bootstrap";
import MessageComponent from "../util/messageComponent";

var childObjects = [];
var self;
class DeviceCard extends Component {
    constructor(props, context){
        super(props, context);
        self = this;
        this.state = {
            parentorgid: '13445412',
            deviceid:this.props.location.deviceid,
            deviceName: '',
            refOrganization: '',
            address: '',
            email: '',
            name: '',
            lng: '',
            ltd: '',
            addhour: '',
            status: 'null'
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeRefOrgID = this.handleChangeRefOrgID.bind(this);
        this.save = this.save.bind(this);

    }
    componentDidMount(){
        var url = "http://localhost:6013/device-details?deviceid=" + this.props.location.deviceid
        axios.get(url).then(function (response) {
            self.setState({
                deviceName: response.data.devid,
                refOrganization: response.data.orgid,
                address: response.data.address,
                email: response.data.email,
                name: response.data.name,
                lng: response.data.lng,
                ltd: response.data.ltd,
                addhour: response.data.addhour

            })}).catch(function (error) {});

        let urlChildOrgs = "http://localhost:6013/organizations?parentorgid=" + this.state.parentorgid
        axios.get(urlChildOrgs).then(function (response) {
            childObjects = []
            response.data.map((item) => {childObjects.push(<option value={item.id}>{item.id +','+item.organization}</option>)})
        })
    }
    save(){
        var url = "http://localhost:6013/save-device-details"
        axios.post(url, {
            deviceid:this.props.location.deviceid,
            orgid:this.state.refOrganization,
            address: this.state.address,
            email:this.state.email,
            name:this.state.name,
        }).then(function (response) {self.setState({status: 'success'})}).catch(function (error) {});
    }
    delete(){

    }
    handleChange(e) {
        var fieldName = e.target.name;
        this.setState({ [fieldName]: e.target.value });
    }
    handleChangeRefOrgID(e) {
        self.setState({refOrganization: e.target.value});

        console.log('Измененеа привязка к компании: ' +  e.target.value)
    }

    render() {
        return (
            <div>
                <Form style={{width:'800px', padding: '20px'}}>

                    <FormGroup controlId="organizationCard">
                        <FormGroup>
                            <ControlLabel>Устройство:</ControlLabel>
                            <FormControl type="text" value={this.state.deviceName}/>
                        </FormGroup>
                        <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Организация</ControlLabel>
                            <FormControl componentClass="select"
                                         value={this.state.refOrganization}
                                         onChange={this.handleChangeRefOrgID}>
                                {childObjects}
                            </FormControl>
                        </FormGroup>

                        <ControlLabel>Адрес: </ControlLabel>
                        <FormControl type="text"
                                     name="address"
                                     value={this.state.address}
                                     onChange={this.handleChange}/>

                        <ControlLabel>Email:</ControlLabel>
                        <FormControl type="text"
                                     name="email"
                                     value={this.state.email}
                                     onChange={this.handleChange}/>

                        <ControlLabel>Долгота:</ControlLabel>
                        <FormControl type="text"
                                     name="phone"
                                     value={this.state.lng}
                                     onChange={this.handleChange}/>

                        <ControlLabel>Широта:</ControlLabel>
                        <FormControl type="text"
                                     name="contact"
                                     value={this.state.ltd}
                                     onChange={this.handleChange}/>
                        <ControlLabel>Часовой пояс:</ControlLabel>
                        <FormControl type="text"
                                     name="contact"
                                     value={this.state.addhour}
                                     onChange={this.handleChange}/>
                        <ControlLabel>Описание:</ControlLabel>
                        <FormControl type="text"
                                     name="name"
                                     value={this.state.name}
                                     onChange={this.handleChange}/>
                        <hr/>
                        <Button bsStyle="success" bgSize="large" onClick={this.save}>Сохранить</Button>
                        <Button bsStyle="danger" bgSize="large" onClick={this.delete}>Удалить....</Button>
                    </FormGroup>
                </Form>
                <MessageComponent status={this.state.status}/>
            </div>

        )}

}
export default DeviceCard