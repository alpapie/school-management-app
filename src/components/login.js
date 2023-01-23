import React ,{useState}from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";

function Login(){
    const [state, setState] = useState({
        isLoader:true,
        dberrror:false
    })
    const history=useNavigate()
    const { register, handleSubmit,formState:{ errors } } = useForm();
    setTimeout(() => {
        setState({isLoader:false})
    }, 2000);
    async function  onSubmit(data){
       await axios.post("https://sc.edep.sn/api/login",data)
        .then(async res =>{
            console.log(res.data)
            if(res.data.status){
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("data",JSON.stringify(res.data));
                console.log(res.data);
                if (res.data.user){
                    history("/admin")
                }  
            } else{
                setState({dberrror:true})
            }
        })
        .catch(async error=>{
            console.log(error)
        })
    }
        return(
            <>
            <div className="main-wrappers" >
               { state.isLoader?<div className="preloader">
                    <div className="lds-ripple">
                        <div className="lds-pos"></div>
                        <div className="lds-pos"></div>
                    </div>
                </div>:null}
                <div className="auth-wrappers d-flex no-block justify-content-center align-items-center" style={{background:"url(/assets/images/background/login-register.jpg) no-repeat center center", backgroundSize: "cover"}}>
                    <div className="auth-box p-4 bg-white rounded">
                        <div id="loginform">
                            <div className="logo">
                                <h3 className="box-title mb-3">Se connecter</h3>
                            </div>
                            {state.dberrror && <p className="text-danger">Email ou mot de passe incorrecte</p>}
                            <div className="row">
                                <div className="col-12">
                                    <form className="form-horizontal mt-3 form-material" id="loginform" method="post" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-group mb-3">
                                            <div className="">
                                                {errors.email && <p className="text-danger">{errors.email.message}</p>}
                                                <input className="form-control" type="email" required="" {...register("email",
                                                                                                                       { required: 'veiller entrer votre email',
                                                                                                                        pattern: {
                                                                                                                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                                                                                          message: 'Invalid email address'
                                                                                                                        }})
                                                                                                                    } placeholder="email"/> 
                                            </div>
                                        </div>
                                        <div className="form-group mb-4">
                                            <div className="">
                                            {errors.password && <p className="text-danger">{errors.password.message}</p>}
                                                <input className="form-control" type="password" min={8} required="" {...register("password",{required:"veiller entrer un password",min:{
                                                    value: 8,
                                                    message: 'mot de passe trop court'
                                                }})} placeholder="Password"/> 
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="d-flex">
                                                <div className="checkbox checkbox-info pt-0">
                                                    <input id="checkbox-signup" type="checkbox" className="material-inputs chk-col-indigo"/>
                                                    <label htmlFor="checkbox-signup" style={{fontSize:"15px"}}> Se souvenir de moi</label>
                                                </div> 
                                                <div className="ml-auto">
                                                    <a href="/mot-passe-oublier" id="to-recover" className="text-muted float-right"><i className="fa fa-lock mr-1"></i> Mot de passe oublier</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group text-center mt-4">
                                            <div className="col-xs-12">
                                                <button className="btn btn-info btn-lg btn-block text-uppercase" type="submit">Se connecter</button>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-12 col-md-12 mt-2 text-center">
                                                <div className="social mb-3">
                                                    <a href="" className="btn  btn-facebook mr-2" data-toggle="tooltip" title="Login with Facebook"> <i aria-hidden="true" className="fab fa-facebook-f"></i> </a>
                                                    <a href="" className="btn btn-googleplus" data-toggle="tooltip" title="Login with Google"> <i aria-hidden="true" className="fab fa-google-plus"></i> </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group mb-0 mt-4">
                                            <div className="col-sm-12 justify-content-center d-flex">
                                                <p>J'ai pas de compte? <a href="/registrer" className="text-info font-weight-normal ml-1">S'inscrire</a></p>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
      );
}

export default Login