import React from 'react';
import { BrowserRouter as Router, Routes,Route,Link} from "react-router-dom";
import Home from './home';
import Rent from './rent';
import Buy from './buy';
import Login from './login';
import Register from './register';
import Admin from './admin';
import './header.css';

const App = ()=>
{
    return(
        <>
        <Router>
            <div className='headerblock'>
            <div className='headertitle'>
                <p>Shelter.com</p>
            </div>
            <div className='link'>  
                <Link to="/" className='a'>Home</Link>
                <Link to="/rent" className='a'>Rent</Link>
                <Link to="/buy" className='a'>Buy</Link>
                <Link to="/admin" className='a'>Admin</Link>
                <Link to="/login" className='a'>Login</Link>
                <Link to="/register" className='a'>Register</Link>      
            </div>  
            </div>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/rent" element={<Rent/>} />
              <Route path="/buy" element={<Buy/>} />
              <Route path="/admin" element={<Admin/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
            </Routes>
        </Router>          
        </>
    
    )
}

export default App;
