import axios from 'axios';
import React,{useState} from 'react';
import './buy.css';
import Admindelete from './admindelete';


const Admin = ()=>
{
    const [user , setUser] = useState(
        {
            emailid:"",pwd:""
        }
    );

    const [nodata , setnodata] = useState();
    const [ valid , setvalid ] = useState(false);

    const handleInput = (e)=>
    {
        setUser({...user,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e)=>
    {
        e.preventDefault();
        if(user.emailid=="" & user.pwd=="")
        {
            setnodata("All fields are required");
        }else{
            setnodata("");
            axios.post("http://localhost:8080/adminlogin",{
            email:user.emailid,pwd:user.pwd
    }).then((response)=>{
        setvalid(response.data.auth)
}).catch((err)=>
{ 
});

    }
}
    return(
    <>
    <br/>
    <br/>
    <br/>
    <br/>
    <p className='captions'>ADMIN LOGIN</p>
    <input type="text" onChange={handleInput} className='logtxtbgcolor'placeholder='Email id' name="emailid" autoComplete="new-password"></input>
    <input type="password" onChange={handleInput} className='logtxtbgcolor'placeholder='Password' name="pwd" autoComplete="new-password"></input>
    <span>{nodata}</span>               
    <input type="button" onClick={handleSubmit} value="Login" className='btn'></input> 
    {valid && <Admindelete/>}
    </>
    )
    
}


export default Admin;