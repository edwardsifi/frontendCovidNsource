//react
import React, { useState } from 'react';

//modulos
import { Redirect } from "react-router-dom";
//context
import withContext from "../../withContext";

//styles
const styles = {
    margin: {
        marginTop: '8rem'
    },
    formContainer: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px 0px #000'
    },
    bg: {
        backgroundImage: 'http no repeat',
        width: '100%',
        height: '100vh',
        backgroundsize: '100%'
    },
    paddingTop: {
        paddingTop: '10rem'
    }

}


const Signup = (props) => {

    const [username, setUsername] = useState('')
    const [useremail, setuserEmail] = useState('');
    const [userpassword, setuserPassword] = useState('');


    const handleChangeUser = (e) => {
        setUsername(e.target.value);
    }

    const handleChangeEmail = (e) => {
        setuserEmail(e.target.value);
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
            alert('Fill all fields');
           

        }
        let loggedIn = await props.context.signup(user, email, password);
        // console.log(props.context);
        // console.log(loggedIn);
     
        if (!loggedIn) {
            alert('cuenta no creada');

        }

    };

    const { user } = props.context;//extrae el usuario del contexto
    // console.log(user);


    return (user)?(
            <Redirect to="/dashboard"/>
        ):(
        <>

            <section style={styles.paddingTop} className="container-fluid bg">
                <section className="row justify-content-center">
                    <section className="col-12 col-sm-6 col-md-3">
                        <div className="form-container">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label"  >Username</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChangeUser} value={username}/>
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label"  >Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"onChange={handleChangeEmail} value={useremail} />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label" >Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" onChange={handleChangepassword} value={userpassword} />
                            </div>
                            <button class="btn btn-block btn-primary" onClick={signup}>Login</button>
                        </div>
                    </section>
                </section>
            </section>

        </>
    );
}

export default withContext(Signup);;