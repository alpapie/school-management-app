import React,{Component} from "react";

class NoPage2 extends Component{
    render(){
        return(
            <>
            <div className="main-wrappers" >
                <div class="error-box">
                    <div class="error-body text-center">
                        <h1 class="error-title text-danger">403</h1>
                        <h3 class="text-uppercase error-subtitle">ACCESS DENIED ð¤!</h3>
                        <p class="text-muted mt-4 mb-4">GET OUTðð</p>
                        <a href="/" class="btn btn-danger btn-rounded waves-effect waves-light mb-5">Back to home</a> </div>
                </div>
            </div>
            </>
        )
    }
}
export default NoPage2