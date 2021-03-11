//react
import React from 'react';

//modulos
import { NavLink } from 'react-router-dom'

const TableCountries = ({ Ccountries, loading, selectedC }) => {

    const showCountry = (countri) => {
        selectedC(countri);
    }

    //contador
    let Ccountry = 0;
    let cantidad = Ccountries ? Ccountries : [];
    console.log(Ccountries);
    return (
        <>

            <div className="row">
                <div className="col-6 col-md-4">
                    <table class="table caption-top">
                        <caption>Seleccione el pais</caption>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">country</th>
                                <th scope="col">Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                cantidad.map(countri => (
                                    <tr>
                                        <th scope="row">{Ccountry++}</th>
                                        <td>{countri.country}</td>
                                        <td>
                                            <button type="button" class="btn btn-primary" onClick={() => showCountry(countri)}>Ver datos</button>
                                        </td>
                                        <td>
                                            <NavLink className="waves-effect waves-light btn" to={"/editcountry/" + countri._id}>Editar </NavLink>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
}

export default TableCountries;

