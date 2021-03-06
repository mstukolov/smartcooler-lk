/**
 * Created by MAKS on 29.08.2017.
 */
import React, {Component} from 'react';
import { YMaps, Map, GeoObject, Placemark } from 'react-yandex-maps';
import axios from 'axios';
import RootUrl from "../../config/config";


const mapState = { center: [55.76, 37.64], zoom: 10 };

var placemarks = []
var self;
class YandexmapsComponent extends Component {

    constructor(){
        super();
        self = this;
        this.state = {
            parentorgid: window.localStorage.getItem('c2m_orgid'),
            width: '100%', height: '1100', showMap: true,
            devicePoints: []
        }
    }
    componentDidMount(){
        let urlChildOrgs = RootUrl.ROOT_URL_PRODUCTION + "/devices?parentorgid=" + this.state.parentorgid
        placemarks = [];
        axios.get(urlChildOrgs).then(function (response) {
            response.data.map((item) =>
            {
                placemarks.push(
                    <Placemark
                        geometry={{coordinates: [item.ltd, item.lng]}}
                        properties={{balloonContent: [item.devid]}}
                    />
                )
            })
            self.setState({devicePoints: placemarks})
        })
    }
    render() {
        return (
            <div>
                    <YMaps>
                        <div id="map-basics">
                            <Map state={mapState} width={this.state.width} height={this.state.height}>
                                {this.state.devicePoints}
                            </Map>

                        </div>
                    </YMaps>
            </div>
        )
    }
}
export default YandexmapsComponent