import axios from "axios";
import React,{Component} from "react";

class Index extends Component{
    constructor(){
        super();
        this.state = {
            students:null
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/etudiant`).then((res) => {
            this.setState({students:res.data.length})
        })
    }
    render(){
        return(
            <>
                <div class="content container-fluid">

                    <div class="page-header">
                        <div class="row">
                            <div class="col-sm-12">
                                <h3 class="page-title">Welcome Admin!</h3>
                                <ul class="breadcrumb">
                                    <li class="breadcrumb-item active">Dashboard</li>
                                </ul>
                            </div>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-xl-3 col-sm-6 col-12 d-flex">
                            <div class="card bg-one w-100">
                                <div class="card-body">
                                    <div class="db-widgets d-flex justify-content-between align-items-center">
                                        <div class="db-icon">
                                            <i class="fas fa-user-graduate"></i>
                                        </div>
                                        <div class="db-info">
                                            <h3>{this.state.students}</h3>
                                            <h6>Students</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-sm-6 col-12 d-flex">
                            <div class="card bg-two w-100">
                                <div class="card-body">
                                    <div class="db-widgets d-flex justify-content-between align-items-center">
                                        <div class="db-icon">
                                            <i class="fas fa-crown"></i>
                                        </div>
                                        <div class="db-info">
                                            <h3>50+</h3>
                                            <h6>Awards</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-sm-6 col-12 d-flex">
                            <div class="card bg-three w-100">
                                <div class="card-body">
                                    <div class="db-widgets d-flex justify-content-between align-items-center">
                                        <div class="db-icon">
                                            <i class="fas fa-building"></i>
                                        </div>
                                        <div class="db-info">
                                            <h3>30+</h3>
                                            <h6>Department</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-sm-6 col-12 d-flex">
                            <div class="card bg-four w-100">
                                <div class="card-body">
                                    <div class="db-widgets d-flex justify-content-between align-items-center">
                                        <div class="db-icon">
                                            <i class="fas fa-file-invoice-dollar"></i>
                                        </div>
                                        <div class="db-info">
                                            <h3>$505</h3>
                                            <h6>Revenue</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 col-lg-6">

                            <div class="card card-chart">
                                <div class="card-header">
                                    <div class="row align-items-center">
                                        <div class="col-6">
                                            <h5 class="card-title">Revenue</h5>
                                        </div>
                                        <div class="col-6">
                                            <ul class="list-inline-group text-end mb-0 pl-0">
                                                <li class="list-inline-item">
                                                    <div class="form-group mb-0 amount-spent-select">
                                                        <select class="form-control form-control-sm form-select">
                                                            <option>Today</option>
                                                            <option>Last Week</option>
                                                            <option>Last Month</option>
                                                        </select>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div id="apexcharts-area"></div>
                                </div>
                            </div>

                        </div>
                        <div class="col-md-12 col-lg-6">

                            <div class="card card-chart">
                                <div class="card-header">
                                    <div class="row align-items-center">
                                        <div class="col-6">
                                            <h5 class="card-title">Number of Students</h5>
                                        </div>
                                        <div class="col-6">
                                            <ul class="list-inline-group text-end mb-0 pl-0">
                                                <li class="list-inline-item">
                                                    <div class="form-group mb-0 amount-spent-select">
                                                        <select class="form-control form-control-sm form-select">
                                                            <option>Today</option>
                                                            <option>Last Week</option>
                                                            <option>Last Month</option>
                                                        </select>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div id="bar"></div>
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
export default Index;