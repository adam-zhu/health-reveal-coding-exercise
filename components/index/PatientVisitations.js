import React from 'react';

const PatientVisitations = ({ patient_visitations }) =>
  Array.isArray(patient_visitations) && patient_visitations.length ? (
    insertBr(patient_visitations.map(PatientVisitation))
  ) : (
    <p>No patient visitations.</p>
  );

const PatientVisitation = ({ id, patient, visitations }) => (
  <div key={id}>
    <strong>
      {patient.patient_name}, age {patient.patient_age}
    </strong>
    <VisitationsTable visitations={visitations} />
  </div>
);

const VisitationsTable = ({ visitations }) => (
  <table>
    <thead>
      <tr>
        <th>event_code</th>
        <th>event_date</th>
        <th>code_category</th>
      </tr>
    </thead>
    <tbody>{visitations.map(VisitationRow)}</tbody>
  </table>
);

const VisitationRow = ({ id, event_code, event_date, code_category }) => (
  <tr key={id}>
    <td>{event_code}</td>
    <td>{event_date}</td>
    <td>{code_category}</td>
  </tr>
);

const insertBr = (rows) =>
  rows
    .map((r, i) => {
      const isLastRow = i === rows.length - 1;

      return !isLastRow ? [r, <br />] : [r];
    })
    .flat();

export default PatientVisitations;
