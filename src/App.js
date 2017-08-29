import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import './App.css';

import MenuComponent from "./components/menuComponent";
import YandexmapsComponent from "./components/geo/yandexmapsComponent";

class App extends Component {
  render() {
    return (

      <div className="App">


          <MenuComponent/>

      </div>
    );
  }
}

export default App;