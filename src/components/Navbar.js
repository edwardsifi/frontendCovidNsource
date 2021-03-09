//react
import React from 'react'
//modulos
import { NavLink } from 'react-router-dom';
//context
//context
import withContext from "../withContext";

const Navbar = (props) => {
    const { user } = props.context;


    return (
        <>

            <nav class="navbar navbar-expand-lg navbar-light bg-light  fixed-top">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">CovidNsource</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarText">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="">
                                <NavLink class="nav-link active" aria-current="page" to="/">inicio</NavLink>
                            </li>

                            {!props.context.user ? (
                                <NavLink to="/login" className="navbar-item">
                                    Login
                                </NavLink>

                            ) : (
                                <a href="/" className="navbar-item" onClick={props.context.logout}>
                                    Logout: {props.context.user.username}
                                </a>
                            )}

                            {!props.context.user ? (
                                   <li class="">
                                   <NavLink class="nav-link active" aria-current="page" to="/singup">Signup</NavLink>
                               </li>

                            ) : (
                               <>
                               </>
                            )}

                        

                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}


export default withContext(Navbar);