import axios from "axios";
import {useForm} from "react-hook-form"

function Ajouter({getdata,setshowadd,setalert,setalertmessage}){
    const { register, reset,watch,handleSubmit,formState:{ errors } } = useForm();
    async function onSubmitAjou(values){
        if (values){
            //envoi des donnee a l'api
           await axios.post("https://sc.edep.sn/api/etudiant",
            values
            ).then( async res=>{
            if(res.data.success){
                await getdata()
                reset()
                setshowadd(false) 
                 //afficher l'alert
                setalert(true)
                setalertmessage("Etudiant ajouter avec success")
                setTimeout(() => {
                    setalert(false)
                    setalertmessage(null)
                }, 3000)
                }
            }).catch(errors => {
                console.log(errors)
                setalertmessage("Le mail existe deja")
                setalert(true)
                setTimeout(() => {
                    setalert(false)
                    setalertmessage(null)
                }, 3000)
            })
        }
    }
    return(
        <div className="row">
        <div className="col-md-12">
            <div className="card">
                <div className="card-body">
                    <form action="" method="post" onSubmit={handleSubmit(onSubmitAjou)}>
                        <h5 className="card-title">Information personnel</h5>
                        <div className="row">
                            
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Nom complet</label>
                                     {errors.name && <p classNameName="text-danger">{errors.name.message}</p>}
                                    <input type="text" className="form-control"  {...register("name",{required:"veiller entrer le nom"})} placeholder="nom"/>
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                     {errors.email && <p classNameName="text-danger">{errors.email.message}</p>}
                                    <input type="text" className="form-control"
                                                                        {...register("email",
                                                                        { required: 'veiller entrer votre email',
                                                                        pattern: {
                                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                                        message: 'Invalid email address'
                                                                        }})
                                                                    } placeholder="email"/> 
                                </div>
                            </div>
                            <div className="col-md-6">
                                
                                <div className="form-group">
                                    <label>Password</label>
                                     {errors.password && <p classNameName="text-danger">{errors.password.message}</p>}
                                    <input type="password" className="form-control"  {...register("password",{ required: "veiller entrer votre password" ,
                                                                                                                                pattern: {
                                                                                                                                    value: /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
                                                                                                                                    message: 'Le mot de passe doit contenir au moins une lettre majuscule, un chiffre et comporter au moins 8 caractères'
                                                                                                                                  }})} />
                                </div>
                                <div className="form-group">
                                    <label>Repeat Password</label>
                                    {errors.confpassword && <p classNameName="text-danger">{errors.confpassword.message}</p>}
                                    <input type="password" className="form-control" {...register("confpassword",{  required: true, validate: (val) => {
                                                                                                                if (watch('password') !== val) {
                                                                                                                return "Les mot de passe ne correspondent pas";
                                                                                                                }
                                                                                                            }, })} />
                                </div>
                            </div>
                        </div>
                        <h5 className="card-title">Information secondaire</h5>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Addresse</label>
                                     
                                    <input type="text" className="form-control" {...register("address")} placeholder="nom"/>
                                </div>
                                <div className="form-group">
                                    <label>Ecole</label>
                                     
                                    <input type="text" className="form-control" {...register("ecole")} placeholder="nom"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>classe</label>
                                     
                                    <input type="text" className="form-control" {...register("classe")} placeholder="nom"/>
                                </div>
                                <div className="form-group">
                                    <label>Telephone</label>
                                     
                                    <input type="text" className="form-control" {...register("tel")} placeholder="nom"/>
                                </div>
                            </div>
                        </div>
                        <div className="text-end">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Ajouter