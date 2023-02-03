import React, { Component } from "react";
import { Routes, Route, } from "react-router-dom";
import Page1 from "./components/page1";
class Header extends Component {
    constructor() {
        super()

    }
    render() {
        console.log(this.props.user)
        return (
            <>
                <link rel="stylesheet" href={process.env.PUBLIC_URL+ '/assets/plugins/fontawesome/css/fontawesome.min.css'} />
                <link rel="stylesheet" href={process.env.PUBLIC_URL+ '/assets/plugins/fontawesome/css/all.min.css'} />
                <link rel="stylesheet" href={process.env.PUBLIC_URL+ '/assets/plugins/simple-calendar/simple-calendar.css'} />
                <link rel="stylesheet" href={process.env.PUBLIC_URL+ '/assets/css/style.css'} />
                <div className="main-wrapper">

                    <div className="header">

                        <div className="header-left">
                            <a href="/admin" className="logo">
                                <img src={process.env.PUBLIC_URL+ '/faviconold.ico" alt="Logo'} />
                            </a>
                            {/* <a href="" className="logo logo-small">
                                <img src={process.env.PUBLIC_URL+ '/assets/img/logo-small.png" alt="Logo" width="30" height="30" />
                            </a> */}
                        </div>

                        <a href="" id="toggle_btn">
                            <i className="fas fa-align-left"></i>
                        </a>

                        <div className="top-nav-search">
                            <form>
                                <input type="text" className="form-control" placeholder="Search here" />
                                <button className="btn" type="submit"><i className="fas fa-search"></i></button>
                            </form>
                        </div>


                        <a className="mobile_btn" id="mobile_btn">
                            <i className="fas fa-bars"></i>
                        </a>


                        <ul className="nav user-menu">


                            <li className="nav-item dropdown has-arrow">
                                <a href="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
                                    <span className="user-img"><img className="rounded-circle" src={process.env.PUBLIC_URL+ '/assets/img/user.jpg'}
                                        width="31" alt="Ryan Taylor" /></span>
                                </a>
                                <div className="dropdown-menu">
                                    <div className="user-header">
                                        <div className="avatar avatar-sm">
                                            <img src={process.env.PUBLIC_URL+ '/assets/img/user.jpg" alt="User Image'}
                                                className="avatar-img rounded-circle" />
                                        </div>
                                        <div className="user-text">
                                            <h6>{this.props.user.name}</h6>
                                            <p className="text-muted mb-0">etudiant</p>
                                        </div>
                                    </div>
                                    <a className="dropdown-item" href="profile.html">My Profile</a>
                                    <a className="dropdown-item" href="inbox.html">Inbox</a>
                                    <a className="dropdown-item" href="/logout">Logout</a>
                                </div>
                            </li>

                        </ul>

                    </div>


                    <div className="sidebar" id="sidebar">
                        <div className="sidebar-inner slimscroll">
                            <div id="sidebar-menu" className="sidebar-menu">
                                <ul>
                                    <li className="menu-title">
                                        <span><i className="fas fa-user-graduate"></i> <span> Dashboard</span></span>
                                    </li>
                                    <li className="submenu active">
                                       <a href="#">Cours</a>
                                    </li>
                                    <li className="submenu ">
                                    <a href="#"> Emploi de temps</a>  
                                    </li>
                                    <li className="submenu ">
                                    <a href="#">Exo</a> 
                                    </li>

                                    <li className="menu-title">
                                        <span>Management</span>
                                    </li>

                                    <li>
                                        <a href="#"><i className="fas fa-clipboard-list"></i> <span>Exam list</span></a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fas fa-calendar-day"></i> <span>Events</span></a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="page-wrapper">
                        <Page1 />

                    </div>

                </div>
                <script src={process.env.PUBLIC_URL+ '/assets/js/jquery-3.6.0.min.js'}></script>

                <script src={process.env.PUBLIC_URL+ '/assets/plugins/bootstrap/js/bootstrap.bundle.min.js'}></script>

                <script src={process.env.PUBLIC_URL+ '/assets/plugins/slimscroll/jquery.slimscroll.min.js'}></script>

                <script src={process.env.PUBLIC_URL+ '/assets/plugins/apexchart/apexcharts.min.js'}></script>
                <script src={process.env.PUBLIC_URL+ '/assets/plugins/apexchart/chart-data.js'}></script>

                <script src={process.env.PUBLIC_URL+ '/assets/js/script.js'}></script>
            </>
        )
    }
}
export default Header