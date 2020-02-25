import React, { useState } from "react";
import "../App.css";
import axios from "axios";

// This is the API for wheretocredit
function MileageCredit() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  const url = "https://www.wheretocredit.com/api/2.0/calculate";
  const requestBody = [
    {
      id: "abcdxyz",
      ticketingCarrier: "UA",
      baseFareUSD: 483.9,
      segments: [
        {
          origin: "SFO",
          destination: "HKG",
          // departure: "2016-02-04T18:57:00.000Z",
          carrier: "UA",
          operatingCarrier: "UA",
          bookingClass: "W"
          // flightNumber: "472"
        }
      ]
    }
  ];

  function callAPI() {
    axios
      .post(url, requestBody)
      .then(function(response) {
        // handle success
        console.log(response.data.value);
        setData(response.data.value);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  }

  function parseData(data) {
    return data.map((obj, index) => (
      <div>
        {JSON.stringify(obj.value.totals)}

        {obj.value.totals.map(({ id, name, rdm }) => (
          <p key={index}>
            {id} {name} {rdm.map(mile => mile + " ")}
          </p>
        ))}
      </div>
    ));
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={callAPI}>Call the API</button>
      <div>{parseData(data)}</div>
      <p>data should be above here (Data provided by wheretocredit.com)</p>
    </div>
  );
}

export default MileageCredit;
