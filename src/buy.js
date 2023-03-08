import axios from 'axios';
import React,{useState} from 'react';
import './buy.css';
import image from './images/house.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone} from '@fortawesome/free-solid-svg-icons'
import { faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {faUser} from '@fortawesome/free-solid-svg-icons';

const Buy = ()=>
{
    const [city , setcity] = useState("");
    const [data , setdata] = useState([]);
    const [nodata , setnodata] = useState();


    const handleInput = (e)=>
    {
        setcity(e.target.value);
    }

    const handleSubmit =async (e)=>
    {
        e.preventDefault();
        if(city=="")
        {
            setnodata("City name required");
        }else{
        axios.post("http://localhost:8080/search",{city:city}).then((res)=>
        {
            if(res.data.message=="")
            {
                setnodata("Property not available for the above city");
            }
            else
            {
                setnodata("");
            }
            setdata(res.data.message);
            console.log(data);
        }).catch((err)=>
        {
            console.log("Error occured");
        })
    }
    }
    return(
    <>
    <br/>
    <br/>
    <br/>
    <br/>
    <input type="text" name="city" onChange={handleInput} placeholder="Enter the City name"/>
    <input type="submit" className='btn1' onClick={handleSubmit} value="search"/>
    <br/>
    <div>
        <span>{nodata}</span>
        {
            data.map((value)=>
            {
                return (
                    <>
                    <div className='mainBlock'>
                        <div className='imageBlock'>
                            <img src={image} width="130px" alt="houseImage"></img>
                        </div>
                    <div className='paginationBlock'>
                        <div><b>Property id : </b>{value.propertyid}</div>
                        <div><b>{value.bhktype}</b> <b>{value.furnishing}</b> House For Rent in <b>{value.street.toUpperCase()}</b> with <b>{value.size}</b> sqt </div>
                        <br/>
                        <div><b>Rent Cost :</b>  &#8377;{value.cost}/Month&nbsp;&nbsp; <b>Deposit Amount:</b> &#8377; {value.deposit}</div>
                        <div><b>Preferred Tenant :</b> {value.preferredTenant} &nbsp; &nbsp; <b>Non-Veg Allowed :</b> {value.nonvegAllowed} </div>
                        <div><b>Parking Facility :</b> {value.parkingFacility} &nbsp; &nbsp; <b>Water Supply :</b> {value.waterSupply} </div>
                        <div><b>Latitude :</b> {value.latitude}  &nbsp; &nbsp; <b>Longitude :</b> {value.longitude}</div>
                        <br/>
                        <div><b>ADDRESS :</b></div>
                        <div className='address'>{value.address.toUpperCase()} - {value.pincode}</div>
                        <br/>
                        <div><b>CONTACT</b></div>
                        <div className='contact1'><FontAwesomeIcon icon={faUser}/>&nbsp; &nbsp;{value.uname}</div>
                        <div className='contact1'><FontAwesomeIcon icon={faEnvelope}/>&nbsp; &nbsp;{value.emailid}</div>
                        <div className='contact1'><FontAwesomeIcon icon={faPhone}/>&nbsp; &nbsp;{value.pno}</div>
                    </div>
                    </div>
                    
                    </>
                    
                );
                
            })
        }
    </div>
    </>
    )
    
}

export default Buy;