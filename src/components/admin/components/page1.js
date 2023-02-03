import React, { useState, useEffect ,useCallback} from "react";
import axios from "axios";
import DetailStudent from "./detailstudent"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Dropdown from 'react-bootstrap/Dropdown';

import { read, utils, writeFileXLSX } from 'xlsx';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

import Modif from "./modif";
import Ajouter from "./ajout";
import AddExcelFile from "./addexcel";

function ListEtudiant({ Searchvalue, setSearchvalue, tosearch, settosearch }) {
 
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
    let [showaddexcel, setshowaddexcel] = useState(false);

    async function getdata() {
        return await axios.get(`${process.env.REACT_APP_BASE_URL}/api/etudiant`).then((res) => {
            setDatas(res.data)
        }).finally(() => {
            setLoading(false);
        });
    }
    async function search(word) {
        if (word) {
            await axios.get(`${process.env.REACT_APP_BASE_URL}/api/search/` + word).then((res) => {
                setDatas(res.data)
            }).catch(error => {
                console.log(error)
            })
        } else {
            getdata()
        }

    }
    if (tosearch) {
        search(Searchvalue)
        settosearch(false)
        console.log(datas)
        setSearchvalue(null)
    }

    //recuperation des donne
    useEffect(() => {
        getdata();
    }, [])

    //aller au composant detail
    function afficheDetail(user) {
        setOneuser(user)
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
        axios.delete(`${process.env.REACT_APP_BASE_URL}/api/etudiant/` + id).then((res) => {
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

    const handeleModifClose = async () => {
        setshowmodif(false)
        setdefauldata(null)
    }
    //add with excelfile
    const addexelfile = () => {
        setshowaddexcel(true)
    }
    const closeaddexelfile = () => setshowaddexcel(false)

    const handeleModifOpen = async (data) => {
        setdefauldata({
            name: data.name,
            email: data.email,
            ecole: data.etudiant.ecole,
            classe: data.etudiant.classe,
            tel: data.etudiant.tel,
            address: data.etudiant.address,
            id: data.id
        })
        setshowmodif(true)
    }
    const topdf=()=>{
        const doc = new jsPDF()
        let newdata=[]
        datas.forEach((data)=>{
            newdata.push([data.id,data.name,data.email,data.etudiant.tel,data.etudiant.ecole,data.etudiant.classe,data.etudiant.address])
        })
        // autoTable(doc, { html: '#studenttable' })
        autoTable(doc, {
            head: [['id','Name', 'Email', 'telephone','ecole','classe','address']],
            body: newdata
          })
        doc.save('listestudent.pdf')
    }
    let newdata=datas
    //export to exel
    const exportFileexcel = useCallback(() => {
        
        newdata.forEach((data)=>{
            data['telephone']=data.etudiant.tel
            data['classe']=data.etudiant.classe
            data['ecole']=data.etudiant.ecole
            data['address']=data.etudiant.address
            delete(data.etudiant)
            delete(data.isadmin)
        })
        const ws = utils.json_to_sheet(newdata);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, "studentListexcel.xlsx");
      }, [newdata]);

    
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
                                    <Dropdown>
                                        <Dropdown.Toggle variant="primary" id="dropdown-basic" >
                                        Download
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item style={{ cursor: "pointer" }} onClick={topdf}>PDF</Dropdown.Item>
                                            <Dropdown.Item style={{ cursor: "pointer" }} onClick={exportFileexcel} >EXCEL</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className="col-auto text-end float-end ms-auto">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="primary" id="dropdown-basic2" >
                                        <i className="fas fa-plus"></i>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item style={{ cursor: "pointer" }} onClick={handleShowadd}>Form</Dropdown.Item>
                                            <Dropdown.Item style={{ cursor: "pointer" }} onClick={addexelfile}>Excel file</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card card-table">
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-hover table-center mb-0 datatable" id="table-to-xls">
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
                                                            <tr key={index}>
                                                                <td >{user.id}</td>
                                                                <td>
                                                                    <h2 className="table-avatar">
                                                                        <a style={{ cursor: "pointer" }} className="avatar avatar-sm me-2" onClick={afficheDetail.bind(this, user)}>
                                                                            <img className="avatar-img rounded-circle" src={"https:"+user.etudiant.img} alt={user.name} />
                                                                        </a>
                                                                        <a style={{ cursor: "pointer" }} onClick={afficheDetail.bind(this, user)}>{user.name}</a>
                                                                    </h2>
                                                                </td>
                                                                <td>{user.etudiant?user.etudiant.classe:null}</td>
                                                                <td>{user.etudiant?user.etudiant.tel:null}</td>

                                                                <td className="text-end">
                                                                    <div className="actions">
                                                                        <a style={{ cursor: "pointer" }} onClick={handeleModifOpen.bind(this, user)}
                                                                            className="btn btn-sm bg-success-light me-2">
                                                                            <i className="fas fa-pen"></i>
                                                                        </a>
                                                                        <a style={{ cursor: "pointer" }} onClick={handleShow.bind(this, user.id)} className="btn btn-sm bg-danger-light">
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
                    <Ajouter setshowadd={setshowadd} setalertmessage={setalertmessage} setalert={setalert} getdata={getdata} />
                </Modal.Body>
            </Modal>
            <Modal show={showaddexcel} onHide={closeaddexelfile}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddExcelFile setshowaddexcel={setshowaddexcel} setalertmessage={setalertmessage} setalert={setalert} getdata={getdata} />
                </Modal.Body>
            </Modal>
            

            {/* modif d'un etudiant */}
            <Modal show={showmodif} onHide={handeleModifClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier etudiant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {defauldata && <Modif defauldata={defauldata} handeleModifClose={handeleModifClose} setalertmessage={setalertmessage} setalert={setalert} getdata={getdata} />}
                </Modal.Body>
            </Modal>

        </>
    )

}
export default ListEtudiant