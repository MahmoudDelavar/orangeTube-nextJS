import styles from "../../styles/register.module.css";
import { Col, Row, Container, Form, Button, Spinner } from "react-bootstrap";
import {
  BsFillPersonFill,
  BsFillKeyFill,
  BsFillEnvelopeFill,
} from "react-icons/bs";
import { AiFillPicture, AiFillPlusSquare } from "react-icons/ai";
import FormInput from "../../components/util/inputs/form-input";
import { useState } from "react";
import { dev_phase } from "../../next.config";
import axios from "axios";
import Image from "next/image";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fechRegister } from "../../state_management/slices/user-slices/register";
import AuthAlerts from "../../components/util/views/auth-alerts";

//=====================================

const Register = () => {
  //-----------------states and initial variables-----------------
  const baseUrl = dev_phase.fechUrl;
  const dispatch = useDispatch();
  const { successMsg, errMsg } = useSelector((state) => state.register);

  const [avatarPath, setAvatarPath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationErr, setValidationErr] = useState([]);

  //-----------validation inputs-----------

  let schema = yup.object().shape({
    userName: yup.string().required("نام کاربری راوارد کنید "),
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
    const userName = form.get("userName");
    const email = form.get("email");
    const password = form.get("password");
    const rePassword = form.get("re-password");

    const userInfo = {
      userName,
      email,
      password,
      avatarPath,
    };

    const result = await validate(userInfo);

    if (password === rePassword) {
      if (result) {
        dispatch(fechRegister(userInfo));
      }
    } else {
      setValidationErr(["تکرار پسورد مطابقت ندارد "]);
    }
  };

  //------------load user avatar------------
  const loadAvatar = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = new FormData();

    const config = {
      header: { "content-type": "multipart-data" },
    };

    form.append("file", e.target.files[0]);

    axios
      .post(`${baseUrl}/api/auth/loadAvatar`, form, config)
      .then((res) => {
        let avatarPath = `/uploads/userAvatar/${res.data.data.fileName}`;
        setAvatarPath(avatarPath);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  //----------------------------------------

  return (
    <>
      <Container>
        <Row>
          <Col xxl={6} xl={8} lg={10} md={11} className="formBox">
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
                name={"userName"}
                text={"نام کاربری"}
                icon={<BsFillPersonFill />}
              />
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
              <FormInput
                type={"password"}
                name={"re-password"}
                text={"تکرار کلمه عبور"}
                icon={<BsFillKeyFill />}
              />

              <Row className="align-items-center text-center">
                <Col>
                  <Form.Label htmlFor="avatar">
                    <AiFillPlusSquare size={100} />
                    <br />
                    <Form.Text>تصویر</Form.Text>
                  </Form.Label>
                  <Form.Control
                    onChange={(e) => loadAvatar(e)}
                    id="avatar"
                    type="file"
                    className="fileInput"
                  />
                </Col>

                <Col>
                  {avatarPath !== "" && (
                    <Image
                      src={avatarPath}
                      width={100}
                      height={100}
                      alt="faild loading"
                    />
                  )}
                  {avatarPath == "" &&
                    (isLoading ? (
                      <Spinner animation="border" variant="info" />
                    ) : (
                      <>
                        <AiFillPicture size={100} /> <p>پیش نمایش</p>
                      </>
                    ))}
                </Col>
              </Row>

              <div className="d-grid mt-2" gap={2}>
                <Button variant="outline-primary" type="submit">
                  ثبت نام
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
