import React from "react";
import "./App.css";
import { Formik } from "formik";
import benefitsSummary from "./components/BenefitsSummary.js";

function App() {
  return (
    <div className="App">
      <div>
        Chase Sapphire Reserve vs. Chase Sapphire Preferred Calculator
        <Basic />
      </div>
    </div>
  );
}

const benefits = {
  travelSpend: {
    question: "How much do you spend on travel each year?",
    error: "Invalid travel spend amount"
  },
  diningSpend: {
    question: "How much do you spend on dining each year?",
    error: "Invalid dining spend amount"
  },
  nonBonusSpend: {
    question: "How much do you spend on non-bonus categories each year?",
    error: "Invalid non-bonus spend amount"
  },
  loungeSpend: {
    question:
      "How much do you value for Priority Pass lounge access for you + 2 guests?",
    error: "Invalid lounge spend amount"
  },
  signupBonus: {
    question: "Signup Bonus amount"
  },
  travelCredit: {
    question: "Travel Credit (CSR, does not earn points)"
  }
};

const Basic = () => {
  return (
    <div>
      <Formik
        initialValues={{
          travelSpend: 0,
          diningSpend: 0,
          nonBonusSpend: 0,
          loungeSpend: 0
        }}
        validate={values => {
          const errors = {};
          if (!values.travelSpend) {
            errors.travelSpend = "Required";
          } else if (values.travelSpend < 0) {
            errors.travelSpend = benefits.travelSpend.error;
          }

          if (!values.diningSpend) {
            errors.diningSpend = "Required";
          } else if (values.diningSpend < 0) {
            errors.diningSpend = benefits.diningSpend.error;
          }

          if (!values.nonBonusSpend) {
            errors.nonBonusSpend = "Required";
          } else if (values.nonBonusSpend < 0) {
            errors.nonBonusSpend = benefits.nonBonusSpend.error;
          }

          if (!values.loungeSpend) {
            errors.loungeSpend = "Required";
          } else if (values.loungeSpend < 0) {
            errors.loungeSpend = benefits.loungeSpend.error;
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
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
            <form
              className="d-flex flex-column container"
              onSubmit={handleSubmit}
            >
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
              {/*
              prereqs: 5/24, good credit history, no debt, etc. 
              
                sign up bonus, GE, trip delay/baggage insurance, roadside assistance
              
                slider?
                referral links? might need to add disclaimer or something
              */}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
            <div>These are the inputted values: {JSON.stringify(values)}</div>
            <div>{getAnswer(values)}</div>
            <div>{benefitsSummary(benefits, valuesCSR, valuesCSP)}</div>
          </>
        )}
      </Formik>
    </div>
  );
};
const CSR = {
  signupBonus: 500,
  travelCredit: 300,
  travelMultiplier: 0.03,
  diningMultiplier: 0.03,
  annualFee: 550,
  portalMultiplier: 1.5
};

const CSP = {
  signupBonus: 600,
  travelMultiplier: 0.02,
  diningMultiplier: 0.02,
  annualFee: 95,
  portalMultiplier: 1.25
};

function getAnswer(values) {
  let valueCSR = calculateCSR(values) - CSR.annualFee;
  let valueCSP = calculateCSP(values) - CSP.annualFee;

  return `In the first year, CSR will give you an expected value of ${valueCSR} and CSP will give you an expected value of ${valueCSP}`;
}

let valuesCSR = {
  signupBonus: 0,
  travelCredit: 0,
  travelSpend: 0,
  diningSpend: 0,
  nonBonusSpend: 0,
  loungeSpend: 0
};

function calculateCSR({
  travelSpend,
  diningSpend,
  nonBonusSpend,
  loungeSpend
}) {
  valuesCSR.signupBonus = CSR.signupBonus;

  valuesCSR.travelCredit = Math.min(travelSpend, CSR.travelCredit);

  valuesCSR.travelSpend =
    (travelSpend - Math.min(travelSpend, CSR.travelCredit)) *
    CSR.travelMultiplier;
  valuesCSR.diningSpend = diningSpend * CSR.diningMultiplier;
  valuesCSR.nonBonusSpend = Math.round(nonBonusSpend * 0.01);
  valuesCSR.loungeSpend = loungeSpend;

  return Object.values(valuesCSR).reduce((a, b) => a + b, 0);
}

let valuesCSP = {
  signupBonus: 0,
  travelCredit: 0,
  travelSpend: 0,
  diningSpend: 0,
  nonBonusSpend: 0,
  loungeSpend: 0
};

function calculateCSP({
  travelSpend,
  diningSpend,
  nonBonusSpend,
  loungeSpend = 0
}) {
  valuesCSP.signupBonus = CSP.signupBonus;

  valuesCSP.travelSpend = travelSpend * CSP.travelMultiplier;
  valuesCSP.diningSpend = diningSpend * CSP.diningMultiplier;
  valuesCSP.nonBonusSpend = Math.round(nonBonusSpend * 0.01);

  let sum = 0;

  for (let values in valuesCSP.values) {
    sum += values;
  }
  return sum;
}

export default App;
