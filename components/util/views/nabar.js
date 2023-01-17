import Image from "next/image";
import Link from "./costumLink";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fechMe } from "../../../state_management/slices/user-slices/isLoggined";
import { Col, Row } from "react-bootstrap";

//========================================================

function Navigationbar() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(fechMe({ token }));
  }, []);
  const user = useSelector((state) => state.user.userInfo);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <Row>
            <Col>
              <Image
                src="/logo64.png"
                alt="faild-logo"
                width={40}
                height={40}
              />
              <span style={{ color: "orange" }}> oreangetube.ir</span>
            </Col>
            <Col>
              {user.userName ? (
                <>
                  <Image
                    src={user.avatarPath}
                    alt="faild-logo"
                    width={30}
                    height={30}
                    style={{ borderRadius: "50%" }}
                  />
                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: "500",
                      color: "green",
                    }}
                  >
                    {" "}
                    {user.userName}
                  </span>
                </>
              ) : (
                <>
                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: "500",
                      color: "green",
                    }}
                  >
                    کاربر مهمان
                  </span>
                </>
              )}
            </Col>
          </Row>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link href="/">ویدئوها</Link>
            <Link href="/video/subscribtion">اشتراک ها</Link>
            <Link href="/video/upload">آپلود </Link>

            {user.userName ? (
              <Link href="/auth/logout">خروج</Link>
            ) : (
              <Link href="/auth/login">ورود</Link>
            )}
          </Nav>
          <Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="دنبال چی میگردی"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">پیداکن</Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;
//---------------------------------------------------------------
