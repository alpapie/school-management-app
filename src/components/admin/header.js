import { Routes, Route, HashRouter, Link, } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Index from "./components";
import ListEtudiant from "./components/page1";
import { useForm } from "react-hook-form"
import Dropdown from 'react-bootstrap/Dropdown';

function Header({ user }) {
    let [Searchvalue, setSearchvalue] = useState()
    let [tosearch, settosearch] = useState()
    let [mobilenav, setmobilenav] = useState("main-wrapper")
    let [nimiside, setnimiside] = useState("")

    const { register, handleSubmit } = useForm()

    const onSubmit = (data) => {
        setSearchvalue(data.seach)
        settosearch(true)
    }
    const onChangeseacrh = (data) => {
        setSearchvalue(data)
        settosearch(true)
        console.log(data)
    }

    let onchangemobilenav = () => {
        if (mobilenav === "main-wrapper") {

            setmobilenav("main-wrapper slide-nav")
        } else {
            setmobilenav("main-wrapper")
        }

    }
    let onchangnimiside = () => {
        if (nimiside === "") {

            setnimiside("mini-sidebar")
        } else {
            setnimiside("")
        }

    }
    return (
        <>
            <link rel="stylesheet" href={process.env.PUBLIC_URL + '/assets/plugins/datatables/datatables.min.css'} />
            <link rel="stylesheet" href={process.env.PUBLIC_URL + '/assets/plugins/fontawesome/css/fontawesome.min.css'} />
            <link rel="stylesheet" href={process.env.PUBLIC_URL + '/assets/plugins/fontawesome/css/all.min.css'} />
            <link rel="stylesheet" href={process.env.PUBLIC_URL + '/assets/plugins/bootstrap/css/bootstrap.min.css'} />
            <link rel="stylesheet" href={process.env.PUBLIC_URL + '/assets/plugins/simple-calendar/simple-calendar.css'} />
            <link rel="stylesheet" href={process.env.PUBLIC_URL + '/assets/css/style.css'} />
            <body className={nimiside}>
                <div className={mobilenav}>

                    <div className="header">
                        <div className="header-left">
                            < Link to="/admin" className="logo">
                                <img src={process.env.PUBLIC_URL + '/assets/img/logo.png'} alt="Logo" />
                            </Link>
                            < Link to="/admin" className="logo logo-small">
                                <img src={process.env.PUBLIC_URL + '/assets/img/logo.png'} alt="Logo" width="30" height="30" />
                            </Link>
                        </div>
                        <a style={{ cursor: "pointer" }} id="toggle_btn" onClick={onchangnimiside}>
                            <i className="fas fa-align-left"></i>
                        </a>

                        <div className="top-nav-search">
                            <form method="post" onSubmit={handleSubmit(onSubmit)}>
                                <input type="text" className="form-control" {...register('seach', { onChange: (e) => { onChangeseacrh(e.target.value) } }
                                )} placeholder="Search here" />
                                <button className="btn" type="submit"><i className="fas fa-search"></i></button>
                            </form>
                        </div>


                        <a className="mobile_btn" id="mobile_btn" onClick={onchangemobilenav}>
                            <i className="fas fa-bars"></i>
                        </a>


                        <ul className="nav user-menu" >
                            <Dropdown className="nav-item dropdown has-arrow">
                                <Dropdown.Toggle className="dropdown-toggle nav-link" data-toggle="dropdown" id="collapseExample">
                                    <span className="user-img"><img className="rounded-circle" src={process.env.PUBLIC_URL + '/assets/img/user.jpg'}
                                        width="31" alt="Ryan Taylor" /></span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu dropdown">
                                    <Dropdown.Item className="user-header">
                                        <div className="avatar avatar-sm">
                                            <img src={process.env.PUBLIC_URL + '/assets/img/user.jpg'} alt="User Image"
                                                className="avatar-img rounded-circle" />
                                        </div>
                                        <div className="user-text">
                                            <h6>{user.name}</h6>
                                            <p className="text-muted mb-0">etudiant</p>
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item className="dropdown-item" >My Profile</Dropdown.Item>
                                    <Dropdown.Item className="dropdown-item" >Inbox</Dropdown.Item>
                                    <Link to="/">
                                        <Dropdown.Item className="dropdown-item" >Logout</Dropdown.Item>
                                    </Link>
                                </Dropdown.Menu>
                            </Dropdown>

                        </ul>

                    </div>
                    <div className="sidebar" id="sidebar" >
                        <div className="sidebar-inner slimscroll">
                            <div id="sidebar-menu" className="sidebar-menu">
                                <ul>
                                    {/* <li className="submenu">
                                        <a href="/admin"> <span><i className="fas fa-sharp fa-solid fa-school"></i> <span> Dashboard</span></span></a>
                                    </li> */}
                                    <li className="submenu">
                                        <Link to="/admin/list-etudiant">
                                            <a style={{ cursor: "pointer" }}><span> <i className="fas fa-user-graduate"></i> <span>listes etudiant</span></span></a>
                                        </Link>
                                    </li>
                                    <li className="submenu ">
                                        <Link>
                                            <a style={{ cursor: "pointer" }}>
                                                <span><i className="fas fa-chalkboard-teacher"></i> <span>listes enseignant</span> </span>
                                            </a>
                                        </Link>
                                    </li>
                                    <li className="submenu ">
                                        <Link>
                                            <a style={{ cursor: "pointer" }}> <span><i className="fas fa-book-reader"></i> <span>listes cours</span> </span></a>
                                        </Link>
                                    </li>

                                    <li className="menu-title">
                                        <span>Management</span>
                                    </li>

                                    <li>
                                        <Link >
                                            <a style={{ cursor: "pointer" }}><i className="fas fa-clipboard-list"></i> <span>Exam list</span></a>
                                        </Link>
                                    </li>
                                    <li>
                                        <a style={{ cursor: "pointer" }}><i className="fas fa-calendar-day"></i> <span>Events</span></a>
                                    </li>
                                    <li>
                                        <Link to="/logout">
                                            <a ><i className="fas fa-sign-out-alt"></i> <span>logout</span></a>
                                        </Link>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="page-wrapper">
                        {/* <Route path="/" element={<Index/>} /> 
                        <Route path="/list-etudiant" element={*/}
                        <Routes>
                            <Route path="/" element={<Index />} />
                            <Route path="/list-etudiant" element={<ListEtudiant tosearch={tosearch} settosearch={settosearch} setSearchvalue={setSearchvalue} Searchvalue={Searchvalue} />} />
                        </Routes>
                        {/* <ListEtudiant tosearch={tosearch} settosearch={settosearch} setSearchvalue={setSearchvalue} Searchvalue={Searchvalue} /> */}
                    </div>
                </div>
            </body>
            <script src={process.env.PUBLIC_URL + '/assets/js/jquery-3.6.0.min.js'}></script>
            <script src={process.env.PUBLIC_URL + '/assets/js/bootstrap.min.js'}></script>
            <script src={process.env.PUBLIC_URL + '/assets/js/popper.min.js'}></script>

            <script src={process.env.PUBLIC_URL + '/assets/plugins/bootstrap/js/bootstrap.bundle.min.js'}></script>

            <script src={process.env.PUBLIC_URL + '/assets/plugins/slimscroll/jquery.slimscroll.min.js'}></script>

            <script src={process.env.PUBLIC_URL + '/assets/plugins/apexchart/apexcharts.min.js'}></script>
            <script src={process.env.PUBLIC_URL + '/assets/plugins/apexchart/chart-data.js'}></script>

            <script src={process.env.PUBLIC_URL + '/assets/js/script.js'}></script>

        </>
    )
}

export default Header