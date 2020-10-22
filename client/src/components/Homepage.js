import React from "react";
import { GET_ITEMS } from "../redux/types"
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Container,
    ListGroup,
    ListGroupItem
} from "reactstrap";
import { CSSTransition, TransitionGroup} from "react-transition-group";
import { useEffect } from "react";
import service from "../Service/service"
const Home = ()=>{
    const auth = useSelector(state=>state.auth.isAuthenticated)
    const questions = useSelector(state=>state.item.items)
    const dispatch = useDispatch()
    useEffect(()=>{
        service.fetchDataFromServer()
            .then(res=>dispatch({
                type: GET_ITEMS,
                payload: res.data
            }))
    },[dispatch])

    return(
        <Container >
            <span>Questions Asked Globally</span>
            <ListGroup>
                <TransitionGroup className="Question-listing">
                    {questions.map(item=>
                    <CSSTransition key={item._id} timeout={500} classNames="fade">
                        <ListGroupItem >
                        
                         
                            {item.body}
                            {auth ? <Button size="sm" className="btn btn-sm remove-btn float-right" color="warning" size="sm">Reply</Button>:""}
                        </ListGroupItem>
                    </CSSTransition>
                        )}
                </TransitionGroup>
            </ListGroup>
        </Container>
    )
}


export default Home;