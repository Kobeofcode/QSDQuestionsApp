import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REMOVE_ITEM
} from "../redux/types"
import axios from "axios";
import { returnErrors } from "./errorActions";
//Check token and load user
export const loadUser = ()=>(dispatch,getState)=>{
   
    const token = getState().auth.token;
   
    const config = {
        headers:{
            "Content-type":"application/json"
        }
    }
    //if token add to headers tj ako je logged in 
    if(token){
        config.headers["x-auth-token"]= token;
    }

    dispatch({type: USER_LOADING});
    axios.get("/api/auth/user",config)
        .then(res=>dispatch({
            type:USER_LOADED,
            payload:res.data
        }))
        .catch(err=>{
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type:AUTH_ERROR
            })
        })

}

//Login user
export const login = ({email,password})=>dispatch=>{
    const config = {
        headers:{
            "Content-type":"application/json"
        }
    }
    //Request body
    const body = JSON.stringify({email,password})
    axios.post("http://localhost:5000/api/auth",body,config)
        .then(res=>dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
    }))
        .catch(err=>{
             dispatch(returnErrors(err.response.data,err.response.status,"LOGIN_FAIL"))
             dispatch({
                 type:LOGIN_FAIL
        })
    })
}


//Logout
export const logout = ()=>dispatch=>{
    dispatch({
        type:LOGOUT_SUCCESS
    })
}
//delete ITem
//nece da radi zbog thunk 
export const deleteItem =(id)=>(getState,dispatch)=>{
    const token = getState().auth.token;
   
    const config = {
        headers:{
            "Content-type":"application/json"
        }
    }
    //if token add to headers
    if(token){
        config.headers["x-auth-token"]= token;
    }
    axios
        .delete(`api/posts/${id}`,config)
        .then(res=>dispatch({
            type:REMOVE_ITEM,
            payload:id
        }))
        .catch(err=>returnErrors(err.response.data,err.response.status))
}

 //Register user
 export const register = ({name,email,password})=>dispatch=>{
    const config = {
        headers:{
            "Content-type":"application/json"
        }
    }
    //Request body
    const body = JSON.stringify({name,email,password})
    axios.post("/api/users",body,config)
        .then(res=>dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
    }))
        .catch(err=>{
             dispatch(returnErrors(err.response.data,err.response.status,"REGISTER_FAIL"))
             dispatch({
                 type:REGISTER_FAIL
        })
    })
}




