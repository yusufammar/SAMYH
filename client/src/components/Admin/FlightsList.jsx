import react, {useEffect,useState} from "react";
import React from "react";
import { Link } from "react-router-dom";
import { Route, Redirect, useLocation } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";



function FlightsList() {
  const location = useLocation();
  const history = useHistory();

  axios.defaults.withCredentials = true;
  
  useEffect(() => {
      
   axios.get('http://localhost:8000/currentUser').then(res =>{ 
      if (res.data=="0" || res.data.type=="Customer" || res.data.type=="Guest" ){
      alert("Access Denied, Please Sign In First");
      history.push({pathname:"/SignIn"});
      }
      // else go to admin page
   })
  }, [location]);

  
  const [flights, setflights] = useState([{
    _id : "",
    Flight_No: "",
    From: "",
    To: "",
    FlightDate: "",
    Departure: "",
    Arrival: "",
    First_Class_Seats: "",
    Business_Class_Seats: "",
    Economy_Class_Seats: "",


  }])


  var flightSelected = 0;

  function UpdateFlight(idOfFlight)
  {
      const article = { id :  idOfFlight};
      axios.post('http://localhost:3000/FlightsListVal', article)
      .then();
      window.location.href = "/UpdatePage";
  }
  
  let isChecked = false;
  let idDeleted = "";
  
  const deleteFlight = (id) => {
   
  
    if (isChecked && idDeleted == id)
    {
      axios.delete(`http://localhost:3000/delete/${id}`)
      window.location.reload();
    }
  };
  
  function handleChange(e, id) {
    isChecked = e.target.checked;
    idDeleted = id;
    
    // do whatever you want with isChecked value
  }
  
  useEffect(() => {
       fetch("/FlightsList").then(res => {
      if (res.ok) {
        return res.json();
      }
    }).then(jsonRes => setflights(jsonRes));

  }
  )

  return <div className='container'>
    <h1>All Flights</h1>
   <br></br>
       <button><Link to="/admin">Back To Admin Page</Link></button>
        <br></br><br></br>

    {flights.map(flight =>
      <div>
        <br />
        <p>
          Flight No: {flight.Flight_No}  | From: {flight.From}  | To: {flight.To} <br></br>
          Date: {flight.FlightDate} <br></br>
          Departure: {flight.Departure} | Arrival: {flight.Arrival} <br></br>
          Available Seats: First Class ({flight.First_Class_Seats}) | Business Class ({flight.Business_Class_Seats}) | Economy Class ({flight.Economy_Class_Seats})
          <br></br>
        </p>
        <label>
          Are you sure you want to delete?
          <input
            name="isGoing"
            type="checkbox"
            onChange={e => handleChange(e, flight._id)}
          />
        </label>
        <br></br>

        <button
          id="removeBtn"
          onClick={(e) => {
            deleteFlight(flight._id);
          }}
        >
          Delete </button>
       < button onClick = {() => UpdateFlight(flight._id)}>Update
</button>


      </div>
    )}
  </div>



}
export default FlightsList;