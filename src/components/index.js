import React from 'react';
import Footer from './footer';

const index = () => {
    return (
        <>


            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://www.paho.org/sites/default/files/styles/flexslider_full/public/2020-03/blue-covid-banner.jpg" class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src="https://www.paho.org/sites/default/files/styles/flexslider_full/public/hero/2020-03/covid-19-1190x574-2-full.jpg" class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src="https://www.3tres3.com/3tres3_common/art/3tres3/44573/covid19_160087.jpg" class="d-block w-100" alt="..." />
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

            {/* <!-- Container (The Band Section) --> */}
            <div id="band" class="container text-center">
                <h3>Coronavirus</h3>
                <p><em>pandemia mundial!</em></p>
                <p>Los síntomas más habituales son los siguientes:
                Fiebre
                Tos seca
                Cansancio
                Otros síntomas menos comunes son los siguientes:
                Molestias y dolores
                Dolor de garganta
                Diarrea
                Conjuntivitis
                Dolor de cabeza
                Pérdida del sentido del olfato o del gusto
                Erupciones cutáneas o pérdida del color en los dedos de las manos o de los pies</p>
                <br></br>
                <div class="row">
                    <div class="col-sm-4">
                        <p class="text-center"><strong>Fiebre</strong></p><br></br>
                        <a href="#demo" data-toggle="collapse">
                            <img src="https://image.freepik.com/vector-gratis/hombre-enfermo-fiebre-midiendo-temperatura-corporal-termometro-sosteniendo-bolsa-hielo-cabeza_8183-285.jpg" class="img-circle person" alt="Random Name" width="255" height="255" />
                        </a>
                    </div>
                    <div class="col-sm-4">
                        <p class="text-center"><strong>Tos seca</strong></p><br></br>
                        <a href="#demo2" data-toggle="collapse">
                            <img src="http://tukol.com.mx/funciona/wp-content/uploads/2019/02/shutterstock_680051710-300x300.jpg" class="img-circle person" alt="Random Name" width="255" height="255" />
                        </a>
                    </div>
                    <div class="col-sm-4">
                        <p class="text-center"><strong>Cansancio</strong></p><br></br>
                        <a href="#demo3" data-toggle="collapse">
                            <img src="https://static2.abc.es/media/bienestar/2021/01/15/cansancio-2-kTu--510x349@abc.jpg" class="img-circle person" alt="Random Name" width="255" height="255" />
                        </a>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    )
}

export default index;