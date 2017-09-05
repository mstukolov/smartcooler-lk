/**
 * Created by MAKS on 04.09.2017.
 */
import React, {Component, PropTypes } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {FormGroup, ControlLabel, FormControl, Button, Col, Checkbox, Form} from "react-bootstrap";

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

        if(login === 'maks' && password =='123456'){
            window.localStorage.setItem('c2m_authorized', true)
        }else {window.localStorage.setItem('c2m_authorized', false)}

        this.context.router.history.push('/')
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