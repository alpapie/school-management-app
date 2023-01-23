import axios from "axios";
import React, { useState, useEffect ,useCallback} from "react";
import {useForm} from "react-hook-form"

function AddExcelFile({getdata,setshowaddexcel,setalert,setalertmessage}){
    const { register, reset,handleSubmit,formState:{ errors } } = useForm();
    async function onSubmitAjou(values){
        if (values){
            //envoi des donnee a l'api
            console.log(values.file[0]);
           await axios.post("https://sc.edep.sn/api/etudiantaddexel",
           {file:values.file[0]}
            ).then( async res=>{
            if(res.data.success){
                // await getdata()
                console.log(res.data)
                reset()
                setshowaddexcel(false) 
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
                    <form action="" method="post" onSubmit={handleSubmit(onSubmitAjou)} >
                        <h5 className="card-title">Ajouter une liste d'etudiant</h5>
                        <div className="row">
                            
                            <div className="col-md-8">
                                <div className="form-group">
                                    <label>Entrer un fichier excel</label>
                                     {errors.name && <p classNameName="text-danger">{errors.name.message}</p>}
                                    <input type="file" className="form-control" {...register("file",{required:"veiller entrer un fichier"})}placeholder="nom"/>
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
export default AddExcelFile