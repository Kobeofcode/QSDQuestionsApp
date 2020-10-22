import React from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import { Fragment } from "react";
import { NavLink } from "reactstrap";

const Logout = ({logout})=>{
    
    return(
        <Fragment>
            <NavLink onClick={logout} href="#">
                Logout
            </NavLink>
        </Fragment>
    );
}



export default connect(null,{logout})(Logout);