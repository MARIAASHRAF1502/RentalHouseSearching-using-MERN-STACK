import React from 'react';
import image1 from './images/4.jpg'
import image2 from './images/6.jpg'
import image3 from './images/12.jpg'
import { useState } from 'react';
import { BrowserRouter as Router,Link} from "react-router-dom";
import Footer from './footer';
import './home.css';


const Home = ()=>
{
    const [para] = useState("A home is an essential need of every human, it was the place where we can share love, emotions and spend good time. If you wanna rent your house share your property with us, you will get a good tenant soon");
    return(
        <>
            <div className='homePageBorderBlock'>
                <div className='homeblock'>
                    <div className='para'>
                        {para}
                    </div>
                    <div className='imageblock'>
                        <img src={image1} alt="images"/>
                    </div>
                </div>
                <p className='message'>Hey, What are you looking for</p>
                <div className='optionblock'>        
                    <div className='optionblock1'>
                        <img src={image2} alt="images"/>
                        <p>Sharing your property would help for, who looking for that</p>
                        <div className='btnblock'><Link to="/rent" className='rent'>Rent</Link></div>
                    </div>
                        <div className='optionblock2'>
                                <img src={image3} alt="images"/>
                            <p>Expect to move to a new house, hurry up don’t wait anymore</p>
                            <div className='btnblock'><Link to="/buy" className='rent'>Buy</Link></div>
                        </div>
                </div>
            </div>
            <Footer/>
        </>
    )

}


export default Home;