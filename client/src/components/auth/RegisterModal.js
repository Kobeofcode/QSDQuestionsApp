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
import { register } from "../../actions/authActions"
import { connect } from "react-redux"
import {clearErrors} from "../../actions/errorActions"
import { useCallback } from "react";


const RegisterModal = ({isAuthenticated,
    error,
    register,
    clearErrors})=>{


const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [emailError,setEmailError] = useState("")
const [password, setPassword] = useState('');
const [passwordError,setPasswordError]= useState("")
const [msg, setMsg] = useState({msg:null});
const [modal,setModal]=useState(false)
const toggle= useCallback(()=>{
    //clear errors
    clearErrors()
    //setState({modal:!state.modal})
    setModal(!modal)
    setPasswordError("")
    setEmailError("")
},[clearErrors,modal])
/*const toggle = ()=>{
    setModal(!modal)
    setPasswordError("")
    setEmailError("")
}*/


     
     
 function onChangeName (e) {
        e.preventDefault();
        setName(e.target.value)
    }
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
        if(validate()===true){
            return;
        }else{
        
        
        //User obj
        const newUser = {
            name,
            email,
            password   
            }
        console.log(newUser)
        //attempt register
        register(newUser)
        
    }}
    
    useEffect(()=>{
    
        if(error.id === "REGISTER_FAIL"){
            setMsg({msg:error.msg.msg})
        }else{
            setMsg({msg:null});
        }

    
    // If authenticated, close modal
    if (modal) {
        if (isAuthenticated) {
          toggle();
        }
      }
        
    },[error,toggle,isAuthenticated,modal])
   
    const validate = ()=>{
        let isError = false;
        

        if(password.length < 5){
            isError= true;
            setPasswordError("Password must be at least 5 characters long")
        }
        if(email.indexOf("@") === -1){
            isError= true;
            setEmailError("Please enter a valid email")
        }

        return isError;

    }

    return(
        <div>
            <NavLink onClick={toggle} href="#">
                Register
            </NavLink>
            <Modal
            isOpen={modal}
            toggle={toggle}
            >
                <ModalHeader toggle={toggle} >Register</ModalHeader>
                <ModalBody>
                    {msg.msg ? <Alert color="danger">{msg.msg}</Alert>:null}
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input 
                             
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name"
                                className="mb-3"
                                onChange={onChangeName}
                                
                                />
                        
                        
                            <Label for="email">Email</Label>
                                
                             <Input
                                    
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="mb-3"
                                    onChange={onChangeEmail}
                                    
                                    />
                                    <p>{emailError}</p>
                            <Label for="password">Password</Label>
                             
                        
                            <Input
                                    
                                    type="text"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className="mb-3"
                                    onChange={onChangePassowrd}
                                   
                                    />
                               <p>{passwordError}</p>
                            <Button
                            color="dark"
                            style={{marginTop: "2rem"}}
                            block                            
                            >Register</Button>
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

export default connect(mapStateToProps, {register,clearErrors})(RegisterModal);