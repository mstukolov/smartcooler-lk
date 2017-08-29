/**
 * Created by MAKS on 29.08.2017.
 */
import React, {Component} from 'react';
import { YMaps, Map } from 'react-yandex-maps';
const mapState = { center: [55.76, 37.64], zoom: 10 };


class YandexmapsComponent extends Component {
    state = { width: '100%', height: '1100', showMap: true };
    render() {
        return (
            <div>
                <YMaps>
                    <div id="map-basics">
                        <Map state={mapState} width={this.state.width} height={this.state.height}/>

                    </div>
                </YMaps>

            </div>
        )
    }
}
export default YandexmapsComponent