import react, {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function User(){
    const location = useLocation();
    const history = useHistory();
    if (location.state!=null){           //checking if session exists (no url jumping) (if location.state has variables passed)
        var x= location.state.email;    
    }
    else{
    alert("Access Denied");
    history.push({
        pathname: '/Main' 
        });
    }
    
return (
<div className='container'>

<h1>Welcome</h1>
<h8>Account: {x} </h8>

<br></br><br></br>
<button><Link to="/"> Sign Out </Link></button>
<br></br><br></br>
</div>
)
} 

export default User;