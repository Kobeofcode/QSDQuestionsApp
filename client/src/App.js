import React from "react";
import AppNavbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css"; 
import {BrowserRouter,Route} from "react-router-dom";
import Home from "./components/Homepage"
import Questions from "./components/QuestionsModule";
import { Provider } from "react-redux";
import store from "./redux/store"
import { useEffect } from "react";
import { loadUser } from "./actions/authActions";
import Profile from "./components/Profile"
const App = ()=>{
  useEffect(()=>{
    //Konstantno da loada usera i da checkira token da li je tu
    //token ce provjeravati email
    //ne otvara bilo koji token putanju
    store.dispatch(loadUser())
  },[])
  
  
  return(
    <Provider store={store}>
      <BrowserRouter>
         <div>
        <AppNavbar />
        <Route exact path="/" component={Home}></Route>
        <Route  path="/questions" component={Questions}></Route>
        <Route  path="/profile" component={Profile}></Route>
        
        </div>
    
    
      </BrowserRouter>
    </Provider>
  )
}


export default App;