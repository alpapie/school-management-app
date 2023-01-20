import React, { useState, useEffect } from "react";
import axios from "axios";
import DetailStudent from "./detailstudent"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

import Modif from "./modif";
import Ajouter from "./ajout";

function ListEtudiant({search}) {
    //les state
    let [datas, setDatas] = useState(null);
    let [loading, setLoading] = useState(true);
    let [detail, setDetail] = useState(false);
    let [OneUser, setOneuser] = useState(null);
    let [show, setShow] = useState(false);

    let [showadd, setshowadd] = useState(false);
    let [todelete, setTodelete] = useState(null);
    let [alert, setalert] = useState(false);
    let [alertmessage, setalertmessage] = useState(false);
    let [defauldata, setdefauldata] = useState(null)
    let [showmodif, setshowmodif] = useState(false);

    async function getdata() {
        return await axios.get("http://127.0.0.1:8000/api/etudiant").then((res) => {
            setDatas(res.data)
        }).finally(() => {
            setLoading(false);
        });
    }
    
    //recuperation des donne
    useEffect(() => {
        getdata();
        console.log(datas)

    },[])

    //aller au composant detail
    function afficheDetail(user) {
        setOneuser(user)
        console.log(user)
        setDetail(true)
    }
    //afficher ou masquer le modal
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true)
        setTodelete(id)
    };

    //suppression d'un etudiant avec generation de popup et d'elert
    function HandlerDelete(id) {
        //envoi des donnee
        axios.delete("http://127.0.0.1:8000/api/etudiant/" + id).then((res) => {
            console.log(res.data)
            getdata();
        })
        //
        setShow(false)
        setTodelete(null)

        //afficher l'alert
        setalert(true)
        setalertmessage("Etudiant supprimer avec success")
        setTimeout(() => {
            setalert(false)
            setalertmessage(null)
        }, 2000)

    }

    //modal d'ajout
    const handleShowadd = () => {
        setshowadd(true)
    }
    const handeleAddClose = () => setshowadd(false)

    const handeleModifClose= async()=>{
        setshowmodif(false)
        setdefauldata(null)
    }

    const handeleModifOpen= async (data)=> {
        setdefauldata({
            name:data.name,
            email:data.email,
            ecole:data.etudiant.ecole,
            classe:data.etudiant.classe,
            tel:data.etudiant.tel,
            address:data.etudiant.address,
            id:data.id
        })
       setshowmodif(true)
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>Voulez vous vraiment suprimer cette etudiant</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Non
                    </Button>
                    <Button variant="danger" onClick={HandlerDelete.bind(this, todelete)}>
                        Oui
                    </Button>
                </Modal.Footer>
            </Modal>
            {
                alert ? (
                    <Modal show={alert}>
                        <Modal.Header >
                            <Modal.Title>Alert</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Alert variant="success" >
                                {alertmessage}
                            </Alert>
                        </Modal.Body>
                    </Modal>

                ) : null
            }
            {
                detail ? <DetailStudent OneUser={OneUser} /> :
                    <div className="content container-fluid">


                        <div className="page-header">
                            <div className="row align-items-center">
                                <div className="col">
                                    <h3 className="page-title">Students</h3>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="/admin">Dashboard</a></li>
                                        <li className="breadcrumb-item active">Students</li>
                                    </ul>
                                </div>
                                <div className="col-auto text-end float-end ms-auto">
                                    <a href="#" style={{ cursor: "pointer" }} onClick={handleShowadd} className="btn btn-primary"><i className="fas fa-plus"></i></a>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card card-table">
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-hover table-center mb-0 datatable">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Name</th>
                                                        <th>Classe</th>
                                                        <th>Telephone</th>
                                                        <th className="text-end">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        loading && "loadind"}
                                                    {datas &&
                                                        (datas.map((user, index) => (
                                                            <tr>
                                                                <td key={index}>{user.id}</td>
                                                                <td key={index}>
                                                                    <h2 className="table-avatar">
                                                                        <a href="#" style={{ cursor: "pointer" }} className="avatar avatar-sm me-2" onClick={afficheDetail.bind(this, user)}>
                                                                            <img className="avatar-img rounded-circle" src={user.etudiant.img}  alt={user.name}/>
                                                                        </a>
                                                                        <a href="#" style={{ cursor: "pointer" }} onClick={afficheDetail.bind(this, user)}>

                                                                            {user.name}</a>
                                                                    </h2>
                                                                </td>
                                                                <td key={index}>{user.etudiant.classe}</td>
                                                                <td key={index}>{user.etudiant.tel}</td>

                                                                <td className="text-end">
                                                                    <div className="actions">
                                                                        <a href="#" style={{ cursor: "pointer" }} onClick={handeleModifOpen.bind(this, user)}
                                                                            className="btn btn-sm bg-success-light me-2">
                                                                            <i className="fas fa-pen"></i>
                                                                        </a>
                                                                        <a href="#" style={{ cursor: "pointer" }} onClick={handleShow.bind(this, user.id)} className="btn btn-sm bg-danger-light">
                                                                            <i className="fas fa-trash"></i>

                                                                        </a>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

            }
            {/* pour l'ajout dun 'etudiant */}
            <Modal show={showadd} onHide={handeleAddClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <Ajouter setshowadd={setshowadd} setalertmessage={setalertmessage} setalert={setalert} getdata={getdata}/>
                </Modal.Body>
            </Modal>

            {/* modif d'un etudiant */}
            <Modal show={showmodif} onHide={handeleModifClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier etudiant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   { defauldata && <Modif defauldata={defauldata} handeleModifClose={handeleModifClose} setalertmessage={setalertmessage} setalert={setalert} getdata={getdata}/> }
                </Modal.Body>
            </Modal>
            
        </>
    )

}
export default ListEtudiant