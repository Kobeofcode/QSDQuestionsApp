import React,{Fragment} from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from "reactstrap";
import {Link} from "react-router-dom";
import RegisterModal from "../components/auth/RegisterModal"
import LoginModal from "../components/auth/LoginModal"
import { connect } from "react-redux";
import Logout from "../components/auth/Logout"
const AppNavbar =  ({auth})=>{
    /*const [state,setState] = useState({isOpen:false})
    
    const toggle = () => {
        setState({isOpen:!state.isOpen})
    }*/
    const {isAuthenticated, user} = auth;
    const authenticatedLinks=(
        <Fragment>
            <NavItem>
                <span className="navbar-text mr-3">
                    <strong>{user ? `Welcome ${user.user.name}`: ``}</strong>
                </span>
            </NavItem>
            <NavItem><Link className="nav-item nav-link" to="/" >Home</Link></NavItem>
            <NavItem><Link className="nav-item nav-link" to="/questions" >Questions</Link></NavItem> 
            <NavItem><Link className="nav-item nav-link" to="/profile" >Profile</Link></NavItem>
            <NavItem><Logout /></NavItem> 
        </Fragment>

    );
   
    const guestLinks = (
        <Fragment>
             <NavItem><Link className="nav-item nav-link" to="/" >Home</Link></NavItem>
            <NavItem>
             <RegisterModal />
            </NavItem>
            <NavItem>
              <LoginModal />
            </NavItem>
        </Fragment>

    );
    

    return(
        <div>
            <Navbar className="mb-5" color="dark" dark expand="sm">
                <Container>
                    <NavbarBrand href="/">
                        Questions App
                    </NavbarBrand>
                    <NavbarToggler /*onClick={toggle}*//>
                    <Collapse /*isOpen={state.isOpen}*/ navbar>
                        <Nav className="ml-auto" navbar>
                          {isAuthenticated ? authenticatedLinks:guestLinks}
                          
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

const mapStateToProps = state =>({
    auth:state.auth
})


export default connect(mapStateToProps,null)(AppNavbar);