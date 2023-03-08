import React, { useState , useEffect } from 'react';
import './login.css';
import image1 from './images/13.jpg'
import { BrowserRouter as Router,Link ,useNavigate} from "react-router-dom";
import Footer from './footer'
import axios from 'axios';

const Login = ()=>
{
    const [user , setUser] = useState(
        {
            emailid:"",pwd:""
        }
    );
// state used to display the error message for "Form Validation"
    const [eemail , seteemail] = useState("");
    const [epwd , setepwd] = useState("");
     
    const [valid , setValid] = useState(false);

    const handleInput = (e)=>
    {
        setUser({...user,[e.target.name]:e.target.value})
    }


    const handleSubmit =  (e)=>
    {
        e.preventDefault();
        // Email id Validation......
        if(!user.emailid)
        {
            seteemail("Email id required");
            setValid(false);
        }
        else
        {
            seteemail("");
            setValid(true);
        }
        // Password Validation.......
        if(!user.pwd)
        {
            setepwd("Password required");
            setValid(false);
        }else
        {
            setepwd("");
            setValid(true);
        }
    }

    const navigate = useNavigate();
    useEffect(()=>
        {
            if(valid)
            {
                axios.post("http://localhost:8080/login",
                {
                    email:user.emailid,
                    pwd:user.pwd
                }).then((response)=>
                {
                    if(response.data.message){
                        alert(response.data.message);
                    }else{
                        navigate("/rent")
                    }
                }).catch((error)=>
                {
                    window.alert(error);
                })

            }else{
                console.log("Record not send");            
            }            
        },[valid])

    return(
    <>
    <br/>
    <br/>
    <br/>
    <br/>
    <div className='loginMainBlock'>
        <div className='logimgBlock'>
          <img src={image1} alt="images"/>
        </div>
        <div className='logMainBlock'>            
            <div className='logBlock'>
                <p className='logo1'>Shelter.com<br/></p>
                <p className='captions'>LOGIN</p>
                    <input type="text" onChange={handleInput} className='logtxtbgcolor'placeholder='Email id' name="emailid" autoComplete="new-password"></input>
                    <span>{eemail}</span>
                    <input type="password" onChange={handleInput} className='logtxtbgcolor'placeholder='Password' name="pwd" autoComplete="new-password"></input>
                    <span>{epwd}</span>               
                    <input type="button" onClick={handleSubmit} value="Login" className='btn'></input>
                    <p className='notify'>Don't have an account ? &nbsp;<Link to="/register" className='loginlink'>Register</Link></p>                    
            </div>
        </div>
        
      

    </div>
    <div className='footerblocklogin'>
    <Footer/>
    </div>
    </>
    )
    
}

export default Login;