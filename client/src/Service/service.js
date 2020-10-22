import axios from "axios";




class Service {
    static addQuestiontoDB = (question,config)=>{
        
        return axios.post("http://localhost:5000/api/posts",question,config)
    }
    
    static fetchDataFromServer = ()=>{
        return axios.get("http://localhost:5000/api/posts")
    }
    static fetchSpecificDataFromServer = (body,config)=>{
        return axios.post("http://localhost:5000/api/posts/spec",body,config)
    }
    static deleteQuestionFromServer = (id,config)=>{
       
       return axios.delete(`/api/post/${id}`,config)
    }
    static addCommenttoDB = (newComment,config)=>{
        return axios.post("http://localhost:5000/api/posts/comment",newComment,config)
    }
    static changePassword = (newPassword,config)=>{
        return axios.post("http://localhost:5000/api/users/password",newPassword,config)
    }

}


export default Service;