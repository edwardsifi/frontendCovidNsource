import React from 'react';
import CovidStats from './img/CovidStats.svg';

const Share = () => {
    return (
        <>
            <section class="home">
                <div class="home_container bd-grid">
                    <div class="home_img">
                        <img src={CovidStats} data-speed="-2" class="move qr_code_img" alt="" />
                    </div>
                    <div class="home_data">
                        <h1 class="home_title">Scan qr code for use this app<br /></h1>
                        <p class="home_description">let's help each other<br /> by taking the measures to prevent COVID-19</p>
                       
                    </div>
                </div>
            </section>
        </>
    )
}

export default Share;