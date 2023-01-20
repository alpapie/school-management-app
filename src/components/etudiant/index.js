import React,{Component} from "react";
import Header from "./header";

import NoPage2 from "../../403";

class Etudiantindex extends Component{
    constructor(){
        super()
        this.state={
            isLoader:true
        }   
       
    }
    componentDidMount(){
        setTimeout(() => {
         this.setState({isLoader:false})
         }, 2000);
      }
    render(){ 
        let token=localStorage.getItem("token")
        if(token==null ){
            return(<> 
                <NoPage2/>
            </>)
        } else{
        let data=JSON.parse(localStorage.getItem("data"))
        return(
            <>
             <div className="main-wrappers">
               { this.state.isLoader?
                  <div className="preloader">
                        <div className="lds-ripple">
                            <div className="lds-pos"></div>
                            <div className="lds-pos"></div>
                        </div>
                    </div>:null}
                <Header user={data.user}/>
                </div>
            </>
        )
    }
    }
}
export default Etudiantindex