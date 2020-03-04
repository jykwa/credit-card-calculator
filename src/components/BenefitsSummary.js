import React from "react";
import Table from "react-bootstrap/Table";
import { calculateCSR, calculateCSP } from "../App.js";

function benefitsSummary(benefits, valuesCSR, valuesCSP, values) {
  const valueCSR = calculateCSR(values);
  const valueCSP = calculateCSP(values);

  return (
    <div>
      <Table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Question</th>
            <th>CSR Expected Value</th>
            <th>CSP Expected Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(benefits).map((benefit, index) => (
            <tr key={index}>
              <td>{benefits[benefit].question}</td>
              <td>${valuesCSR[benefit]}</td>
              <td>${valuesCSP[benefit]}</td>
            </tr>
          ))}
          <tr>
            <td>
              <b>Total Expected Value</b>
            </td>
            <td>{Math.round(valueCSR)}</td>
            <td>{Math.round(valueCSP)}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default benefitsSummary;
