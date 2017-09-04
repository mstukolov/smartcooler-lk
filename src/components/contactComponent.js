/**
 * Created by MAKS on 23.08.2017.
 */
import React, {Component} from 'react';
import {Form} from "react-bootstrap";
var Background = '../images/floating_particles.jpg';


var sectionStyle = {
    width: "100%",
    height: "100%",
    //backgroundImage: 'url(' + Background + ')'
};


class ContactComponent extends Component {

    render() {
        return (
            <div style={ sectionStyle }>
                <h1>Контактная информация</h1>
                <Form style={{width:'800px', padding: '20px'}}>
                    <h4>Email: info@center2m.ru</h4>
                    <h4>Телефон: +7 (499) 754-07-77</h4>
                    <h4>Адрес: Пречистенская наб. 17, Москва,119034, Россия</h4>
                </Form>
            </div>
        )}
}

export default ContactComponent