import Navbar from "./nabar";
import Banner from "./banner";
import { Col, Container, Row } from "react-bootstrap";

//===========================================================
const Layout = ({ children }) => {
  return (
    <>
      {/* <Banner /> */}
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xxl={12} xl={12} lg={12} md={12}>
            <Navbar />
          </Col>
          <Col>
            <main>{children}</main>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Layout;
