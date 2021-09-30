import React, { useState } from "react";
//modulos
import { NavLink, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import validator from 'email-validator';
//context
import withContext from "../../withContext";



const Signup = (props) => {
    const { user } = props.context;//extrae el usuario del contexto
    // console.log(user);

    const [username, setUsername] = useState('')
    const [useremail, setuserEmail] = useState('');
    const [userpassword, setuserPassword] = useState('');
    const [validateemail, setvalidateEmail] = useState(false);

    const handleChangeUser = (e) => {
        setUsername(e.target.value);
    }

    const handleChangeEmail = (e) => {
        setuserEmail(e.target.value);
        setvalidateEmail(validator.validate(e.target.value));
        let btn = document.getElementsByClassName('button-sign');
        let validate = validator.validate(e.target.value);

        if(validate == false){
            btn[0].setAttribute("disabled", "")
        }else{
            btn[0].removeAttribute("disabled");
        }      
        console.log(btn[0]); 
        console.log(validator.validate(e.target.value));
    }

    const handleChangepassword = (e) => {
        setuserPassword(e.target.value);
    }

    const signup = async () => {

        const user = username;
        const email = useremail;
        const password = userpassword;
        // console.log(email);
        console.log(user, email, password);
        if (!email || !password || !user) {


            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill all fields!',
                // footer: '<a href="">Why do I have this issue?</a>'
            })

        }
        let loggedIn = await props.context.signup(user, email, password);
        // console.log(props.context);
        // console.log(loggedIn);

        if (!loggedIn) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Not created account!',
                // footer: '<a href="">Why do I have this issue?</a>'
            })
        }

    };

    return (user) ? (
        <Redirect to="/dashboard" />
    ) : (
        <>
            <main class="l-main">

                <section class="signup section">
                    <div class="signup__container bd-container bd-grid">
                        <h2 class="section-title-center signup__title">Sign Up</h2>
                        <p class="signup__description">Stay informed with us about covid-19 cases</p>
                        <div class="log-grid" action="">
                            <div class="signup__direction">
                                <input type="text" placeholder="Username" class="signup__input" onChange={handleChangeUser} value={username} />
                                <a href="#" class="button"></a>
                            </div>
                            <div class="signup__direction">
                                <input type="email" placeholder="Email" class="signup__input" onChange={handleChangeEmail} value={useremail} />
                                <a href="#" class="button"></a>
                                <div class="alert alert-danger" role="alert">
                                  {validateemail ? <></> : <i class='bx bxs-error'></i>}  
                                </div>
                            </div>
                            <div class="signup__direction">
                                <input type="password" placeholder="Password" class="signup__input" onChange={handleChangepassword} value={userpassword} />
                                <a href="#" class="button"></a>
                            </div>
                            <div class="buttons-log">

                                <button onClick={signup} className="log_button button-sign">Sign Up</button>
                                <NavLink to="/" className="log_button">Home</NavLink>

                            </div>
                        </div>
                        <div class="signup__img">
                            <img src="https://escholarium.educarex.es/useruploads/ctx/a/4709137/r/s/2059309/coronavirus-5062160_1280.png" alt="" />
                        </div>
                    </div>


                </section>
            </main>

        </>
    )
}

export default withContext(Signup);