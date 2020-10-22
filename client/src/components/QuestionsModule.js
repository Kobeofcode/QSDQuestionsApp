import React,{useEffect} from "react";
import { useState } from "react"
import {ADD_NEW_ITEM,GET_ITEMS,REMOVE_ITEM} from "../redux/types"
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Label,
    Input, 
    FormGroup,
    Container,
    ListGroup,
    ListGroupItem
} from "reactstrap";
import service from "../Service/service"
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup} from "react-transition-group";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteItem} from "../actions/authActions"
import axios from "axios"
import { returnErrors } from "../actions/errorActions"

const Questions = ({auth,comments})=>{
    const history = useHistory();
    const pitanje = useSelector(state=>state.item.items)
    const komentari = useSelector(state=>state.item.comments)
    const [questionModal,setQuestionModal] = useState(false)
    const [question,setQuestion]= useState("")
    const [formState,setFormState] = useState(false)
    const [comment,setComment] = useState("");
    const [questionId,setQuestionId] = useState("")
    const dispatch = useDispatch();
    const token = useSelector(state=>state.auth.token)


    const handleDelete = (id) => {
        console.log("id za brisati" + id)
        
   
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
        history.push("/")
      };
    const toggle = ()=>{
        setQuestionModal(!questionModal)
    }
    
    const onChange = (e)=>{
        e.preventDefault();
        setQuestion(e.target.value)
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        const newQuestion = {
            score:0,
            viewCount:0,
            question:question,
            ownerUserid:auth
        }
        const config = {
            headers:{
                "Content-type":"application/json"
            }
        }
        if(token){
            config.headers["x-auth-token"]= token;
        }
        service.addQuestiontoDB(newQuestion,config)
            .then(res=>dispatch({
                type: ADD_NEW_ITEM,
                payload:res.data
            }))
        toggle()


    }
    const body = JSON.stringify({auth});
    
    useEffect(()=>{
        if(auth === null){
            history.push("/")
        }
        // Headers
    const config = {
        headers: {
         'Content-Type': 'application/json'
     }
    };
        
        service.fetchSpecificDataFromServer(body,config)
            .then(res=>dispatch({
                type: GET_ITEMS,
                payload: res.data
            }))

           
    },[dispatch,body,komentari])

    //Adding to state

    const onChangeComment = (e)=>{
        e.preventDefault();
        setComment(e.target.value)
    }
    


    //Adding new comment
    const onSubmitComment = (e)=>{
        e.preventDefault();
        const newComment = {
            content:comment,
            user:auth,
            post:questionId
            
        }
        console.log(newComment)
        const config = {
            headers:{
                "Content-type":"application/json"
            }

        }
        service.addCommenttoDB(newComment,config)
            .then(res=>dispatch({
                type: ADD_NEW_ITEM,
                payload:res.data
            }))
        setFormState(false)


    }
    const showForm = () => {
        return (
          <div> 
         <Form id= "add-app" onSubmit={onSubmitComment}>
     
              <Label>Provide an answer</Label>
              <Input type="text" onChange={onChangeComment}></Input>
              <Button color="primary" size="sm">Comment</Button>
           </Form>
           </div>
          );
      }
      

    return(
        <div>
            <Button color="info" size="sm" onClick={toggle}>Ask Question</Button>
            <Modal
            isOpen={questionModal}
            toggle={toggle}
            >
                <ModalHeader toggle={toggle} >Ask New Question</ModalHeader>
                <ModalBody>
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="item">Question</Label>
                                <Input
                                type="text"
                                name="name"
                                id="item"
                                placeholder="Ask new question"
                                onChange={onChange}/>
                            <Button
                            color="dark"
                            style={{marginTop: "2rem"}}
                            block                            
                            >Ask Question</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>


            <Container >
            <ListGroup>
                <TransitionGroup className="Question-listing">
                    {pitanje.map(item=>
                    <CSSTransition key={item._id} /*timeout={500}*/ classNames="fade">
                        <ListGroupItem >
                        
                         
                            {item.body}
                            <Button className="remove-btn float-right" color="info" size="sm" >Edit</Button>
                            <Button className="remove-btn float-right" color="danger" size="sm"  onClick={() => {handleDelete(item._id)}} >Delete</Button>
                            <Button size="sm" className="btn btn-sm remove-btn float-right" color="warning" size="sm"  onClick={()=>{setQuestionId(item._id);setFormState(!formState)}} >Reply</Button>
                        </ListGroupItem>
                    </CSSTransition>
                        )}
                </TransitionGroup>
                {formState ? showForm():""}
            </ListGroup>
        </Container>
           <Container>
               <ListGroup>

                        {comments.map(subarray=>subarray.comments.map(it=>(
                            <CSSTransition key={it._id} /*timeout={500}*/ classNames="fade">
                            <ListGroupItem >
                                {it.content}
                            
                            </ListGroupItem>
                            </CSSTransition>
                        )))}
                         
               </ListGroup>
               
           </Container>
            
        </div>
    )
}
const mapStateToProps = (state)=>({
    auth:state.auth.userID,
    comments:state.item.items
})
//Kada dodje autentikacija dodati dugme iznad item body
export default connect(mapStateToProps,null)(Questions);