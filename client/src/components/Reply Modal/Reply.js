import React,{ useState } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Label,
    Input, 
    FormGroup,
    NavLink
} from "reactstrap";
import { useDispatch } from "react-redux";
import service from "../../Service/service";
import { ADD_NEW_ITEM } from "../../redux/types";
//
// PROMIJENIO SAM NA STANDARDNU FORMU ALI SAM KOD OSTAVIO
//

const ReplyModal = ()=>{
    const [commentModal,setCommentModal] = useState(false)
    const [comment,setComment]= useState("")
    const dispatch = useDispatch();
    const toggle = ()=>{
        setCommentModal(!commentModal)
    }

    const onChange = (e)=>{
        e.preventDefault();
        setComment(e.target.value)
    }
    const onSubmit = (e,id,user)=>{
        e.preventDefault();
        const newComment = {
            content:comment,
            user:user,
            post:id
            
        }
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
        toggle()


    }
    
        
        
    return(
        <div>
            <NavLink onClick={toggle} href="#">
                Replay
            </NavLink>
            <Modal
            isOpen={commentModal}
            toggle={toggle}
            >
                <ModalHeader toggle={toggle} >Ask New Question</ModalHeader>
                <ModalBody>
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="item">Replay</Label>
                                <Input
                                type="text"
                                name="name"
                                id="item"
                                placeholder="Provide an answer"
                                onChange={onChange}/>
                            <Button
                            color="dark"
                            style={{marginTop: "2rem"}}
                            block                            
                            >Answer</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
            </div>
    )
}


export default ReplyModal;