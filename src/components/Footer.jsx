import Container from "react-bootstrap/Container";

const Footer = () => {
  return (
    <footer
      style={{
        marginTop: "40px",
        padding: "15px 0",
        backgroundColor: "#212529",
        color: "#ffffff",
      }}
    >
      <Container className="text-center">
        <p style={{ margin: 0 }}>
          Name: <strong>Mohammad Ali Shamol</strong>
        </p>
        <p style={{ margin: 0 }}>
          Class Roll: <strong>08</strong>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
