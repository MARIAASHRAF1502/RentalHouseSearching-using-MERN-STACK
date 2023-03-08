import React,{useState} from 'react';
import './rent.css';
import axios from 'axios';
import Rentform from './rentform'


const Rent = ()=>
{
    const [auth , setauth] = useState("");
    const [authresponse , setauthresponse] = useState(false);

    const handleauth = () =>
    {
        axios.get("http://localhost:8080/isUserAuth").then((response)=>
        {
            if(response.data.auth){
                setauthresponse(true)
            }else{
                setauthresponse(false)
                setauth("User login required to register the property")
            }
        })  
    }
    return(
    <>
    <br/>
    <br/>
    <br/>
    <br/>
    <div className='rentinfo'>
        <p>Provide all the necessary information about the property correctly, to reach out to the exact tenant</p>
        <input type="button" onClick={handleauth} value="Rent property" className='rentbtn'></input>
    </div>
    <span>{auth}</span>
    {authresponse && <Rentform/>}
    </>
    );
    
}

export default Rent;