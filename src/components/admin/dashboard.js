//react
import React, {useState} from 'react';

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

const continents = [ 
    { nombre:'Asia'},
    { nombre: 'Europe'},
    { nombre: 'North-America'},
    { nombre: 'Africa'},
    {nombre: 'NULL'},
    {nombre: 'South-America'},
    {nombre: 'Oceania'}
];

const Dashboard = (props) => {
    //context
    const { user } = props.context;
    const {token} = props.context;

    //states
    const [continent, setContinent] = useState('');


    //forms functions
    const onSelectContinent = (e) => {
        setContinent(e.target.value);
        getContinentsByCountry(e.target.value)
    }

    //http functions
    const getContinentsByCountry = (cont) => {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token

            }
        };
    }

    return !(user) ? (
        <Redirect to='/' />
    ) : (
        <>
            <div class="container-fluid" style={styles.paddingTop}>
                <h1>Estadisticas del covid</h1>


                <div className="row ">

                    <div className="col-6 col-md-4">
                        <div>
                            <label>seleccione el continente</label>
                            <select value={continent} onChange={onSelectContinent} class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                            <option value='' selected>{''}</option>
                                {
                                    continents.map(continent =>(
                                        <option>{continent.nombre}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    <div className="col-6 col-md-4">
                        <ul class="list-group">
                            <li class="list-group-item">An item</li>
                            <li class="list-group-item">A second item</li>
                            <li class="list-group-item">A third item</li>
                            <li class="list-group-item">A fourth item</li>
                            <li class="list-group-item">And a fifth one</li>
                        </ul>
                    </div>


                </div>

                <div className="row">

                    <table class="table caption-top">
                        <caption>List of users</caption>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    );
}

export default withContext(Dashboard);