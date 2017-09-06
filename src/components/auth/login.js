/**
 * Created by MAKS on 04.09.2017.
 */
import React, {Component, PropTypes } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import {FormGroup, ControlLabel, FormControl, Button, Col, Form} from "react-bootstrap";

import RootUrl from "../../config/config";

class Login extends Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        const login = e.target.elements[0].value
        const password = e.target.elements[1].value
        window.localStorage.clear()
        window.localStorage.setItem('c2m_login', login)
        window.localStorage.setItem('c2m_password', password)

        let url = RootUrl.ROOT_URL_PRODUCTION + "/check-auth?" +
                    "login=" + login + "&password=" + password;
        var cashed_context = this.context;

        axios.get(url).then(function (response) {

            if(response.data.auth === 'allowed') {
                window.localStorage.setItem('c2m_authorized', true)
                window.localStorage.setItem('c2m_orgid', response.data.orgid)
                cashed_context.router.history.push('/')
            } else {
                window.localStorage.setItem('c2m_authorized', false)
            }
        }).catch(function (error) { debugger; console.log(error)});
    }
    render() {
        return (

                <Form horizontal onSubmit={this.handleSubmit} style={{width:'800px', padding: '20px'}}>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                            Email
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" placeholder="Email" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                        Password
                        </Col>
                        <Col sm={10}>
                        <FormControl type="password" placeholder="Password" />
                        </Col>
                    </FormGroup>

                <FormGroup>
                <Col smOffset={2} sm={10}>
                    <Button type="submit">
                    Sign in
                </Button>
                </Col>
                </FormGroup>
                </Form>
        )
    }
}
Login.contextTypes = {
    router: PropTypes.object.isRequired
}
export default Login