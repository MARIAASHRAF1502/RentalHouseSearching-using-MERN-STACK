import axios from 'axios';
import React,{useState,useEffect} from 'react';
import './buy.css';
import image from './images/house.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone} from '@fortawesome/free-solid-svg-icons'
import { faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {faUser} from '@fortawesome/free-solid-svg-icons';


const Admindelete = ()=>
{
    const [user , setUser] = useState(
        {
            id:""
        }
    );

    const [data , setdata] = useState([]);
    const [nodata , setnodata] = useState();

    const handleInput = (e)=>
    {
        setUser({...user,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e)=>
    {
        e.preventDefault();
        if(user.id=="")
        {
            setnodata("Property id required");
        }else{
            setnodata("");
            axios.post("http://localhost:8080/delete",{
            id:user.id
    });

    }
}

useEffect(()=>
{
    axios.post("http://localhost:8080/adminsearch").then((res)=>
    {
        setdata(res.data.message);
    },[])

})
    return(
    <>
    <br/>
    <br/>
    <br/>
    <br/>
    <input type="text" name="id" onChange={handleInput} placeholder="Enter the property id"/>
    <input type="text" name="id" onChange={handleInput} placeholder="Enter the reason"/>
    <span>{nodata}</span>
    <input type="submit" className='btndelete' onClick={handleSubmit} value="Delete"/>
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
    </>
    )
    
}


export default Admindelete;