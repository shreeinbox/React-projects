import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import Login from './Login'
import Logout from './Logout'
import Home from './Home'
import { Redirect, Route, Switch, Link } from "react-router-dom"

class Header extends React.Component{

    constructor(props){ 
        //super() construtor of base class i.e component class should be called to use 'this' keyword
        //this is keyword that refers to the current instance of the object
        // const obj = new class()  and this refers to obj, the current object
        //if you need to use this.props, call super(props) 
        super(props);
        this.state = { loggedUser: "",
                       bLoggedIn: false,
                       sLoggedToken: ""      
                    }
    
        this.getActiveUser = (sUser, bIn, sToken) => {
            this.setState({
                            loggedUser: sUser,
                            bLoggedIn: bIn,
                            sLoggedToken: sToken 
                        })
        }
      }


//we can add a logo to navbar.brand which we can do later.
    render(){
        return(
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand as={Link} to='/'>Super Simple Lessons</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to='/home'>Home</Nav.Link>
                            <Nav.Link as={Link} to='/login'>Login</Nav.Link>

                            <Nav.Link href="#link">SignUp</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                            { this.state.bLoggedIn &&  
                                <Nav.Link as={Link} to='/logout'>Logout {this.state.loggedUser}</Nav.Link> }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div>
                    <Switch>
                        <Route path='/login' 
                        exact
                        render = {(props)=>(this.state.bLoggedIn ? <Redirect to="/home" /> :  
                            <>
                                <Login usr={this.getActiveUser}/>
                            </>
                        )}
                        />
                        <Route exact path='/home' component={Home}></Route>
                        <Route path='/logout' 
                        exact 
                        render = {(props) => 
                            <>
                                <Logout tok={this.state.sLoggedToken} resetUsr={this.getActiveUser}/>
                            </>
                        }
                        />       
                        {console.log('user logged in: ' + this.state.loggedUser)}
                        {console.log('user logged in: ' + this.state.bLoggedIn)}
                        {console.log('token logged in: ' + this.state.sLoggedToken)}
                    </Switch>
                </div>
            </div>
        )
    }

}

export default Header;