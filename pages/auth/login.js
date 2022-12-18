import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import FormInput from "../../components/util/inputs/form-input";
import styles from "../../styles/register.module.css";
import { dev_phase } from "../../next.config";
import axios from "axios";

import * as yup from "yup";
import {
  BsFillPersonFill,
  BsFillKeyFill,
  BsFillEnvelopeFill,
} from "react-icons/bs";
//=====================================

const Login = () => {
  //-----------------states and initional variables-----------------
  const baseUrl = dev_phase.fechUrl;
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");

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
      setErrors([]);
      return result;
    } catch (err) {
      setErrors(err.errors);
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
      let url = baseUrl + "/api/auth/login";
      axios
        .post(url, userInfo)
        .then((res) => {
          setMessage(res.data.message);
          localStorage.setItem("token", res.data.data);

          e.target.reset();
          setTimeout(() => {
            window.location = "/";
          }, 2000);
        })
        .catch((err) => setErrors(["ایمیل  یا پسورد صحیح نمی باشد"]));
    }
  };
  //----------------------------------------

  return (
    <>
      <Container>
        <Row>
          <Col xxl={6} xl={8} lg={10} md={11} className={styles.formBox}>
            {/*-----------errors message box-----------*/}
            {errors.length > 0 && (
              <Alert variant="danger">
                <ul>
                  {errors.map((err, index) => (
                    <li key={index}> {err}</li>
                  ))}
                </ul>
              </Alert>
            )}

            {/*-----------success message box-----------*/}
            {message !== "" && (
              <Alert variant="success">
                <ul>
                  <li>{message}</li>
                </ul>
              </Alert>
            )}

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
        </Row>
      </Container>
    </>
  );
};

export default Login;
