/**
 * Created by MAKS on 31.08.2017.
 */
import React, {Component} from 'react';
import {Alert} from "react-bootstrap";

const success = (
    <Alert bsStyle="success">
        <strong>Успех!</strong> Объект успешно сохранен.
    </Alert>
);

const warning = (
    <Alert bsStyle="warning">
        <strong>Ошибка!</strong> При сохранении произошла не предвиденная ошибка.
    </Alert>
);
class MessageComponent extends Component {
    constructor(){
        super();

    }
    render() {
        return (
            <div>

                <Alert bsStyle={this.props.status} style={{width:'800px'}}>
                    {this.props.status === 'success'
                        ? 'Успех!Объект успешно сохранен.' :
                        ''
                    }
                </Alert>

            </div>
        )
    }
}
export default MessageComponent