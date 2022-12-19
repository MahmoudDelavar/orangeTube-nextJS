import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import FormInput from "../../components/util/inputs/form-input";
import styles from "../../styles/register.module.css";
import { dev_phase } from "../../next.config";
import * as yup from "yup";
import {
  BsFillPersonFill,
  BsFillKeyFill,
  BsFillEnvelopeFill,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fechLogin } from "../../state_management/slices/user-slices/login";
import AuthAlerts from "../../components/util/views/auth-alerts";

//================================================================

const Login = () => {
  //-----------------states and initial variables-----------------
  const baseUrl = dev_phase.fechUrl;
  const dispatch = useDispatch();
  const { successMsg, errMsg } = useSelector((state) => state.login);

  const [validationErr, setValidationErr] = useState([]);

  //-----------validation inputs-----------
  let schema = yup.object().shape({
    email: yup
      .string()
      .email("فرمت ایمیل صحیح نیست")
      .required("ایمیل خود را وارد کنید "),
    password: yup.string().min(6, "پسورد باید حداقل 6 کاراکتر باشد "),
  });

  const validate = async (userInfo) => {
    try {
      const result = await schema.validate(userInfo, { abortEarly: false });
      setValidationErr([]);
      return result;
    } catch (err) {
      setValidationErr(err.errors);
    }
  };

  //-----------Handle submit Form-----------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    const userInfo = {
      email,
      password,
    };

    const result = await validate(userInfo);

    if (result) {
      dispatch(fechLogin(userInfo));
    }
  };
  //----------------------------------------

  return (
    <>
      <Col xxl={6} xl={8} lg={10} md={11} className={styles.formBox}>
        {/*---------Alert box---------*/}
        <AuthAlerts
          successMsg={successMsg}
          errMsg={errMsg}
          validationErr={validationErr}
        />

        {/*----------------Form box----------------*/}

        <Form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          method="post"
        >
          <FormInput
            type={"text"}
            name={"email"}
            text={"ایمیل"}
            icon={<BsFillEnvelopeFill />}
          />
          <FormInput
            type={"password"}
            name={"password"}
            text={"کلمه عبور"}
            icon={<BsFillKeyFill />}
          />

          <div className="d-grid mt-2" gap={2}>
            <Button variant="outline-primary" type="submit">
              ورود{" "}
            </Button>
          </div>
        </Form>
      </Col>
    </>
  );
};

export default Login;
