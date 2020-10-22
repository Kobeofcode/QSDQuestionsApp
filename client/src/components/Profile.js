import React from "react"
import { Jumbotron} from 'reactstrap';
import { useSelector, connect,useDispatch } from "react-redux";
import service from "../Service/service";
import { useState } from "react";
import {
    Button,
    Form,
    Label,
    Input, 
} from "reactstrap";
import { useEffect } from "react";
import { loadUser } from "../actions/authActions";

const Profile = ({user})=>{
    let dispatch = useDispatch()
    let userid = useSelector(state=>state.auth.userID)
    let [passState,setPassState] = useState("")
    let [passForm,setPassForm] = useState(false)
    let [errMsg,setErrorMsg] = useState("")
    const showForm = () => {
        return (
          <div> 
         <Form id= "add-app" onSubmit={onSubmitPass}>
     
              <Label>Provide a new Password</Label>
              <Input type="text" onChange={onChangePass}></Input>
              <Button color="primary" size="sm">Confirm</Button>
           </Form>
           </div>
          );
      }

      const onChangePass = (e)=>{
        e.preventDefault();
        setPassState(e.target.value)
    }
    const onSubmitPass = (e)=>{
        e.preventDefault();
        const newPass = {
            userid:userid,
            password:passState   
        }
        
        const config = {
            headers:{
                "Content-type":"application/json"
            }

        }
        service.changePassword(newPass,config)
            .then(res=>setErrorMsg(res))
        setPassState(false)
    }
   useEffect(()=>{
       if(userid === null){
           dispatch(loadUser())
       }
   })
    return(
        <div>
          <Jumbotron>
            <p>{errMsg? errMsg:""}</p>
             <h1 className="display-3">Hello {user.user.name} </h1>
            <p className="lead">You are are logged in under </p>
                    <hr className="my-2" />
                <p>The registered Email is </p>
             <p className="lead">
                  <Button color="primary" onClick={()=>{setPassForm(!passForm)}} >Change Password</Button>
                </p>
                {passForm ? showForm() : ""}
      </Jumbotron>
    </div>
    )
}

const mapStateToProps=state=>({
    user:state.auth.user
})

export default connect(mapStateToProps,null)(Profile);