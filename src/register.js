import React, { useEffect, useState } from 'react';
import './register.css';
import image1 from './images/14.jpg';
import Footer from './footer';
import { BrowserRouter as Router,Link ,useNavigate} from "react-router-dom";
import axios from 'axios';

const Register = ()=>
{
    const [user , setUser] = useState(
        {
          name:"", emailid:"",pno:"",pwd:"", cpwd:""
        });

    const [valid , setValid] = useState(false);

    const [ename , setename] = useState("");
    const [eemail , seteemail] = useState("");
    const [veemail , setveemail] = useState("");
    const [epno , setepno] = useState("");
    const [epwd , setepwd] = useState("");
    const [ecpwd , setecpwd] = useState("");


    const handleInput = (e)=>
    {
        setUser({...user,[e.target.name]:e.target.value});
      
        if(user.name)
        {
            setename("");
        }

        if(user.emailid)
        {
            seteemail("");
        }

        if(/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/.test(user.emailid))
        {
            setveemail("");
        }
    }

    const handleSubmit = (e)=>
    {
        e.preventDefault();    
        // username validation.... 
        if(!user.name)
        {
            setename("Username required");
            setValid(false)
        }else{
            setename("");
            setValid(true)
        }

        // Emailid Validation....
        if(!user.emailid)
        {
            seteemail("Email id required");
            setValid(false);
        }else if(!/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/.test(user.emailid))
        {
            setveemail("Invalid Email id");
            setValid(false);
        }
        else{
            setValid(true);
        }

        // Phone number Validation....
        const phoneno = new RegExp(/^\d{10}$/);
        if(!user.pno)
        {
            setValid(false);
            setepno("Phone number required");
        }
        else if(!phoneno.test(user.pno)){
            setValid(false);
            setepno("Invalid Phone Number ");
        }
        else 
        {
            setepno("");
            setValid(true);
        }

        // Password Validation....
        const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
        if(!user.pwd)
        {
            setepwd("Password required");
            setValid(false);
        }else if(!validPassword.test(user.pwd))
        {
            setValid(false);
            setepwd("Invalid Password");
        }
        else{
            setepwd("");
            setValid(true);
        }
        
        // Confirm_Password Validation....
        if(!user.cpwd)
        {
            setecpwd("Confirm password required");
            setValid(false);
        }else if(user.pwd !== user.cpwd)
        {
            setecpwd("Password mismatch")
            setValid(false);
        }
        else
        {
            setecpwd("");
            setValid(true);
        }
       
    }
   
    const navigate = useNavigate()
    // useEffect hook for final Form Submission after all the Validation....
    useEffect(()=>
        {
            if(valid)
            {
                console.log(user.pno);
                axios.post("http://localhost:8080/userdata",
                {
                    name:user.name,
                    email:user.emailid,
                    phone:user.pno,
                    pwd:user.pwd
                }).then((response)=>
                {
                    if(response.data.message){
                        alert(response.data.message);
                    }else{
                        navigate("/login")
                    }
                }).catch((error)=>
                {
                    window.alert(error+" Email id already exist, Register with another Email id or Login");
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
    <div className='registrationMainBlock'>
        <div className='imgBlock'>
          <img src={image1} alt="images"/>
        </div>
        <div className='regMainBlock'> 
          <form onSubmit={handleSubmit}>
            <div className='regBlock'>
                    <p className='logo'>Shelter.com<br/></p>
                    <p className='captions'>REGISTER YOUR DETAILS TO GET CONNECTED</p>
                        <input onChange={handleInput} type="text" className='txtbgcolor' placeholder='Full name' name="name" autoComplete="new-password"></input>
                        <span>{ename}</span>
                        <input onChange={handleInput} type="text" className='txtbgcolor'placeholder='Email id' name="emailid" autoComplete="new-password"></input>
                        <span>{eemail || veemail}</span>
                        <input onChange={handleInput} type="text" className='txtbgcolor'placeholder='Phone number' name="pno" autoComplete="new-password"></input>
                        <span>{epno}</span>
                        <input onChange={handleInput} type="password" className='txtbgcolor'placeholder='Password (A-Z, a-z, 0-9, !@#$%)' name="pwd" autoComplete="new-password"></input>
                        <span>{epwd}</span>
                        <input onChange={handleInput} type="password" className='txtbgcolor'placeholder='Confirm Password' name="cpwd" autoComplete="new-password"></input>
                        <span>{ecpwd}</span>
                        <input onClick={handleSubmit} type="submit" value="Register" className='regbtn'></input>
                        <p className='notify'>Already have an account ? &nbsp;<Link to="/login" className='loginlink'>Login</Link></p>                    
            </div>   
          </form>
        </div>
    </div>
    <div className='footerblock'>
    <Footer/>
    </div>        
    </>
    
    )
    
}

export default Register;