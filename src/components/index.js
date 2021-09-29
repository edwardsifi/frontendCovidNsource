import React from "react";
//modulos
import { NavLink } from 'react-router-dom';
//components
import Footer from "./Footer";
//context
import withContext from "../withContext";


const Index = () => {
    return (
        <>
            {/* main */}

            <main class="l-main">

                <section class="home">
                    <div class="home_container bd-grid">
                        <div class="home_img">
                            <img src="https://www.labcitec.mx/covid19/images/2.png" data-speed="-2" class="move" alt="" />
                        </div>
                        <div class="home_data">
                            <h1 class="home_title">CovidStats<br /></h1>
                            <p class="home_description">let's help each other<br /> by taking the measures to prevent COVID-19</p>                           
                            <NavLink to="/singup" className="home_button">Sign Up</NavLink>
                        </div>
                    </div>
                </section>

                {/* SYMPTOMS */}
                <section class="symptoms section bd-container" id="symptoms">
                    <h2 class="section-title">symptoms of covid 19 <br /></h2>

                    <div class="symptoms__container symtoms-grid">

                        <div class="symptom__data">
                            <img src="https://www.pacificasalud.com/Imagenes/Noticias/1584720875243-28cf6efd7fb3dfeb6cd2a8e6c7e8597d.png" alt="" class="symptom__img" />
                            <h2 class="symptom__title">high fever</h2>
                            {/* <a href="#" class="button button-link">Comprar</a> */}
                        </div>

                        <div class="symptom__data">
                            <img src="https://i.pinimg.com/originals/52/1a/14/521a14881c7f8e768412f3cc2672fa58.png" alt="" class="symptom__img" />
                            <h2 class="symptom__title">cough</h2>
                            {/* <a href="#" class="button button-link">Comprar</a> */}
                        </div>

                        <div class="symptom__data">
                            <img src="https://cdn-icons-png.flaticon.com/512/2888/2888908.png" alt="" class="symptom__img" />
                            <h2 class="symptom__title">weariness</h2>
                            {/* <a href="#" class="button button-link">Comprar</a>  */}
                        </div>

                    </div>

                </section>
            </main>
            <Footer/>
        </>
    )
}

export default Index;