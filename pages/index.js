import gql from 'graphql-tag';
import { withApollo } from '../lib/withApollo';
import { useQuery } from '@apollo/react-hooks';
import PatientVisitations from '../components/index/PatientVisitations';

const GET_VISITATIONS = gql`
  query getVisitations {
    visitations {
      id
      patient_name
      patient_age
      event_code
      event_date
      code_category
    }
  }
`;

const IndexPage = () => {
  const { loading, error, data } = useQuery(GET_VISITATIONS);

  if (loading) {
    return (
      <div>
        Loading visitations...
        <br />
        <progress />
      </div>
    );
  }

  if (error) {
    console.error(error);
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  return <PageBody data={data} />;
};

const PageBody = ({ data }) => {
  const { visitations } = data;
  const M222_visitations = visitations.filter(
    ({ event_code }) => event_code === 'M222',
  );
  const C_visitations = visitations.filter(
    ({ code_category }) => code_category === 'C',
  );
  const A_visitations = visitations.filter(
    ({ code_category }) => code_category === 'A',
  );

  const M222_patients = extract_patients(M222_visitations);
  const C_patients = extract_patients(C_visitations);
  const A_patients = extract_patients(A_visitations);
  const C_not_A_patients = C_patients.filter((c_patient) => {
    const is_in_A = Boolean(
      A_patients.find(
        ({ patient_name }) => patient_name === c_patient.patient_name,
      ),
    );

    return !is_in_A;
  });
  const M222_patient_visitations = create_patient_visitations({
    patients: M222_patients,
    visitations,
  });
  const C_not_A_patient_visitations = create_patient_visitations({
    patients: C_not_A_patients,
    visitations,
  });

  return (
    <>
      <section>
        <h1>event code M222</h1>
        <PatientVisitations patient_visitations={M222_patient_visitations} />
      </section>
      <section>
        <h1>code category C but not A</h1>
        <PatientVisitations patient_visitations={C_not_A_patient_visitations} />
      </section>
    </>
  );
};

const extract_patients = (visitations) =>
  visitations.reduce(
    (acc, { patient_name, patient_age }) =>
      acc.find((p) => p.patient_name === patient_name)
        ? acc
        : acc.concat([{ patient_name, patient_age }]),
    [],
  );

const create_patient_visitations = ({ patients, visitations }) =>
  patients.map((patient) => ({
    id: patient.patient_name,
    visitations: visitations.filter(
      ({ patient_name }) => patient_name === patient.patient_name,
    ),
    patient,
  }));

export default withApollo()(IndexPage);
