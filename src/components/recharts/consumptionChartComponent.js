/**
 * Created by MAKS on 28.08.2017.
 */

import React, {Component} from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


class ConsumptionChartComponent extends Component {

    constructor() {
        super();
    }

    render(){
        return(
            <div>
                <h3>{this.props.chartName}</h3>
                {
                    this.props.data.length > 0
                        ? <ComposedChart  width={this.props.width} height={this.props.height} data={this.props.data}
                                          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                <XAxis dataKey={this.props.dataKey}/>
                                <YAxis orientation="left" padding={{ top: 20, bottom: 20 }}/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip/>
                                <Legend />
                                <Bar dataKey='valuein' name='Пополнение' barSize={this.props.barSize} fill='#99ccff'/>
                                <Line type="monotone" name='Потребление' dataKey="valueout" stroke="#0000ff"/>
                        </ComposedChart >
                        : <h4>Отсутствуют данные для построения графика</h4>
                }



            </div>
        )
    }

}

export default ConsumptionChartComponent;