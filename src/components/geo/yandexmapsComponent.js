/**
 * Created by MAKS on 29.08.2017.
 */
import React, {Component} from 'react';
import { YMaps, Map, GeoObject, Placemark } from 'react-yandex-maps';
import axios from 'axios';
const mapState = { center: [55.76, 37.64], zoom: 10 };

var placemarks = []
class YandexmapsComponent extends Component {

    constructor(){
        super();
        this.state = {
            parentorgid: '13445412',
            width: '100%', height: '1100', showMap: true
        }
       /* placemarks.push(<Placemark
            geometry={{
                coordinates: [55.8273, 37.6012]
            }}
            properties={{
                balloonContent: 'QQQQQ'
            }}
        />);
        placemarks.push(<Placemark
            geometry={{
                coordinates: [55.913167, 37.713099]
            }}
            properties={{
                balloonContent: 'EEEEEEE'
            }}
        />);*/
        let urlChildOrgs = "http://localhost:6013/devices?parentorgid=" + this.state.parentorgid
        axios.get(urlChildOrgs).then(function (response) {
            placemarks = []
            debugger
            response.data.map((item) =>
            {
                placemarks.push(
                    <Placemark
                        geometry={{coordinates: [item.ltd, item.lng]}}
                        properties={{balloonContent: [item.devid]}}
                    />
                )
            })

        })
        debugger
    }
    componentDidMount(){
        /*let urlChildOrgs = "http://localhost:6013/devices?parentorgid=" + this.state.parentorgid
        axios.get(urlChildOrgs).then(function (response) {
            placemarks = []

            response.data.map((item) =>
                {
                    placemarks.push(<Placemark
                        geometry={{coordinates: [55.913167, 37.713099]}}
                        properties={{balloonContent: item.devid}}
                    />)
                })
        })*/
    }
    render() {
        return (
            <div>
                <YMaps>
                    <div id="map-basics">
                        <Map state={mapState} width={this.state.width} height={this.state.height}>
                            {placemarks}
                        </Map>

                    </div>
                </YMaps>

            </div>
        )
    }
}
export default YandexmapsComponent