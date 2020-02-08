import React from "react";
import Table from "react-bootstrap/Table";

function benefitsSummary(benefits, valuesCSR, valuesCSP) {
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Chase Sapphire Reserve Expected Value</th>
            <th>Chase Sapphire Preferred Expected Value</th>
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
