/**
 * Created by MAKS on 23.08.2017.
 */
import React, {Component} from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, Form} from "react-bootstrap";
import axios from 'axios';
import RootUrl from "../config/config";

var self;
class SupportComponent extends Component {
    constructor(){
        super();
        self = this;
        this.state = {
            contact: '',
            messageText: '',
            mailtype: 'support',
            orgid: window.localStorage.getItem('c2m_orgid')
        }
        this.handleChange = this.handleChange.bind(this);
    }
    sentRequest(){
        var url = RootUrl.ROOT_URL_PRODUCTION + "/send-mail-notification"
        axios.post(url, {
            orgid:self.state.orgid,
            mailtype: self.state.mailtype,
            contact:self.state.contact,
            messageText:self.state.messageText
        }).then(function (response) {
                    console.log(response.data);
        }).catch(function (error) {});
    }
    handleChange(evt){
        this.setState({[evt.target.name]: evt.target.value})
    }
    render() {
        return (
            <div>
                <h1>Отправить запрос на техническую поддержку</h1>
                <Form onSubmit={this.sentRequest} style={{width:'800px', padding: '20px'}}>
                    <FormGroup
                        controlId="formBasicText">
                        <ControlLabel>Контактные данные</ControlLabel>
                        <FormControl name="contact" type="text" onChange={this.handleChange}/>
                        <HelpBlock>ФИО заявителя</HelpBlock>

                        <ControlLabel>Текст обращения</ControlLabel>
                        <FormControl  name="messageText" componentClass="textarea" rows="8" onChange={this.handleChange}/>
                        <HelpBlock>Текст обращения в свободной форме</HelpBlock>
                        <FormControl.Feedback />

                    </FormGroup>
                    <Button type="submit" bsStyle="success" bgSize="large">
                        Отправить запрос
                    </Button>
                </Form>
            </div>
        )}
}

export default SupportComponent