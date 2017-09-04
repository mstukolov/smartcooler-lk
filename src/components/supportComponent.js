/**
 * Created by MAKS on 23.08.2017.
 */
import React, {Component} from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, Form} from "react-bootstrap";

class SupportComponent extends Component {
    constructor(){
        super();
        this.state = {contacts: ''}
    }
    render() {
        return (
            <div>
                <h1>Отправить запрос на техническую поддержку</h1>
                <Form style={{width:'800px', padding: '20px'}}>
                    <FormGroup
                        controlId="formBasicText">
                        <ControlLabel>Контактные данные</ControlLabel>
                        <FormControl type="text" value={this.state.contacts}
                        /><HelpBlock>ФИО заявителя</HelpBlock>

                        <ControlLabel>Текст обращения</ControlLabel>
                        <FormControl componentClass="textarea" rows="8"/>
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