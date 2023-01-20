import React,{Component} from "react";



class ForgotPwd extends Component{
    constructor(){
        super()
        this.state={
            isLoader:true
        }
        setTimeout(() => {
            this.setState({isLoader:false})
        }, 2000);
    }

    render(){
        return(
            <>
            <div className="main-wrapper">
            { this.state.isLoader?<div className="preloader">
                    <div className="lds-ripple">
                        <div className="lds-pos"></div>
                        <div className="lds-pos"></div>
                    </div>
                </div>:null}
                <div className="auth-wrapper d-flex no-block justify-content-center align-items-center" style={{background:"url(/assets/images/background/login-register.jpg) no-repeat center center", backgroundSize: "cover"}}>
                    <div className="auth-box p-4 bg-white rounded">
                        <div>
                            <div className="logo">
                                <h3 className="mb-3">Recover Password</h3>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <form className="form-horizontal mt-3 form-material" action="index.html">
                                        <div className="form-group row mb-3">
                                            <div className="col-12">
                                                <input className="form-control" type="text" required="" placeholder="Name"/>
                                            </div>
                                        </div>
                                        <div className="form-group row mb-3">
                                            <div className="col-12">
                                                <input className="form-control" type="text" required="" placeholder="Email"/>
                                            </div>
                                        </div>
                                        <div className="form-group text-center">
                                            <div className="col-xs-12">
                                                <button className="btn btn-block btn-lg btn-info" type="submit">RESET</button>
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <a href="/" className="btn btn-block btn-lg btn-dark" type="submit">Back</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }

}
export default ForgotPwd