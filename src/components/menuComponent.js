/**
 * Created by MAKS on 22.08.2017.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import axios from 'axios';
import RootUrl from "../config/config";

const navbarCompany = {color: '#c0c3c6', fontSize:24};
const navbar = {color: '#c0c3c6', fontSize:18};
const navbarRight = {color: '#c0c3c2', fontSize:14};

var self;
class MenuComponent extends Component {

    constructor() {
        super();
        self = this;
        this.state = {organization: 'undefined'}
    }
    componentDidMount(){
        var url = RootUrl.ROOT_URL_PRODUCTION + "/organization-details?orgid=" + window.localStorage.getItem('c2m_orgid')
        axios.get(url).then(function (response) {
            self.setState({organization: response.data.organization})}).catch(function (error) {});
    }
    render() {
        return (
            <div>
                    <Navbar inverse collapseOnSelect>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to="/" style={navbarCompany}>{self.state.organization}</Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                                <NavItem eventKey={1}>
                                    <Link to="/reports" style={navbar}>Анализ потребления</Link>
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
                                <NavItem eventKey={1} style={navbarRight} href="#">
                                    {localStorage.getItem('c2m_login')}
                                </NavItem>
                                <NavItem eventKey={2}>
                                    <Link to="/logout" style={navbarRight}>Выйти</Link>
                                </NavItem>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>

            </div>
        )}
}

export default MenuComponent