import React, { useEffect } from "react";
//modulos
import { NavLink, Redirect } from 'react-router-dom';
//context
import withContext from "../withContext";

const Navbar = (props) => {
    const { user } = props.context;

    useEffect(() => {
        /*menu show and hiden*/
        const navMenu = document.getElementById('nav-menu'),
            toogleMenu = document.getElementById('nav-toogle'),
            closeMenu = document.getElementById('nav-close');

        //show
        toogleMenu.addEventListener('click', () => {
            navMenu.classList.toggle('show')
        })
        //hidden
        closeMenu.addEventListener('click', () => {
            navMenu.classList.remove('show')
        })
        //function to install de pwa
        beforeinstall();
    }, [])

    const logout = (e) => {
        props.context.logout();
        // props.history.push('/');
        <Redirect to="/dashboard" />
    }

    //function to install the pwa

    const beforeinstall = () => {
        let deferredPrompt;
        const addBtn = document.querySelector('.add-button');
        addBtn.style.display = 'none';

        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            deferredPrompt = e;
            // Update UI to notify the user they can add to home screen
            addBtn.style.display = 'block';

            addBtn.addEventListener('click', (e) => {
                // hide our user interface that shows our A2HS button
                addBtn.style.display = 'none';
                // Show the prompt
                deferredPrompt.prompt();
                // Wait for the user to respond to the prompt
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the A2HS prompt');
                    } else {
                        console.log('User dismissed the A2HS prompt');
                    }
                    deferredPrompt = null;
                });
            });
        });

    }

    return (
        <>
            {/* Header */}
            <header class="l-header">
                <nav class="nav bd-grid">
                    <div>
                        <NavLink to="/" className="nav_logo">CovidStats</NavLink>
                    </div>
                    <div class="nav_toogle" id="nav-toogle">
                        <i class='bx bx-menu'></i>
                    </div>
                    <div class="nav_menu" id="nav-menu">
                        <div class="nav_close" id="nav-close">
                            <i class='bx bx-x'></i>
                        </div>

                        <ul class="nav_list">
                            {!props.context.user ? (
                                <li class="nav_item">
                                    <NavLink to="/login" className="nav_link">Login</NavLink>
                                </li>

                            ) : (
                                <li class="nav_item">
                                    <NavLink to="/" className="nav_link" onClick={logout}>
                                        Logout {props.context.user.username}
                                    </NavLink>
                                </li>
                            )}

                            {!props.context.user ? (
                                <li class="">
                                    {/* <NavLink class="nav-link active" aria-current="page" to="/singup">Signup</NavLink> */}
                                    <li class="nav_item">
                                        <NavLink to="/singup" className="nav_link">Sing Up</NavLink>
                                    </li>
                                </li>

                            ) : (
                                <>
                                    <li class="nav_item">
                                        <NavLink to="/dashboard" className="nav_link" >
                                            dashboard
                                        </NavLink>
                                    </li>
                                </>
                            )}
                            <li class="nav_item">
                                <NavLink to="/share" className="nav_link" >
                                    Share
                                </NavLink>
                            </li>
                            <li class="nav_item">
                                <button class="add-button btn btn-primary nav_link button_install" >Instalar</button>
                            </li>

                            {/* <NavLink to="/login" className="nav_link">Login</NavLink> */}
                            {/* <li class="nav_item"><a href="#" class="nav_link">Sign out</a></li> */}
                            {/* <NavLink to="/dashboard" className="nav_link">Dashboard</NavLink> */}
                            <li class="nav_item">
                                <a href="#" class="nav_link"></a>
                            </li>
                        </ul>

                    </div>
                </nav>
            </header>
        </>
    )
}

export default withContext(Navbar);