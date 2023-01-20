import React,{Component} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Login from "./components/login";
import ForgotPwd from './components/forgotPwd'
import NoPage from "./404"
import Registrers from "./components/registrer"
import Etudiantindex from "./components/etudiant/index"
import Logout from "./components/logout";
import Adminindex from "./components/admin";

class App extends Component{
  constructor(){
    super()
    this.state={
      isLoader:true,
            }
  }
  componentDidMount(){
    setTimeout(() => {
     this.setState({isLoader:false})
     }, 2000);
  }    
  render(){
    return(
      <>
            <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Login />}/>
                  <Route path="/mot-passe-oublier" element={<ForgotPwd/>} />
                  <Route path="/registrer" element={<Registrers />} />
                  <Route path="/logout" element={<Logout/>} />
                  <Route path="/etudiant/*" element={<Etudiantindex />}/>
                  <Route path="/admin/*" element={<Adminindex/>}/>
                  <Route path="/etudiant/*" element={<NoPage />}/>
                  <Route path="*" element={<NoPage />} />
              </Routes>
            </BrowserRouter>
      </>
    )
  }
    
}
export default App;
