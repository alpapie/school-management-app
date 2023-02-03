import React,{Component} from "react";
import Page1 from "./page1";

class DetailStudent extends Component{
    constructor(){
        super();
        this.state = {
            backto:false
        }
    }

    render(){
        let size="&size=250"
        function back(){
            this.setState({
                backto:true
            })
        }
        if(this.state.backto){
            return(
            <Page1/>
            )
        }
        return(
            <>
                <div class="content container-fluid">
                    <div class="page-header">
                        <div class="row">
                            <div class="col-sm-12">
                                <h3 class="page-title">Student Details</h3>
                                <ul class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="students.html">Student</a></li>
                                    <li class="breadcrumb-item active">Student Details</li>
                                </ul>
                                <div className="col-auto text-end float-end ms-auto">
                                    <a style={{cursor : "pointer"}} onClick={back.bind(this)} className="btn btn-outline-primary me-2"><i className="fas fa-arrow-left"></i>
                                        Back</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="about-info">
                                        <h4>About Me</h4>
                                        <div class="media mt-3 d-flex">
                                            <img src={"https:"+this.props.OneUser.etudiant.img?this.props.OneUser.etudiant.img+size:null} class="me-3 flex-shrink-0" alt="..."/>
                                            <div class="media-body flex-grow-1">
                                                <ul>
                                                    <li>
                                                        <b class="title-span">Full Name : </b>
                                                        <span class="info-span">{this.props.OneUser.name}</span>
                                                    </li>
                                                    <li>
                                                        <b class="title-span">Etablissement : </b>
                                                        <span class="info-span">{this.props.OneUser.etudiant.ecole}</span>
                                                    </li>
                                                    <li>
                                                        <b class="title-span">Mobile : </b>
                                                        <span class="info-span">{this.props.OneUser.etudiant.tel}</span>
                                                    </li>
                                                    <li>
                                                        <b class="title-span">Email : </b>
                                                        <span class="info-span">{this.props.OneUser.email}</span>
                                                    </li>
                                                    <li>
                                                        <b class="title-span">Classe : </b>
                                                        <span class="info-span">{this.props.OneUser.etudiant.classe}</span>
                                                    </li>
                                                    
                                                </ul>
                                            </div>
                                        </div>
                                      
                                        <div class="row follow-sec">
                                            <div class="col-md-4 mb-3">
                                                <div class="blue-box">
                                                    <h3>2850</h3>
                                                    <p>Followers</p>
                                                </div>
                                            </div>
                                            <div class="col-md-4 mb-3">
                                                <div class="blue-box">
                                                    <h3>2050</h3>
                                                    <p>Following</p>
                                                </div>
                                            </div>
                                            <div class="col-md-4 mb-3">
                                                <div class="blue-box">
                                                    <h3>2950</h3>
                                                    <p>Friends</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-12">
                                                <h5>Addresse Permanent </h5>
                                                <p>{this.props.OneUser.etudiant.address}</p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    © 2023 alpapie Admin by Gando-tech.com
                </footer>
            </>
        )
    }
}
export default DetailStudent;