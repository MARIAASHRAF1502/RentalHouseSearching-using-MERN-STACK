import React from 'react';
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone} from '@fortawesome/free-solid-svg-icons'
import { faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {faFacebook} from '@fortawesome/free-brands-svg-icons'
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faTwitter} from '@fortawesome/free-brands-svg-icons'


const Footer = ()=>
{
    return(
    <>
    <footer>
        <div className='footerBlock'>
            <div className='icons'>
                <div><a href="https://www.instagram.com/mari_ashraf_jp/" target="_blank"><FontAwesomeIcon icon={faFacebook} className='facebook'/></a></div>
                <div><a href="https://www.instagram.com/mari_ashraf_jp/" target="_blank"><FontAwesomeIcon icon={faInstagram} className='instagram'/></a></div>
                <div><a href="https://www.instagram.com/mari_ashraf_jp/" target="_blank"><FontAwesomeIcon icon={faTwitter} className='twitter'/></a></div>
            </div>
            <div className='copyright'>Copyright &#169; 2022 | All rights reserverd</div>
                <div className='contactBlock'><p className='value'>CONTACT</p>
                    <div className='contact'><FontAwesomeIcon icon={faPhone}/>&nbsp;0416 223383</div>
                    <div className='contact'><FontAwesomeIcon icon={faEnvelope}/>&nbsp;customersupport&#64;shelter.com</div> 
                </div>
        </div>
    </footer>
    </>
    )
    
}

export default Footer;