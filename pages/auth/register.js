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
//=====================================

const Register = () => {
  //-----------------states and initional variables-----------------
  const url = dev_phase.fechUrl;
  const [avatarPath, setAvatarPath] = useState("");
  const [avatarName, setAvatarName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  //-----------Handle submit Form-----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const userName = form.get("userName");
    const email = form.get("email");
    const password = form.get("password");

    const userInfo = {
      userName,
      email,
      password,
    };
    console.log("input validation ", userInfo);
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
      .post(`${url}/api/auth/loadAvatar`, form, config)
      .then((res) => {
        setAvatarPath(res.data.data.filePath);
        setAvatarName(res.data.data.fileName);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  //----------------------------------------

  return (
    <>
      <Container>
        <Row>
          <Col xxl={6} xl={8} lg={10} md={11} className={styles.formBox}>
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
                    className={styles.avatarInput}
                  />
                </Col>
                <Col>
                  {avatarPath !== "" && (
                    <Image
                      src={`/uploads/userAvatar/${avatarName}`}
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
