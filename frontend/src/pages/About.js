import { Container, Row, Col, Image } from 'react-bootstrap';
import member1 from '../assets/member1.png';

const About = () => {
  return (
    <div>
      <Container>
        <Row className="pt-5">
          <Col>
            <h2 className="text-center fw-bold pb-3">About Our Story Publishing Site</h2>
            <p className="lead text-center">Welcome to our story publishing platform! We are dedicated to providing a space
             for writers to share their creativity with the world. Whether you're an aspiring author or a seasoned writer, our
             platform offers the tools and community support you need to bring your stories to life.</p>
            <p className="text-center">Our mission is to empower storytellers and connect readers with captivating narratives 
             from diverse voices. We believe in the power of storytelling to inspire, entertain, and foster empathy.</p>
            <p className="text-center">Thank you for being a part of our journey!</p>
          </Col>
        </Row>
        <Row className="py-3">
          <Col>
            <h3 className="text-center">Developer</h3>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <a href="https://www.linkedin.com/in/pitamber023/" target='blank'><Image src={member1} alt="Team Member 1" 
            width={120} className="bg-light rounded-circle p-1 mb-3 border border-1 border-dark" /></a>
            <h4>Pitamber</h4>
            <p>Founder & CEO</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
