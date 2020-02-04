import React from "react";
import "./App.css";
import { Formik } from "formik";

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
            errors.travelSpend = "Invalid travel spend amount";
          }

          if (!values.diningSpend) {
            errors.diningSpend = "Required";
          } else if (values.diningSpend < 0) {
            errors.diningSpend = "Invalid dining spend amount";
          }

          if (!values.nonBonusSpend) {
            errors.nonBonusSpend = "Required";
          } else if (values.nonBonusSpend < 0) {
            errors.nonBonusSpend = "Invalid non-bonus spend amount";
          }

          if (!values.loungeSpend) {
            errors.loungeSpend = "Required";
          } else if (values.loungeSpend < 0) {
            errors.loungeSpend = "Invalid lounge spend amount";
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
                <label>How much do you spend on travel each year?</label>
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
                <label>How much do you spend on dining each year?</label>
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
                <label>
                  How much do you spend on non-bonus categories each year?
                </label>
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
                <label>
                  How much do you value for Priority Pass lounge access for you
                  + 2 guests?
                </label>
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
            <div>This is the value: {JSON.stringify(values)}</div>
            <div>{getAnswer(values)}</div>
          </>
        )}
      </Formik>
    </div>
  );
};
const CSR = {
  travelMultiplier: 0.03,
  diningMultiplier: 0.03,
  annualFee: 450,
  portalMultiplier: 1.5,
  travelCredit: 300
};

const CSP = {
  travelMultiplier: 0.02,
  diningMultiplier: 0.02,
  annualFee: 95,
  portalMultiplier: 1.25
};

function getAnswer(values) {
  let valueCSR = calculateCSR(values) - CSR.annualFee;
  let valueCSP = calculateCSP(values) - CSP.annualFee;

  // if (valueCSR > valueCSP) {
  //   return `CSR will give you an expected value of ${valueCSR}`;
  // } else {
  //   return `CSP will give you an expected value of ${valueCSP}`;
  // }
  return `CSR will give you an expected value of ${valueCSR} and CSP will give you an expected value of ${valueCSP}`;
}

function calculateCSR({
  travelSpend,
  diningSpend,
  nonBonusSpend,
  loungeSpend
}) {
  let expectedValue = 0;

  let travelCredit = Math.min(travelSpend, CSR.travelCredit);
  expectedValue += travelCredit;

  expectedValue += (travelSpend - travelCredit) * CSR.travelMultiplier;
  expectedValue += diningSpend * CSR.diningMultiplier;
  expectedValue += Math.round(nonBonusSpend * 0.01);
  expectedValue += loungeSpend;

  return expectedValue;
}

function calculateCSP({
  travelSpend,
  diningSpend,
  nonBonusSpend,
  loungeSpend = 0
}) {
  let expectedValue = 0;

  expectedValue += travelSpend * CSP.travelMultiplier;
  expectedValue += diningSpend * CSP.diningMultiplier;
  expectedValue += Math.round(nonBonusSpend * 0.01);

  return expectedValue;
}

export default App;
