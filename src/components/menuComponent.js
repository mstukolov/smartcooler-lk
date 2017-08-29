/**
 * Created by MAKS on 22.08.2017.
 */
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import ReportsComponent from "./reportsComponent";
import DevicesComponent from "./devicesComponent";
import CustomersComponent from "./customersComponent";
import OrderdeviceComponent from "./orderdeviceComponent";
import ContactComponent from "./contactComponent";
import SupportComponent from "./supportComponent";
import ReplenishmentComponent from "./replenishmentComponent";
import YandexmapsComponent from "./geo/yandexmapsComponent";

const navbar = {color: '#c0c3c6', fontSize:18};

class MenuComponent extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <Router>
                    <div style={{textAlign:"left"}}>
                        <Navbar inverse collapseOnSelect>
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <Link to="/" style={navbar}>Клиентский портал</Link>
                                </Navbar.Brand>
                                <Navbar.Toggle />
                            </Navbar.Header>
                            <Navbar.Collapse>
                                <Nav>
                                    <NavItem eventKey={1}>
                                        <Link to="/reports" style={navbar}>Отчеты потребления</Link>
                                    </NavItem>
                                    <NavItem eventKey={2}>
                                        <Link style={navbar} to="/replenishment">Пополнение</Link>
                                    </NavItem>
                                    <NavItem eventKey={3}>
                                        <Link style={navbar} to="/devices">Оборудование</Link>
                                    </NavItem>
                                    <NavItem eventKey={4}>
                                        <Link style={navbar} to="/customers">Клиенты</Link>
                                    </NavItem>
                                    <NavDropdown eventKey={5} style={navbar} title="Обратная связь" id="basic-nav-dropdown">
                                        <MenuItem eventKey={5.1}>
                                            <Link to="/order-new-device">Заказ нового оборудования</Link>
                                        </MenuItem>
                                        <MenuItem eventKey={5.2}>
                                            <Link to="/contact">Контактная информация</Link>
                                        </MenuItem>
                                        <MenuItem divider />
                                        <MenuItem eventKey={5.3}>
                                            <Link to="/support">Техническая поддержка</Link>
                                        </MenuItem>
                                    </NavDropdown>
                                </Nav>
                                <Nav pullRight>
                                    <NavItem eventKey={1} href="#">Link Right</NavItem>
                                    <NavItem eventKey={2} href="#">Link Right</NavItem>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                        <hr/>
                        {/*<Route path='/' component={Login}>

                        </Route>*/}
                        <Route exact path="/" component={YandexmapsComponent}/>
                        <Route exact path="/reports" component={ReportsComponent}/>
                        <Route path="/replenishment" component={ReplenishmentComponent}/>
                        <Route path="/devices" component={DevicesComponent}/>
                        <Route path="/customers" component={CustomersComponent}/>
                        <Route path="/order-new-device" component={OrderdeviceComponent}/>
                        <Route path="/contact" component={ContactComponent}/>
                        <Route path="/support" component={SupportComponent}/>
                    </div>
                </Router>
            </div>
        )}
}

export default MenuComponent