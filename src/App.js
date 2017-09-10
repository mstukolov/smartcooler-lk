import React, { Component, PropTypes } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import MenuComponent from "./components/menuComponent";
import YandexmapsComponent from "./components/geo/yandexmapsComponent";
import DevicesComponent from "./components/devicesComponent";
import Login from './components/auth/login';
import ReportsComponent from "./components/reportsComponent";
import CustomersComponent from "./components/customersComponent";
import OrderdeviceComponent from "./components/orderdeviceComponent";
import ContactComponent from "./components/contactComponent";
import SupportComponent from "./components/supportComponent";
import ReplenishmentComponent from "./components/replenishment/replenishmentComponent";
import SchedulereplenishmentComponent from "./components/replenishment/schedulereplenishmentComponent";
import OrganizationCard from "./components/customers/organizationCard";
import DeviceCard from "./components/devices/deviceCard";
import FullfillmentComponent from "./components/reports/fullfillmentComponent";
import Logout from "./components/auth/logout";

import {Route} from 'react-router-dom';



class App extends Component {


    componentDidMount(){

    }

  render() {
    return (

      <div className="App">

        {window.localStorage.getItem('c2m_authorized') === 'true' ? <MenuComponent/> : ''}

              <Route exact path="/" component={isAuth(YandexmapsComponent)}/>
              <Route exact path="/reports" component={isAuth(ReportsComponent)}/>
              <Route path="/replenishment" component={isAuth(ReplenishmentComponent)}/>
              <Route path="/schedule-replenishment" component={isAuth(SchedulereplenishmentComponent)}/>
              <Route path="/devices" component={isAuth(DevicesComponent)}/>
              <Route path="/customers" component={isAuth(CustomersComponent)}/>
              <Route path="/order-new-device" component={isAuth(OrderdeviceComponent)}/>
              <Route path="/contact" component={isAuth(ContactComponent)}/>
              <Route path="/support" component={isAuth(SupportComponent)}/>
              <Route path="/orgcard" component={isAuth(OrganizationCard)}/>
              <Route path="/devicecard" component={isAuth(DeviceCard)}/>
                <Route path="/orders-fulfillment" component={isAuth(FullfillmentComponent)}/>
              <Route exact path="/logout" component={Logout}/>

      </div>
    );
  }

}


function isAuth(component) {
  if(window.localStorage.getItem('c2m_authorized') === 'true')
      {
        return component
      }
  else {
    return Login
  }
}

App.contextTypes = {
    router: PropTypes.object.isRequired
}
export default App;