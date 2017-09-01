/**
 * Created by MAKS on 01.09.2017.
 */
'use strict'
import React, {Component} from 'react';
import axios from 'axios';
import {FormGroup, ControlLabel, FormControl, Button} from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker"
import MessageComponent from "../util/messageComponent";

var self;
class DeviceCard extends Component {
    constructor(props, context){
        super(props, context);
        self = this;
        this.state = {
            deviceDetails: '',
            deviceid:this.props.location.deviceid,
            refOrganization: '',
            status: 'null'
        }

        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);

    }
    componentDidMount(){
        var url = "http://localhost:6013/device-details?deviceid=" + this.props.location.deviceid
        axios.get(url).then(function (response) {
            self.setState({
                deviceDetails: response.data,
                refOrganization: response.data.org

            })}).catch(function (error) {});
    }
    save(){
        var url = "http://localhost:6013/save-device-details"
        axios.post(url, {
            deviceid:this.props.location.deviceid,
            email:this.state.deviceDetails.email,
            name:this.state.deviceDetails.name,
        }).then(function (response) {self.setState({status: 'success'})}).catch(function (error) {});
    }
    delete(){

    }
    handleChange(e) {
        var fieldName = e.target.name;
        this.setState({ deviceDetails: {[fieldName]: e.target.value }});
    }
    render() {
        return (
            <div>
                <form style={{width:'800px', padding: '20px'}}>
                    <FormGroup controlId="organizationCard">
                        <FormGroup>
                            <ControlLabel>Устройство:</ControlLabel>
                            <FormControl type="text" value={this.state.deviceDetails.devid}/>
                        </FormGroup>
                        <ControlLabel>Название Организации</ControlLabel>
                        <FormControl type="text"
                                     name="organization"
                                     value={this.state.refOrganization.organization}
                                     onChange={this.handleChange}/>
                        <ControlLabel>Адрес: </ControlLabel>
                        <FormControl type="text"
                                     name="address"
                                     value={this.state.deviceDetails.address}
                                     onChange={this.handleChange}/>

                        <ControlLabel>Email:</ControlLabel>
                        <FormControl type="text"
                                     name="email"
                                     value={this.state.deviceDetails.email}
                                     onChange={this.handleChange}/>

                        <ControlLabel>Долгота:</ControlLabel>
                        <FormControl type="text"
                                     name="phone"
                                     value={this.state.deviceDetails.lng}
                                     onChange={this.handleChange}/>

                        <ControlLabel>Широта:</ControlLabel>
                        <FormControl type="text"
                                     name="contact"
                                     value={this.state.deviceDetails.ltd}
                                     onChange={this.handleChange}/>
                        <ControlLabel>Часовой пояс:</ControlLabel>
                        <FormControl type="text"
                                     name="contact"
                                     value={this.state.deviceDetails.addhour}
                                     onChange={this.handleChange}/>
                        <ControlLabel>Описание:</ControlLabel>
                        <FormControl type="text"
                                     name="name"
                                     value={this.state.deviceDetails.name}
                                     onChange={this.handleChange}/>
                        <hr/>
                        <Button bsStyle="success" bgSize="large" onClick={this.save}>Сохранить</Button>
                        <Button bsStyle="danger" bgSize="large" onClick={this.delete}>Удалить....</Button>
                    </FormGroup>
                </form>
                <MessageComponent status={this.state.status}/>
            </div>

        )}

}
export default DeviceCard