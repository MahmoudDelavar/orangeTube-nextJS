import { Form, FormControl, InputGroup } from "react-bootstrap";
//============================================
const FormInput = ({ type, name, icon, text }) => {
  return (
    <>
      <InputGroup className="mb-2">
        <InputGroup.Text id={name}>{icon}</InputGroup.Text>
        {text && (
          <FormControl type={type} name={name} id={name} placeholder={text} />
        )}
      </InputGroup>
    </>
  );
};

export default FormInput;
