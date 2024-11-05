import { Container, Row, Col } from "react-bootstrap";
import RotatingCube from "./RotatingCube";

export const About = () => {
    return (
        <section className='about' id='about'>
            <Container>
                <Row className='align-items-center justify-content-center'>
                    <Col xs={12}>
                        <h1>{">> About Me"}</h1>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <p className='left-justify'>
                            Hello! I'm Daniel, a penultimate year software
                            engineering student with a passion for solving
                            problems. I'm looking forward to tackling any
                            interesting challenges that come my way.
                        </p>
                        <p className='left-justify'>
                            I have a love for algorithms, machine learning/AI,
                            and augmented reality. I'm always looking at the
                            next step in technological advancement, and have had
                            the pleasure of developing for the Apple Vision Pro.
                        </p>
                    </Col>
                    <Col xs={12} md={6} xl={5} className='cube-col'>
                        <RotatingCube />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
