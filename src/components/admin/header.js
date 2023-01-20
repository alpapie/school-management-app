import { Routes, Route, } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Index from "./components";
import ListEtudiant from "./components/page1";
import {useForm} from "react-hook-form"

function Header({user}) {
    let [Searchvalue,setSearchvalue] =useState()
    let [tosearch,settosearch] =useState()

    const {register,handleSubmit}=useForm()

    const onSubmit = (data) => {
        setSearchvalue(data.seach)
       settosearch(true)
    }
    return (
        <>
            <link rel="stylesheet" href="/assets/plugins/fontawesome/css/fontawesome.min.css" />
            <link rel="stylesheet" href="/assets/plugins/fontawesome/css/all.min.css" />
            <link rel="stylesheet" href="/assets/plugins/simple-calendar/simple-calendar.css" />
            <link rel="stylesheet" href="/assets/css/style.css" />
            <div className="main-wrapper">

                <div className="header">

                    <div className="header-left">
                        <a href="/admin" className="logo">
                            <img src="/assets/img/logo.png" alt="Logo" />
                        </a>
                        <a href="/admin" className="logo logo-small">
                            <img src="/assets/img/logo-small.png" alt="Logo" width="30" height="30" />
                        </a>
                    </div>

                    <a href="" id="toggle_btn">
                        <i className="fas fa-align-left"></i>
                    </a>

                    <div className="top-nav-search">
                        <form method="post" onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" className="form-control" {...register('seach')} placeholder="Search here" />
                            <button className="btn" type="submit"><i className="fas fa-search"></i></button>
                        </form>
                    </div>


                    <a className="mobile_btn" id="mobile_btn">
                        <i className="fas fa-bars"></i>
                    </a>


                    <ul className="nav user-menu">


                        <li className="nav-item dropdown has-arrow">
                            <a  className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
                                <span className="user-img"><img className="rounded-circle" src="/assets/img/user.jpg"
                                    width="31" alt="Ryan Taylor" /></span>
                            </a>
                            <div className="dropdown-menu">
                                <div className="user-header">
                                    <div className="avatar avatar-sm">
                                        <img src="/assets/img/user.jpg" alt="User Image"
                                            className="avatar-img rounded-circle" />
                                    </div>
                                    <div className="user-text">
                                        <h6>{user.name}</h6>
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
                                {/* <li className="submenu">
                                    <a href="/admin"> <span><i className="fas fa-sharp fa-solid fa-school"></i> <span> Dashboard</span></span></a>
                                </li> */}
                                <li className="submenu">
                                    <a href="/admin/list-etudiant"><span> <i className="fas fa-user-graduate"></i> <span>listes etudiant</span></span></a>
                                </li>
                                <li className="submenu ">
                                <a href="#">
                                <span><i className="fas fa-chalkboard-teacher"></i> <span>listes enseignant</span> </span>
                                </a>  
                                </li>
                                <li className="submenu ">
                                <a href="#"> <span><i className="fas fa-book-reader"></i> <span>listes cours</span> </span></a> 
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
                                <li>
                                    <a href="/logout"><i className="fas fa-sign-out-alt"></i> <span>logout</span></a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
                <div className="page-wrapper">
                    <Routes>
                        <Route path="/" element={<Index/>} />
                        <Route path="/list-etudiant" element={<ListEtudiant tosearch={tosearch} settosearch={settosearch} setSearchvalue={setSearchvalue} Searchvalue={Searchvalue} />} />
                    </Routes>

                </div>

            </div>
            <script src="/assets/js/jquery-3.6.0.min.js"></script>

            <script src="/assets/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>

            <script src="/assets/plugins/slimscroll/jquery.slimscroll.min.js"></script>

            <script src="/assets/plugins/apexchart/apexcharts.min.js"></script>
            <script src="/assets/plugins/apexchart/chart-data.js"></script>

            <script src="/assets/js/script.js"></script>
        </>
    )
}

export default Header