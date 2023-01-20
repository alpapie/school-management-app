import React, {  } from "react";
import axios from "axios";
import {useForm} from "react-hook-form"

function Modif({defauldata,handeleModifClose,setalert,setalertmessage,getdata}){
    const { register, reset,handleSubmit,formState:{ errors } } = useForm({
        defaultValues:defauldata
    });

    //traitement du formulaire d'ajout
     async function onSubmitmodiff(values){
        if (values){
            //envoi des donnee a l'api
            console.log(values)
           await axios.put("http://127.0.0.1:8000/api/etudiant/"+values.id,
            values
            ).then( async res=>{
            if(res.data.success){
                reset()
                handeleModifClose()
                setalertmessage("mise ajour effectuer avec success")
                //afficher l'alert
                setalert(true)
                setTimeout(()=>{
                    setalert(null)
                },3000)
                await getdata()
                }
            }).catch(errors => {
                console.log(errors)
                // setalertmessage("erreur lors de l'enregistrement")
            })
        }
    console.log(values)
     }
    return(

        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <form action="" method="post"  onSubmit={handleSubmit(onSubmitmodiff)}>
                            <h5 class="card-title">Information personnel</h5>
                            <div class="row">
                                {/* <p className="text-danger">{alertmessage}</p> */}
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Nom complet</label>
                                        <input type="hiden" hidden="true"  {...register("id")} />
                                            {errors.name && <p className="text-danger">{errors.name.message}</p>}
                                        <input type="text" class="form-control"  {...register("name",{required:"veiller entrer le nom"})} placeholder="nom"/>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Email</label>
                                            {errors.email && <p className="text-danger">{errors.email.message}</p>}
                                        <input type="text" class="form-control"
                                                                                {...register("email",
                                                                            { required: 'veiller entrer votre email',
                                                                            pattern: {
                                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                                            message: 'Invalid email address'
                                                                            }})
                                                                        } placeholder="email"/> 
                                    </div>
                                </div>
                                
                            </div>
                            <h5 class="card-title">Information secondaire</h5>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Addresse</label>
                                            
                                        <input type="text" class="form-control" {...register("address")} placeholder="nom"/>
                                    </div>
                                    <div class="form-group">
                                        <label>Ecole</label>
                                            
                                        <input type="text" class="form-control"  {...register("ecole")} placeholder="nom"/>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>classe</label>
                                            
                                        <input type="text" class="form-control"  {...register("classe")} placeholder="nom"/>
                                    </div>
                                    <div class="form-group">
                                        <label>Telephone</label>
                                            
                                        <input  type="text" class="form-control"  {...register("tel")} placeholder="nom"/>
                                    </div>
                                </div>
                            </div>
                            <div class="text-end">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div> 

    )
}
export default Modif