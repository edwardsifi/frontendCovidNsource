//react
import React, { useState, useEffect } from 'react';

//modulos
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

//componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Index from './components/Index';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Share from './components/Share';
import Dashboard from './components/admin/Dashboard';
import EditCountry from './components/edits/Editcountry';

//context
import Context from "./Context";

//estilos
import './App.css';

function App() {
  //States
  const [userLog, setUserLog] = useState(null);
  //useEffect
  useEffect(() => {
    cargarDatos()
  }, [])

  //loading the bigining data
  const cargarDatos = () => {
    let user = localStorage.getItem("user");
    user = user ? JSON.parse(user) : null;
    setUserLog(user);
    // localStorage.removeItem("user");
  }

  //login to the app
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

  //signup to the app
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

    let user = resp ? resp.data.infauthusr : null;
    console.log(user);

    if (user) {
      setUserLog(user);
      // console.log(user.roles);

      localStorage.setItem("user", JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = e => {
    // e.preventDefault();
    setUserLog(null);
    localStorage.removeItem("user");
  };

  return (
    <Context.Provider value={{
      user: userLog,
      signup: signup,
      login: login,
      logout: logout

    }}
    >

      <Router>
        <Navbar />
        <Switch>


          <Route path="/" exact component={Index} />
          <Route path="/inicio" exact component={Index} />
          <Route path="/login" exact component={Login} />
          <Route path="/singup" exact component={Signup} />
          <Route path="/share" exact component={Share} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/editcountry/:id" exact component={EditCountry} />

        </Switch>
      </Router>

    </Context.Provider>
  );
}

export default App;
