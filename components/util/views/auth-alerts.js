import { Alert } from "react-bootstrap";
//=======================================================

const AuthAlerts = ({ successMsg, errMsg, validationErr }) => {
  return (
    <>
      {/*---------validation errors ---------*/}
      {validationErr.length > 0 && (
        <Alert variant="danger">
          <ul>
            {validationErr.map((err, index) => (
              <li key={index}> {err}</li>
            ))}
          </ul>
        </Alert>
      )}

      {/*-----------Backend errors -----------*/}
      {errMsg && (
        <Alert variant="danger">
          <p> {errMsg}</p>
        </Alert>
      )}

      {/*-----------backend message -----------*/}
      {successMsg && (
        <Alert variant="success">
          <p>{successMsg}</p>
        </Alert>
      )}
    </>
  );
};

export default AuthAlerts;
