import { Alert } from "react-bootstrap";
//=======================================================

const AuthAlerts = ({ successMsg, errMsg, validationErr }) => {
  return (
    <>
      {/*---------validation errors box---------*/}
      {validationErr.length > 0 && (
        <Alert variant="danger">
          <ul>
            {validationErr.map((err, index) => (
              <li key={index}> {err}</li>
            ))}
          </ul>
        </Alert>
      )}

      {/*-----------Backend errors box-----------*/}
      {errMsg && (
        <Alert variant="danger">
          <p> {errMsg}</p>
        </Alert>
      )}

      {/*-----------backend message box-----------*/}
      {successMsg && (
        <Alert variant="success">
          <p>{successMsg}</p>
        </Alert>
      )}

      {/*----------------Form box----------------*/}
    </>
  );
};

export default AuthAlerts;
