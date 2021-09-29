import React from "react";

const Footer = () => {
    return (
        <>
            {/* footer  */}
            <footer class="footer section">
                <div class="footer__container bd-container bd-grid">

                    {/* <div class="footer__content">
                <h3 class="footer__title">
                    <a href="" class="footer__logo"></a>
                </h3>
                <p class="footer__description"><br/> </p>
            </div>  */}

                    {/* <div class="footer__content">
                <h3 class="footer__title"></h3>

                <ul>
                    <li>
                        <a href="#" class="footer__link"></a>
                    </li>
                    <li>
                        <a href="#" class="footer__link"></a>
                    </li>
                    <li>
                        <a href="#" class="footer__link"></a>
                    </li>
                </ul>
            </div>  */}

                    {/* <div class="footer__content">
                <h3 class="footer__title"></h3>

                <ul>
                    <li>
                        <a href="#" class="footer__link"></a>
                    </li>
                    <li>
                        <a href="#" class="footer__link"></a>
                    </li>
                    <li>
                        <a href="#" class="footer__link"></a>
                    </li>
                </ul>
            </div>  */}

                    <div class="footer__content">
                        <h3 class="footer__title">Social</h3>
                        <a href="https://www.facebook.com/softsysDev" target="_blank" class="footer__social"><i class='bx bxl-facebook-circle'></i></a>
                        <a href="https://github.com/edwardsifi" target="_blank" class="footer__social"><i class='bx bxl-github'></i></a>
                        <a href="https://www.linkedin.com/in/eduardo-bogran-463621196/" target="_blank" class="footer__social"><i class='bx bxl-linkedin-square'></i></a>
                        <a href="https://wa.me/50587132507" target="_blank" class="footer__social"><i class='bx bxl-whatsapp'></i></a>
                    </div>

                </div>

                <p class="footer__copy">&#169; Eduardo Bogran softsysdev derechos reservados</p>

            </footer>
        </>
    )
}

export default Footer;