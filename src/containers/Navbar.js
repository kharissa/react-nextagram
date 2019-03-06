import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Logo from '../images/icons8_instagram.png'
import LoginModal from './Login'
import RegisterModal from './Register'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'


export default class NavHeader extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.showRegisterModal = this.showRegisterModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.showLoginModal = this.showLoginModal.bind(this);
        this.state = {
            show: false,
            isLogin: false,
            isRegister: false
        };
    }
    handleClose(state) {
        this.setState({
            show: false,
            isLogin: false,
            isRegister: false,
        });
    }

    showRegisterModal() {
        this.setState({
            isRegister: true,
            isLogin: false,
        });
    }
    //
    showLoginModal() {
        this.setState({
            isLogin: true,
            isRegister: false,
        });
    }

    handleLogout() {
        localStorage.clear();
    }

    render(){
        const currentUsername = localStorage.getItem('username');

        return(
            <div>
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top">
                    <Navbar.Brand href="/">
                    <img
                        alt="Nextagram logo"
                        src={Logo}
                        width="35"
                        height="35"
                        className="d-inline-block mr-2"
                    />
                    <span className="brand-name">Nextagram</span></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            {
                                localStorage.getItem('token') ?
                                    <DropdownButton id="dropdown-user-menu" variant="secondary" title={` @${currentUsername} `}>
                                        <Dropdown.Item href="/profile">My Profile</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item href="/" onClick={this.handleLogout}>Log Out</Dropdown.Item>
                                    </DropdownButton>
                                    :
                                    <div>
                                        <Button variant="outline-primary" className="mr-2 btn-login" onClick={this.showLoginModal}>Login</Button>
                                        <Button className="btn-nextagram mr-2" onClick={this.showRegisterModal}>Register</Button>
                                    </div>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <LoginModal show={this.state.isLogin} onHide={this.handleClose} isRegister={this.showRegisterModal}/>
                <RegisterModal show={this.state.isRegister} onHide={this.handleClose} isLogin={this.showLoginModal}/>
            </div>
        )
    }
}

