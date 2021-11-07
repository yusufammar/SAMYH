const express = require("express");
//const { FlightsList } = require("../../frontend/src/components/FlightsList");
const router= express.Router();
//const flight = require('../Models/Flights.js');
const flight = require('../Models/Flights.js');

router.route("/addFlight").post((req,res) => {
  const flightNo= req.body.flightNo;
  const from= req.body.from;
  const to= req.body.to;
  const date= req.body.date;
  const departure= req.body.departure;
  const arrival= req.body.arrival;
  const firstSeats= req.body.firstSeats;
  const businessSeats= req.body.businessSeats;
  const economySeats= req.body.economySeats;

  const newFlight= new flight({
    Flight_No: flightNo, 
    From: from,
    To: to,
    FlightDate: date, 
    Departure: departure,
    Arrival: arrival,
    First_Class_Seats: firstSeats,
    Business_Class_Seats: businessSeats,
    Economy_Class_Seats:  economySeats
   
  });

  newFlight.save();
});

router.route("/FlightsList").get((req,res)=>{
  flight.find()
  .then(foundflights => res.json(foundflights))
})




/*
app.get("/newFlight",(req,res)=>{
  const me = new flight({
  From  : "Cairo",
   To : "Berlin",
    Cabin : "Economy",
    FlightDate: 12-12-2021 ,
    Available_Seats_on_Flight : 21
});
  me.save();  });
*/

module.exports= router;
