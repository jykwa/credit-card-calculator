import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { Formik } from "formik";
import Table from "react-bootstrap/Table";

// This is the API for wheretocredit
function MileageCredit() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  const url = "https://www.wheretocredit.com/api/2.0/calculate";
  let requestBody = [
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
        <Table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Airline Code</th>
              <th>Airline</th>
              <th>Redeemable Miles Earned</th>
            </tr>
          </thead>
          <tbody>
            {obj.value.totals.map(({ id, name, rdm }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{rdm.map(mile => mile + " ")}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    ));
  }

  function updateRequestBody({ origin, destination, carrier, fareClass }) {
    requestBody[0].segments[0].origin = origin;
    requestBody[0].segments[0].destination = destination;
    requestBody[0].segments[0].carrier = carrier;
    requestBody[0].segments[0].fareClass = fareClass;

    // callAPI(); // Calls the API, save it to prevent going over the limit
  }

  return (
    <div>
      <div className="row">
        <div className="col-sm">
          <h3>Find out how many miles you can earn on a revenue fare!</h3>
          <Formik
            initialValues={{
              origin: "",
              destination: "",
              carrier: "",
              fareClass: ""
            }}
            validate={values => {
              const errors = {};
              //   if (!values.travelSpend) {
              //     errors.travelSpend = "Required";
              //   } else if (values.travelSpend < 0) {
              //     errors.travelSpend = benefits.travelSpend.error;
              //   }

              //   if (!values.diningSpend) {
              //     errors.diningSpend = "Required";
              //   } else if (values.diningSpend < 0) {
              //     errors.diningSpend = benefits.diningSpend.error;
              //   }

              //   if (!values.nonBonusSpend) {
              //     errors.nonBonusSpend = "Required";
              //   } else if (values.nonBonusSpend < 0) {
              //     errors.nonBonusSpend = benefits.nonBonusSpend.error;
              //   }

              //   if (!values.loungeSpend) {
              //     errors.loungeSpend = "Required";
              //   } else if (values.loungeSpend < 0) {
              //     errors.loungeSpend = benefits.loungeSpend.error;
              //   }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                updateRequestBody(values);

                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
              /* and other goodies */
            }) => (
              <>
                <form className="d-flex flex-column" onSubmit={handleSubmit}>
                  <div>
                    <label>Origin</label>
                    <input
                      type="text"
                      name="origin"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.origin}
                    />
                    {errors.travelSpend &&
                      touched.travelSpend &&
                      errors.travelSpend}
                  </div>

                  <div>
                    <label>Destination</label>
                    <input
                      type="text"
                      name="destination"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.destination}
                    />
                    {errors.diningSpend &&
                      touched.diningSpend &&
                      errors.diningSpend}
                  </div>

                  <div>
                    <label>Carrier</label>
                    <input
                      type="text"
                      name="carrier"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.carrier}
                    />
                    {errors.nonBonusSpend &&
                      touched.nonBonusSpend &&
                      errors.nonBonusSpend}
                  </div>
                  <div>
                    <label>Fare Class</label>
                    <input
                      type="text"
                      name="fareClass"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fareClass}
                    />
                    {errors.loungeSpend &&
                      touched.loungeSpend &&
                      errors.loungeSpend}
                  </div>
                  {/*
              prereqs: 5/24, good credit history, no debt, etc. 
              
                sign up bonus, GE, trip delay/baggage insurance, roadside assistance
              
                slider?
                referral links? might need to add disclaimer or something
              */}
                  <button
                    className="btn btn-primary btn-block"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </form>
                {/* <div>These are the inputted values: {JSON.stringify(values)}</div> */}
              </>
            )}
          </Formik>

          <button onClick={callAPI}>Call the API</button>
          <p> (Data provided by wheretocredit.com)</p>
        </div>

        <div className="col-sm">
          <div>{parseData(data)}</div>
        </div>
      </div>
    </div>
  );
}

export default MileageCredit;
