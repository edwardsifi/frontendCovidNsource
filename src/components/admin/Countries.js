import React from 'react';

//modulos
import { NavLink } from 'react-router-dom';

const Contries = ({ Ccountries, loading, selectedC }) => {

    const showCountry = (countri) => {
        selectedC(countri);
    }

    //contador
    let Ccountry = 0;
    let cantidad = Ccountries ? Ccountries : [];
    console.log(Ccountries);

    return (
        <>
            <div class="signup__direction">

                <ul class="">
                    <li><span class="dropdown-item-text">Choose the Country</span></li>
                    {
                        cantidad.map(countri => (
                            <li>
                                <button onClick={() => showCountry(countri)} class="dropdown-item" >{countri.country}</button>
                                {/* <NavLink className="waves-effect waves-light btn" to={"/editcountry/" + countri._id}>Editar </NavLink> */}
                            </li>
                        ))
                    }
                </ul>

            </div>
        </>
    )
}

export default Contries;