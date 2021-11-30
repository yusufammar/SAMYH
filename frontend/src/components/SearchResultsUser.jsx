import react, {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";



function SearchResultsUser(){           //for USER & GUEST
   const location = useLocation();
   const history = useHistory();
   
   if (location.state!=null){           //checking if session exists (no url jumping) (if location.state has variables passed)
       var x= location.state.email;    
   }
   else{
   alert("Access Denied, Please Sign In first!");
   history.push({
       pathname: '/SignIn' 
       });
   }

    
   
    const [flights , setflights] = useState([{ 
        Flight_No:"", From:"", To:"", FlightDate:"" , Departure:"" , Arrival:"", Duration:"", 
        First_Class_Seats:"",  Business_Class_Seats:"",   Economy_Class_Seats:"",
        First_Class_BaggageAllowance:"", Business_Class_BaggageAllowance:"",  Economy_Class_BaggageAllowance:"", 
        First_Class_Price:"", Business_Class_Price:"",  Economy_Class_Price:"" 
    }])
    
    
    var from1= location.state.from; var to1= location.state.to; var date1= location.state.date; var departure1= location.state.departure;
   var arrival1= location.state.arrival; var cabin1= location.state.cabin; var seats1= location.state.seats; var price1= location.state.price; 
    
   useEffect(() => {
        const article = { from: from1 , to: to1 , date: date1 , departure: departure1 , arrival: arrival1, 
      cabin: cabin1 , seats: seats1, price: price1 };
    axios.post('http://localhost:8000/searchFlightUser', article)
    .then(jsonRes =>{ 
        if (jsonRes.data == 0){
        alert("Please Select Cabin, when searching by seats or price");
        history.push({
            pathname: '/SearchFlightsUser',
            state: {email: x }                // for session 
                 
        });
    }
        if (jsonRes.data == 1){
            alert("No results, Please Search again");
            history.push({
                pathname: '/SearchFlightsUser',
                state: {email: x }                // for session 
                     
            });
    }
        (setflights(jsonRes.data)) }
    
    );
    }, [location]);

    function handleclick(event){
        event.preventDefault();
        if (x.includes("guest")){       // redirects to guest main page if email is guest email
            history.push({
                pathname: '/guest',
                state: {email : x}  
        })}
        else {                        // redirects to user main page if email is user email
        history.push({
        pathname: '/user',
        state: {email : x}
        })
    }
    }

  function handleclick1(event){
   event.preventDefault();
  
   history.push({
   pathname: '/SearchFlightsUser',
   state: {email : x}
});
}

function handleclick2(event){
    event.preventDefault();
    var flightNumber= event.target.id;
   // console.log(event.target.id);   // to get id of the button clicked (jsx/react/frontend)
    history.push({
    pathname: '/BookDepartureFlightUser',
    state: {email : x, departureFlightNo: flightNumber, 
        from: from1 , to: to1 , date: date1 , departure: departure1 , arrival: arrival1, 
        cabin: cabin1 , seats: seats1, price: price1}
    
 });
 }

   return( <div className='container'>
       <h1>Select Departure Flight</h1>
       
       <br></br>
       <button onClick={handleclick}>Back To Main Page</button>
        <br></br><br></br>

        <button onClick={handleclick1}>Search Again</button>
        <br></br><br></br>

       {flights.map(flight =>
       <div>
        <br/>
       <p> 
        Flight No: {flight.Flight_No}  | From: {flight.From}  | To: {flight.To}  | Date: {flight.FlightDate}  <br></br> 
        Departure Time: {flight.Departure}  | Arrival Time: {flight.Arrival}  | Duration: {flight.Duration}   <br></br>
        
        First Class: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Seats Available ({flight.First_Class_Seats}) | Baggage Allowance ({flight.First_Class_BaggageAllowance}) | Price ({flight.First_Class_Price})   
        &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <button  id={flight.Flight_No} onClick={handleclick2}> Select Departure Flight </button>    <br></br>
        
        Business Class: &nbsp;&nbsp;Seats Available ({flight.Business_Class_Seats}) | Baggage Allowance ({flight.Business_Class_BaggageAllowance}) | Price ({flight.Business_Class_Price})  <br></br>
                
        Economy Class: &nbsp;Seats Available ({flight.Economy_Class_Seats}) | Baggage Allowance ({flight.Economy_Class_BaggageAllowance}) | Price ({flight.Economy_Class_Price})  <br></br> 
      
       <br></br>
       </p>
</div>
       )}
   </div>

       

   
   );
}
export default SearchResultsUser;