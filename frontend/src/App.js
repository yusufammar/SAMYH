import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route} from "react-router-dom";  // react-router & react-router-dom v5.1.2
import Navbar from './components/Navbar';
import Admin from './components/Admin';
import AddFlight from './components/addFlight';   //imported object should start with uppercase letter
import FlightsList from './components/FlightsList';
import User from './components/User';
import SearchFlight from './components/SearchFlight';
function App() {
  return (
    <Router>

<Route path="/User">
<User/>
 </Route>

 <Route path="/SearchFlight">
<SearchFlight/>
 </Route>

     
       
       
       
     
      <Route path="/admin">
        
       <Admin/>
      </Route>
      
      <Route path="/addFlight">
      <AddFlight/>
      </Route>

      <Route path ="/FlightsList">
        <FlightsList/>
      </Route>
    
    

    </Router>
    
)}

export default App;
