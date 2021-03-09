//react
import React,{useState} from 'react';

//modulos
import { Redirect } from "react-router-dom";
//context
import withContext from "../../withContext";

//styles

const styles = {
    margin:{
        marginTop: '8rem'
    },
    formContainer:{
        backgroundColor:'#fff',
        padding: '30px',
        borderRadius:'10px',
        boxShadow: '0px 0px 10px 0px #000'
    },
    bg:{
        backgroundImage: 'http no repeat',
        width:'100%',
        height:'100vh',
        backgroundsize:'100%'
    },
    paddingTop:{
        paddingTop: '10rem'
    }

}


const Login = (props) => {

    const [useremail, setuserEmail] = useState('');
    const [userpassword, setuserPassword] = useState('');
    

    const handleChangeEmail = (e) => {
        setuserEmail(e.target.value);
    }

    const handleChangepassword = (e) => {
        setuserPassword(e.target.value);
    }

    const login = async () => {

        const email = useremail;
        const password = userpassword;
        // console.log(email);
        if (!email || !password) {
            alert('Fill all fields');

        }
        let loggedIn = await props.context.login(email, password);
        // console.log(props.context);
        // console.log(loggedIn);
        if (!loggedIn) {
            alert('Credenciales invalidas');

        }

    };

    const { user } = props.context;//extrae el usuario del contexto

    return (user)? (
        <Redirect to='/dashboard'/>
    ):(
        <>

            <section style={styles.paddingTop} className="container-fluid bg">
                <section className="row justify-content-center">
                    <section className="col-12 col-sm-6 col-md-3">
                        <div className="form-container">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChangeEmail} value={useremail} />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" onChange={handleChangepassword} value={userpassword} />
                            </div>
                            <button type="submit" class="btn btn-block btn-primary" onClick={login}>Login</button>
                        </div>
                    </section>
                </section>
            </section>

        </>
    );
}

export default withContext(Login);