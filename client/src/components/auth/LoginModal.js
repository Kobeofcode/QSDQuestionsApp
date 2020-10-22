import React from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Label,
    Input,
    FormGroup,
    NavLink,
    Alert
} from "reactstrap";
import { useState,useEffect } from "react";
import { login } from "../../actions/authActions"
import { connect } from "react-redux"
import {clearErrors} from "../../actions/errorActions"
import { useCallback } from "react";


const LoginModal = ({isAuthenticated,
    error,
    login,
    clearErrors})=>{



const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [msg, setMsg] = useState(null);
const [modal,setModal]=useState(false)
const toggle= useCallback(()=>{
    //clear errors
    clearErrors()
    //setState({modal:!state.modal})
    setModal(!modal)
},[clearErrors,modal])


     
     
 
    function onChangeEmail (e) {
        e.preventDefault();
        setEmail(e.target.value)
    }
    function onChangePassowrd (e) {
        e.preventDefault();
        setPassword(e.target.value)
    }  
     
     let onSubmit = e=>{
        e.preventDefault()

        
        
       const user = {
           email,
           password
       }
       //Try to login
       login(user);
    }
    
    useEffect(()=>{
    
        if(error.id === "LOGIN_FAIL"){
            setMsg(error.msg.msg)
        }else{
            setMsg(null);
        }

    
    // If authenticated, close modal
    if (modal) {
        if (isAuthenticated) {
          toggle();
        }
      }
        
    },[error,toggle,isAuthenticated,modal])
   
    

    return(
        <div>
            <NavLink onClick={toggle} href="#">
                Login
            </NavLink>
            <Modal
            isOpen={modal}
            toggle={toggle}
            >
                <ModalHeader toggle={toggle} >Login</ModalHeader>
                <ModalBody>
                    {msg ? <Alert color="danger">{msg}</Alert>:null}
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            
                            <Label for="email">Email</Label>
                             <Input
                                    
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="mb-3"
                                    onChange={onChangeEmail}
                                    />
                            <Label for="password">Password</Label>
                        
                        
                            <Input
                                    
                                    type="text"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className="mb-3"
                                    onChange={onChangePassowrd}
                                    />
                    
                            <Button
                            color="dark"
                            style={{marginTop: "2rem"}}
                            block                            
                            >Login</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}


const mapStateToProps = (state)=>({
    error:state.error,
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login,clearErrors})(LoginModal);