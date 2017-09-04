/**
 * Created by MAKS on 23.08.2017.
 */
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, Form} from "react-bootstrap";

class OrderdeviceComponent extends Component {

    render() {
        return (
            <div>
                <h1>Заказ нового оборудования</h1>
                <FormExample/>
            </div>
        )}
}

export default OrderdeviceComponent

const FormExample = React.createClass({
    getInitialState() {
        return {
            value: ''
        };
    },

    getValidationState() {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
    },

    handleChange(e) {
        this.setState({ value: e.target.value });
    },

    render() {
        return (
            <Form style={{width:'800px', padding: '20px'}}>
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}>
                    <ControlLabel>Контактные данные</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.value}
                        placeholder="Enter text"
                        onChange={this.handleChange}
                    /><HelpBlock>ФИО заявителя</HelpBlock>

                        <ControlLabel>Текст обращения</ControlLabel>
                        <FormControl componentClass="textarea" placeholder="textarea" />
                        <HelpBlock>Текст обращения в свободной форме</HelpBlock>
                    <FormControl.Feedback />

                </FormGroup>
                <Button type="submit" bsStyle="success" bgSize="large">
                    Отправить заказ
                </Button>
            </Form>
        );
    }
});