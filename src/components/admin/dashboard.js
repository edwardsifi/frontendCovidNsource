//react
import React, { useState, useEffect } from 'react';
//components
import TableCountries from '../table/tableCountries';
import Pagination from '../Pagination/Pagination';
import Footer from '../footer';
//modulos
import { Redirect } from "react-router-dom";
import axios from 'axios';
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

const continents = [
    { nombre: 'Asia' },
    { nombre: 'Europe' },
    { nombre: 'North-America' },
    { nombre: 'Africa' },
    { nombre: 'NULL' },
    { nombre: 'South-America' },
    { nombre: 'Oceania' }
];

const Dashboard = (props) => {
    //context
    let user;
    let token;
    try {
        user = props.context.user;
        token = props.context ? props.context.user.token : null;
    } catch (error) {

    }

    useEffect(() => {
        getSync();
    }, [])

    const getSync = async () => {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        };

        await axios.get(`https://api-covidnsource.herokuapp.com/api/Sync`, axiosConfig)
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);

            })
            .catch((err) => {
                // console.log("AXIOS ERROR: ", err);
            })

    }


    //states
    //guarda el continente seleccionado
    const [continent, setContinent] = useState('');
    //guarda los datos del pais seleccionado
    const [datacountri, setDataCountry] = useState();
    //guarda los datos iniciales de los paices
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('');

    //para uso de la paginacion
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(20);

    //pais filtrado
    const [fcountries, setFCountries] = useState([]);


    //forms functions
    const onSelectContinent = (e) => {
        setContinent(e.target.value);
        getContinentsByCountry(e.target.value)
    }

    //obtiene los datos del pais seleccionado
    const onClickCountry = (countri) => {
        setDataCountry(countri)
        console.log(countri);
    }

    const onchangeCountry = async (e) => {
        setCountry(e.target.value)
        console.log(e.target.value);

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        };

        await axios.get(`https://api-covidnsource.herokuapp.com/api/statistics/${e.target.value}`, axiosConfig)
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
                setFCountries(res.data);
            })
            .catch((err) => {
                // console.log("AXIOS ERROR: ", err);
            })
    }

    //http functions
    const getContinentsByCountry = async (cont) => {

        console.log(cont);

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        };

        await axios.get(`https://api-covidnsource.herokuapp.com/api/statistics/countries/${cont}`, axiosConfig)
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
                setCountries(res.data);
                setFCountries(res.data);
            })
            .catch((err) => {
                // console.log("AXIOS ERROR: ", err);
            })

    }


    //obtiene el acutal numero de paises
    let currentPosts;
    try {
        const indexOfLastBook = currentPage * postsPerPage;
        const indexofFirstPost = indexOfLastBook - postsPerPage;
        currentPosts = fcountries.slice(indexofFirstPost, indexOfLastBook);
    } catch (error) {

    }
    console.log(currentPosts);

    //cambia la paginacion de la tabla
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    //counting tables
    let Ccountry = 0;

    return !(user) ? (
        <Redirect to='/' />
    ) : (
        <>
            <div class="container" style={styles.paddingTop}>
                <h1>Estadisticas del covid</h1>

                <div className="row">
                    <div className="col-6 col-md-4">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="nombre del pais" aria-label="Recipient's username" aria-describedby="basic-addon2" value={country} onChange={onchangeCountry} />
                        </div>
                    </div>
                </div>

                <div className="row ">

                    <div className="col-6 col-md-4">
                        <div>
                            <label>seleccione el continente</label>
                            <select value={continent} onChange={onSelectContinent} class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                                <option value='' selected>{''}</option>
                                {
                                    continents.map(continent => (
                                        <option>{continent.nombre}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col-6 col-md-4">
                        <TableCountries Ccountries={currentPosts} loading={loading} selectedC={(countri) => onClickCountry(countri)} />
                        <Pagination postsPerPage={postsPerPage} totalPosts={fcountries.length} paginate={paginate} />
                    </div>
                </div>



                    
                        <table class=" table caption-top">
                            <caption>Dasos del covid del pais {datacountri ? datacountri.country : <></>}</caption>
                            <thead className="">
                                <tr>
                                    <th scope="col">cases</th>
                                    <th scope="col">day</th>
                                    <th scope="col">deaths </th>
                                    <th scope="col">population</th>
                                    <th scope="col">tests</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                <tr >
                                    <th  scope="row">
                                        <p>casos criticos: {datacountri ? datacountri.cases.critical : <></>}</p>
                                        <p>casos nuevos: {datacountri ? datacountri.cases.new : <></>}</p>
                                        <p>casos por millon: {datacountri ? datacountri.cases.oneM_pop : <></>}</p>
                                        <p>total recuperados: {datacountri ? datacountri.cases.recovered : <></>}</p>
                                        <p>casos totales: {datacountri ? datacountri.cases.total : <></>}</p>
                                    </th>
                                    <td >
                                        <p>ultima actualizacion: {datacountri ? datacountri.day : <></>}</p>
                                    </td>
                                    <td>
                                        <p>nuevas muertes: {datacountri ? datacountri.deaths.new : <></>}</p>
                                        <p>muertes totales: {datacountri ? datacountri.deaths.total : <></>}</p>
                                    </td>
                                    <td>
                                        <p>poblacion: {datacountri ? datacountri.population : <></>}</p>
                                    </td>
                                    <td>
                                        <p>pruebas por millon: {datacountri ? datacountri.tests.oneM_pop : <></>}</p>
                                        <p>pruebas totales: {datacountri ? datacountri.tests.total : <></>}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    
               


            </div>

            <Footer />
        </>
    );
}

export default withContext(Dashboard);