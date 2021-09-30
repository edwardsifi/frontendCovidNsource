import React, { useState, useEffect } from "react";

//modulos
import { Redirect } from "react-router-dom";
import axios from 'axios';
//context
import withContext from "../../withContext";

//components
import Countries from './Countries';
import Pagination from '../pagination/Pagination';
import Footer from '../Footer';
import Pagination2 from "../pagination/Pagination2";

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
        console.log(user);
    } catch (error) {

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
    const [postsPerPage, setPostsPerPage] = useState(10);

    //pais filtrado
    const [fcountries, setFCountries] = useState([]);

    useEffect(() => {
        getSync();
    }, [])

    //functions
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
        console.log(pageNumber);
    }

    const loadMore = () => {
        setPostsPerPage(postsPerPage + 5);
    }

    //counting tables
    let Ccountry = 0;


    return !(user) ? (
        <Redirect to='/' />
    ) : (
        <>
            {/* <!-- main --> */}

            <main class="l-main">


                <section class="dashboard section">
                    <div class="signup__container bd-container bd-grid">
                        <h2 class="section-title-center signup__title">Covid 19 statistics</h2>
                        <p class="signup__description">Stay informed with us about covid-19 cases</p>
                        <div class="log-grid" action="">
                            <div class="signup__direction">
                                <input type="text" placeholder="Type country" class="signup__input" value={country} onChange={onchangeCountry} />
                                {/* <a href="#" class="button"></a> */}
                            </div>
                            <div class="signup__direction">

                                {/* <!-- Default dropend button --> */}
                                <div class="btn-group dropend">
                                    <select value={continent} onChange={onSelectContinent} class="form-select" aria-label="Default select example">
                                        <option value='' selected>{''}</option>
                                        {
                                            continents.map(continent => (
                                                <option>{continent.nombre}</option>
                                            ))
                                        }
                                    </select>
                                    <p>Select the continent</p>
                                </div>

                            </div>
                            <Countries Ccountries={currentPosts} loading={loading} selectedC={(countri) => onClickCountry(countri)} />
                            <Pagination2 currentPage={currentPage} postsPerPage={postsPerPage} totalPosts={fcountries.length} paginate={paginate} loadmore={loadMore} />
                        </div>
                        <div class="table_container">
                            <div class="table-responsive">

                                <ul class="">
                                    <li><h5 class="dropdown-item-text">Data country: {datacountri ? datacountri.country : <>NA</>}</h5></li>
                                    <li><span class="dropdown-item-text">Day: {datacountri ? datacountri.day : <>NA</>}</span></li>
                                    <li><span class="dropdown-item-text">Cases critics: {datacountri ? datacountri.cases.critical : <>NA</>}</span></li>
                                    <li><span class="dropdown-item-text">New cases: {datacountri ? datacountri.cases.new : <>NA</>}</span></li>
                                    <li><span class="dropdown-item-text">casos por millon: {datacountri ? datacountri.cases.oneM_pop : <>NA</>}</span></li>
                                    <li><span class="dropdown-item-text">total recuperados: {datacountri ? datacountri.cases.recovered : <>NA</>}</span></li>
                                    <li><span class="dropdown-item-text">casos totales: {datacountri ? datacountri.cases.total : <>NA</>}</span></li>
                                    <li><span class="dropdown-item-text">nuevas muertes: {datacountri ? datacountri.deaths.new : <>NA</>}</span></li>
                                    <li><span class="dropdown-item-text">muertes totales: {datacountri ? datacountri.deaths.total : <>NA</>}</span></li>
                                    <li><span class="dropdown-item-text">poblacion: {datacountri ? datacountri.population : <>NA</>}</span></li>
                                    <li><span class="dropdown-item-text">pruebas por millon: {datacountri ? datacountri.tests.oneM_pop : <>NA</>}</span></li>
                                    <li><span class="dropdown-item-text">pruebas totales: {datacountri ? datacountri.tests.total : <>NA</>}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>


                </section>



            </main>
            <Footer />
        </>
    )
}

export default withContext(Dashboard);