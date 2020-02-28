import React from "react";
import Table from "react-bootstrap/Table";

function benefitsSummary(benefits, valuesCSR, valuesCSP) {
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
        </tbody>
      </Table>
    </div>
  );
}

export default benefitsSummary;
