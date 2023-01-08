import Image from "next/image";
import Link from "./costumLink";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

//========================================================
function Navigationbar() {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="md"
      className="text-danger"
      style={{ marginTop: "9vh" }}
    >
      <Container fluid>
        <Navbar.Brand href="/">
          <Image src="/logo64.png" alt="faild-logo" width={40} height={40} />
          <span style={{ color: "orange" }}> oreangetube.ir</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="titile" />
        <Navbar.Collapse id="titile">
          <Nav className="me-auto " style={{ maxHeight: "100px" }} navbarScroll>
            <Link href="/">videos</Link>
            <Link href="/sunscribtions">subscibetions</Link>
            <Link href="/video/upload">upload</Link>
            <Link href="/auth/login">login</Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-4"
              aria-label="Search"
            />
            <Button variant="outline-danger">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;
