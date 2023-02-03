import axios from "axios";
import React, { useState, useEffect ,useCallback} from "react";
import {useForm} from "react-hook-form"
import * as XLSX from 'xlsx'

function AddExcelFile({getdata,setshowaddexcel,setalert,setalertmessage}){
    const { register, reset,handleSubmit,watch,formState:{ errors } } = useForm();
    let [errorfile, seterrorfile] = useState(null)

    let checkextention=(file)=>{
       let extlist =["xlsx","xls"]
       let extention=file.name.split('.').pop()
       if (!extlist.includes(extention)){
        return "choisissez un fichier excel"
       }
       return null
    }
    async function onSubmitAjou(values){
        if (values){
            //envoi des donnee a l'api
            let file =values.file[0]
            const data = new FormData()
            data.append('file', file)
            if(checkextention(file)){
              return seterrorfile(checkextention(file))
            }

           await axios.post(`${process.env.REACT_APP_BASE_URL}/api/etudiantaddexel`,
           data
            ).then( async res=>{
                if(res.data.status){
                    await getdata()

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
                reset()
                setshowaddexcel(false) 
                setalertmessage("erreur for de l'enregistrement")
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
                          <p className="text-danger">{errorfile}</p>  
                            <div className="col-md-8">
                                <div className="form-group">
                                    <label>Entrer un fichier excel</label>
                                     {errors.name && <p className="text-danger">{errors.name.message}</p>}
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