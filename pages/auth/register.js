import styles from "../../styles/register.module.css";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import {
  BsFillPersonFill,
  BsFillKeyFill,
  BsFillEnvelopeFill,
} from "react-icons/bs";
import { AiFillPicture, AiFillPlusSquare } from "react-icons/ai";
import FormInput from "../../components/util/inputs/form-input";
import { useState } from "react";
//=====================================

const Register = () => {
  //-----------------states-----------------
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //-----------Handle submit Form-----------
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const userName = form.get("userName");
    const email = form.get("email");
    const password = form.get("password");

    const info = {
      userName,
      email,
      password,
    };
    console.log("submit form", info);
  };

  //------------load user avatar------------
  const loadAvatar = (e) => {
    const avatar = e.target.files[0];
    console.log("avatar:", avatar);
  };
  //----------------------------------------
  return (
    <>
      <Container>
        <Row>
          <Col xxl={6} xl={8} lg={10} md={11} className={styles.formBox}>
            <Form onSubmit={handleSubmit}>
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

              <Row className="align-items-start text-center">
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
                  {avatar ? (
                    <> picture</>
                  ) : (
                    <>
                      <AiFillPicture size={100} />
                      <p>پیش نمایش</p>
                    </>
                  )}
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
