import react,{ useState, } from "react";
import {useNavigate} from "react-router-dom"
import {useForm} from "react-hook-form"
import axios from "axios";
function Registrers(){

    const [state, setState] = useState({
            isLoader:true,
            dberrror:false
        })
    const history=useNavigate()
    const { register, handleSubmit,watch,formState:{ errors } } = useForm();
    setTimeout(() => {
        setState({isLoader:false})
    }, 2000);
    function onSubmit(data){
        if (data){
            //envoi des donnee a l'api
            axios.post("https://sc.edep.sn/api/etudiant",
            data
            ).then( async res=>{
            if(res.data.success){
                await console.log(res.data)
                history("/")
            }
            }).catch( async error =>{
            if (error){
            await console.log(error)
            setState({dberrror:true})
            }
            })
        }
    }
        return(
            <>
                <div className="main-wrappers" >
                    { state.isLoader?<div cl="preloader">
                        <div className="lds-ripple">
                            <div className="lds-pos"></div>
                            <div className="lds-pos"></div>
                        </div>
                    </div>:null}
                    <div className="auth-wrappers d-flex no-block justify-content-center align-items-center"  style={{background:"url(/assets/images/background/login-register.jpg) no-repeat center center", backgroundSize: "cover"}}>
                        <div className="auth-box p-4 bg-white rounded">
                            <div>
                                <div className="logo">
                                    <h3 className="box-title mb-3">S'inscrire</h3>
                                </div>
                                <div className="row">
                                    {state.dberrror && <p className="text-danger">erreur lorsde l'enregistrement</p>}
                                    <div className="col-12">
                                        <form className="form-horizontal mt-3 form-material" action="" method="post" onSubmit={handleSubmit(onSubmit)} >
                                            <div className="form-group mb-3">
                                                <div className="col-xs-12">
                                                    {errors.name && <p className="text-danger">veiller entrer votre nom</p>}
                                                    <input className="form-control" type="text" {...register("name",{ required: true })}  placeholder="Name" />
                                                </div>
                                            </div>
                                            <div className="form-group mb-3 ">
                                                <div className="col-xs-12">
                                                {errors.email && <p className="text-danger">veiller entrer votre email</p>}
                                                    <input className="form-control" type="email" {...register("email",{ required: true })} placeholder="Email" />
                                                </div>
                                            </div>
                                            <div className="form-group mb-3 ">
                                                <div className="col-xs-12">
                                                {errors.password && <p className="text-danger">{errors.password.message}</p>}
                                                    <input className="form-control" type="password" {...register("password",{ required: "veiller entrer votre password" ,
                                                                                                                                                pattern: {
                                                                                                                                                    value: /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
                                                                                                                                                    message: 'Le mot de passe doit contenir au moins une lettre majuscule, un chiffre et comporter au moins 8 caractères'
                                                                                                                                                  }})} placeholder="Password" />
                                                </div>
                                            </div>
                                            <div className="form-group mb-3">
                                                <div className="col-xs-12">
                                                    {errors.confpassword && <p className="text-danger">{errors.confpassword.message}</p>}
                                                    <input className="form-control" type="password" {...register("confpassword",{  required: true, validate: (val) => {
                                                                                                                                if (watch('password') !== val) {
                                                                                                                                return "Les mot de passe ne correspondent pas";
                                                                                                                                }
                                                                                                                            }, })} placeholder="Confirm Password" />
                                                </div>
                                            </div>
                                            <div className="form-group mb-3">
                                                <div className="">
                                                    <div className="checkbox checkbox-success pt-0">
                                                        <input id="checkbox-signup" type="checkbox" className="chk-col-indigo material-inputs"/>
                                                        <label htmlFor="checkbox-signup"> J'accepte tous les <a href="#">Terms</a></label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group text-center mb-3">
                                                <div className="col-xs-12">
                                                    <button className="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light" type="submit">S'inscrire</button>
                                                </div>
                                            </div>
                                            <div className="form-group mb-0 mt-2 ">
                                                <div className="col-sm-12 text-center ">
                                                    vous avez deja un compte? <a href="/" className="text-info ml-1 ">Se connecter</a>
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
        )
    }
export default Registrers