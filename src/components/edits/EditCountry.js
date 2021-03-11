//react
import React, { useState, useEffect } from 'react';

//modulos
import { Redirect } from 'react-router-dom';
import axios from 'axios';

//context
import withContext from '../../withContext';


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


const EditCountry = (props) => {

    //context
    let user;
    let token;
    let id;
    try {
        id = props.match.params.id;
        user = props.context.user;
        token = props.context ? props.context.user.token : null;
    } catch (error) {

    }

    //forms states
    const [pais, setPais] = useState('');
    const [deaths, setDeaths] = useState('');
    const [npruebas, setNPruebas] = useState();
    const [ncasos, setNCasos] = useState('');
    const [ncasosactivos, setNCasosActivos] = useState();
    const [ncasoscriticos, setNCasosCriticos] = useState();
    const [ncasosrecuperados, setNCasosRecuperados] = useState();

    //total de casos previos
    const [ncasostotales, setNcasostotales] = useState();
    const [ndeathstotales, setNdeathstotales] = useState();
    const [npruebastotales, setNpruebastotales] = useState();

    //casos por millon
    const [oneM_popc, setOneM_popc] = useState('');
    const [oneM_popt, setOneM_popt] = useState('');

    //useEffect
    useEffect(() => {
        getEstadisticaPais();
    }, [])


    //onchanges
    const onchangeDeath = (e) => {
        setDeaths(e.target.value);
    }

    const onchangeNpruebas = (e) => {
        setNPruebas(e.target.value);
    }

    const onChangeNcasos = (e) => {
        setNCasos(e.target.value);
    }

    const onChangeNcasosActivos = (e) => {
        setNCasosActivos(e.target.value);
    }

    const onChangeNcasosCriticos = (e) => {
        setNCasosCriticos(e.target.vlaue);
    }

    const onChangeNcasosRecuperados = (e) => {
        setNCasosRecuperados(e.target.value);
    }


    //http 
    const getEstadisticaPais = async () => {

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        };

        await axios.get(`https://api-covidnsource.herokuapp.com/api/statistics/country/${id}`, axiosConfig)
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
                setPais(res.data.country);
                setNcasostotales(res.data.cases.total);
                setNdeathstotales(res.data.deaths.total);
                setNpruebastotales(res.data.tests.total);
                setOneM_popc(res.data.cases.oneM_pop);
                setOneM_popt(res.data.tests.oneM_pop);
            })
            .catch((err) => {
                // console.log("AXIOS ERROR: ", err);
            })

    }

    const Guardar = async () => {

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token

            }
        };

        const total_casos = ncasos + ncasostotales;
        const total_muertes = deaths + ndeathstotales;
        const total_pruebas = npruebas + npruebastotales;

        const stat = {
            cases: {
                new: ncasos,
                active: ncasosactivos,
                critical: ncasoscriticos,
                recovered: ncasosrecuperados,
                oneM_pop:oneM_popc,
                total: total_casos
            },
            deaths: {
                new:deaths,
                total: total_muertes
            },
            tests:{
                oneM_pop:oneM_popt,
                total:total_pruebas
            }
        }

        console.log(stat);

        await axios.put(`https://api-covidnsource.herokuapp.com/api/statistics/${id}`, stat, axiosConfig)
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
                props.history.push('/dashboard');

            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })

    }


    return !(user) ? (
        <Redirect to="/" />
    ) : (
        <>
            <div className="container-fluid" style={styles.paddingTop}>
                <h1>editar datos del pais</h1>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">pais</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={pais} disabled />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">nuevas muertes</label>
                                <input type="number" class="form-control" id="exampleInputPassword1" value={deaths} onChange={onchangeDeath} />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">nuevas pruebas</label>
                                <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={npruebas} onChange={onchangeNpruebas} />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">casos nuevos</label>
                                <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={ncasos} onChange={onChangeNcasos} />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">nuevos casos activos</label>
                                <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={ncasosactivos} onChange={onChangeNcasosActivos} />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">nuevos casos criticos</label>
                                <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={ncasoscriticos} onChange={onChangeNcasosCriticos} />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">nuevos casos recuperados</label>
                                <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={ncasosrecuperados} onChange={onChangeNcasosRecuperados} />
                            </div>
                            <button onClick={Guardar} class="btn btn-primary">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withContext(EditCountry);