import React from "react";
import "./App.css";
import { Formik } from "formik";
import benefitsSummary from "./components/BenefitsSummary.js";
import MileageCredit from "./components/MileageCredit.js";
import { benefits, CSR, CSP } from "./constants.js";

function App() {
  return (
    <div className="App">
      <header>
        Chase Sapphire Reserve vs. Chase Sapphire Preferred Calculator{" "}
      </header>
      <div className="edges">
        <Basic />
        <MileageCredit></MileageCredit>
      </div>
    </div>
  );
}

const Basic = () => {
  return (
    <Formik
      initialValues={{
        travelSpend: 0,
        diningSpend: 0,
        nonBonusSpend: 0,
        loungeSpend: 0,
        GE_TSA: 0,
        doordashSpend: 0
      }}
      validate={values => {
        const errors = {};
        if (values.travelSpend === "") {
          errors.travelSpend = "Required";
        } else if (values.travelSpend < 0) {
          errors.travelSpend = benefits.travelSpend.error;
        }

        if (values.diningSpend === "") {
          errors.diningSpend = "Required";
        } else if (values.diningSpend < 0) {
          errors.diningSpend = benefits.diningSpend.error;
        }

        if (values.nonBonusSpend === "") {
          errors.nonBonusSpend = "Required";
        } else if (values.nonBonusSpend < 0) {
          errors.nonBonusSpend = benefits.nonBonusSpend.error;
        }

        if (values.loungeSpend === "") {
          errors.loungeSpend = "Required";
        } else if (values.loungeSpend < 0) {
          errors.loungeSpend = benefits.loungeSpend.error;
        }

        if (values.GE_TSA === "") {
          errors.GE_TSA = "Required";
        } else if (values.GE_TSA < 0) {
          errors.GE_TSA = benefits.GE_TSA.error;
        }

        if (values.doordashSpend === "") {
          errors.doordashSpend = "Required";
        } else if (values.doordashSpend < 0) {
          errors.doordashSpend = benefits.doordashSpend.error;
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // alert(JSON.stringify(values, null, 2));

          // getAnswer(values);

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
          <div className="row">
            <div className="col-sm">
              <form className="d-flex flex-column" onSubmit={handleSubmit}>
                <div>
                  <label>{benefits.travelSpend.question}</label>
                  <input
                    type="number"
                    name="travelSpend"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.travelSpend}
                  />
                  {errors.travelSpend &&
                    touched.travelSpend &&
                    errors.travelSpend}
                </div>

                <div>
                  <label>{benefits.diningSpend.question}</label>
                  <input
                    type="number"
                    name="diningSpend"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.diningSpend}
                  />
                  {errors.diningSpend &&
                    touched.diningSpend &&
                    errors.diningSpend}
                </div>

                <div>
                  <label>{benefits.nonBonusSpend.question}</label>
                  <input
                    type="number"
                    name="nonBonusSpend"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nonBonusSpend}
                  />
                  {errors.nonBonusSpend &&
                    touched.nonBonusSpend &&
                    errors.nonBonusSpend}
                </div>
                <div>
                  <label>{benefits.loungeSpend.question}</label>
                  <input
                    type="number"
                    name="loungeSpend"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.loungeSpend}
                  />
                  {errors.loungeSpend &&
                    touched.loungeSpend &&
                    errors.loungeSpend}
                </div>

                <div>
                  <label>{benefits.GE_TSA.question}</label>
                  <input
                    type="number"
                    name="GE_TSA"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.GE_TSA}
                  />
                  {errors.GE_TSA && touched.GE_TSA && errors.GE_TSA}
                </div>

                <div>
                  <label>{benefits.doordashSpend.question}</label>
                  <input
                    type="number"
                    name="doordashSpend"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.doordashSpend}
                  />
                  {errors.doordashSpend &&
                    touched.doordashSpend &&
                    errors.doordashSpend}
                </div>
                {/*
              prereqs: 5/24, good credit history, no debt, etc. 
              
                sign up bonus, GE, trip delay/baggage insurance, roadside assistance
              
                slider?
                referral links? might need to add disclaimer or something
              */}
                {/* <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button> */}
                <br />
                {/* <h4>{getAnswer(values)}</h4> */}
              </form>
            </div>

            {/* <div>These are the inputted values: {JSON.stringify(values)}</div> */}

            <div className="col-sm">
              <div>
                {benefitsSummary(benefits, valuesCSR, valuesCSP, values)}
              </div>
            </div>
          </div>
        </>
      )}
    </Formik>
  );
};

function getAnswer(values) {
  let valueCSR = calculateCSR(values);
  let valueCSP = calculateCSP(values);

  return `In the first year, CSR will give you an expected value of ${valueCSR} and CSP will give you an expected value of ${valueCSP}`;
}

let valuesCSR = {
  signupBonus: 0,
  travelCredit: 0,
  travelSpend: 0,
  diningSpend: 0,
  nonBonusSpend: 0,
  loungeSpend: 0,
  GE_TSA: 0,
  doordashSpend: 0,
  annualFee: 0
};

export function calculateCSR({
  travelSpend,
  diningSpend,
  nonBonusSpend,
  loungeSpend,
  GE_TSA,
  doordashSpend
}) {
  valuesCSR.signupBonus = CSR.signupBonus;

  valuesCSR.travelCredit = Math.min(travelSpend, CSR.travelCredit);

  valuesCSR.travelSpend =
    (travelSpend - Math.min(travelSpend, CSR.travelCredit)) *
    CSR.travelMultiplier;
  valuesCSR.diningSpend = diningSpend * CSR.diningMultiplier;
  valuesCSR.nonBonusSpend = Math.round(nonBonusSpend * 0.01);
  valuesCSR.loungeSpend = loungeSpend || 0;
  valuesCSR.GE_TSA = GE_TSA || 0;
  valuesCSR.doordashSpend = doordashSpend || 0;
  valuesCSR.annualFee = -CSR.annualFee;

  return Object.values(valuesCSR).reduce((a, b) => a + b, 0);
}

let valuesCSP = {
  signupBonus: 0,
  travelCredit: 0,
  travelSpend: 0,
  diningSpend: 0,
  nonBonusSpend: 0,
  loungeSpend: 0,
  GE_TSA: 0,
  doordashSpend: 0,
  annualFee: 0
};

export function calculateCSP({
  travelSpend,
  diningSpend,
  nonBonusSpend,
  loungeSpend = 0,
  GE_TSA = 0,
  doordashSpend = 0
}) {
  valuesCSP.signupBonus = CSP.signupBonus;

  valuesCSP.travelSpend = travelSpend * CSP.travelMultiplier;
  valuesCSP.diningSpend = diningSpend * CSP.diningMultiplier;
  valuesCSP.nonBonusSpend = Math.round(nonBonusSpend * 0.01);
  valuesCSP.annualFee = -CSP.annualFee;

  return Object.values(valuesCSP).reduce((a, b) => a + b, 0);
}

export default App;
