//react
import React, { useState, useEffect } from 'react';

//estilo
import './App.css';

//modulos
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

//componentes
import Navbar from './components/Navbar';
import Footer from './components/footer';
import Index from './components/index';
import Login from './components/Pages/Login';
import Signup from './components/Pages/Signup';
import Dashboard from './components/admin/dashboard';

//context
import Context from "./Context";

function App() {


  const [userLog, setUserLog] = useState(null);


  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = () => {
    let user = localStorage.getItem("user");
    user = user ? JSON.parse(user) : null;
    setUserLog(user);
    // localStorage.removeItem("user");
  }



  const login = async (eml, pwd) => {
    // let user = data.users.find(u => u.username === usn && u.password === pwd);
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json'

      }
    };
    const logusr = {
      email: eml,
      password: pwd
    }
    // console.log(logusr);

    let resp;
    await axios.post('https://api-covidnsource.herokuapp.com/api/auth/signin', logusr, axiosConfig)
      .then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
        resp = res;
      })
      .catch((err) => {
        // console.log("AXIOS ERROR: ", err);
        resp = null;
      })

    let user = resp ? resp.data.infauthusr : null;
    // console.log(user);

    if (user) {
      setUserLog(user);     
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    }
    return false;
  };


  const signup = async (usern, eml, pwd) => {
   
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json'

      }
    };
    const logusr = {
      username: usern,
      email: eml,
      password: pwd
    }
    // console.log(logusr);

    let resp;
    await axios.post('https://api-covidnsource.herokuapp.com/api/auth/signup', logusr, axiosConfig)
      .then((res) => {
        // console.log("RESPONSE RECEIVED: ", res);
        resp = res;
      })
      .catch((err) => {
        // console.log("AXIOS ERROR: ", err);
        resp = null;
      })

    let user = resp ? resp.data : null;
    // console.log(user);

    if (user) {
      setUserLog(user);
      // console.log(user.roles);
   
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    }
    return false;
  };



  const logout = e => {
    e.preventDefault();
    setUserLog(null);
    localStorage.removeItem("user");
  };




  return (
    <Context.Provider value={{
      user: userLog,
      signup:signup,
      login:login,
      logout:logout
      
    }}
    >


      <Router>
        <Navbar />
        <Switch>


          <Route path="/" exact component={Index} />
          <Route path="/inicio" exact component={Index} />
          <Route path="/login" exact component={Login} />
          <Route path="/singup" exact component={Signup} />
          <Route path="/dashboard" exact component={Dashboard} />

        </Switch>
      </Router>

      </Context.Provider>
  );
}

export default App;
