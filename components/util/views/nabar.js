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
                    ?????????? ??????????
                  </span>
                </>
              )}
            </Col>
          </Row>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link href="/">??????????????</Link>
            <Link href="/video/subscribtion">???????????? ????</Link>
            <Link href="/video/upload">?????????? </Link>

            {user.userName ? (
              <Link href="/auth/logout">????????</Link>
            ) : (
              <Link href="/auth/login">????????</Link>
            )}
          </Nav>
          <Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="?????????? ???? ????????????"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">????????????</Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;
//---------------------------------------------------------------
