import React, { useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import emailjs from "@emailjs/browser";

export const Contact = React.forwardRef((props, ref) => {
    const refForm = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
            .sendForm(
                "service_o1b9ius",
                "template_bf5gkfs",
                refForm.current,
                "C03wehCWYtl6eOh1q"
            )
            .then(
                () => {
                    alert("Message sent successfully!");
                    refForm.current.reset();
                },
                () => {
                    alert("Message failed to send.");
                }
            );
    };

    return (
        <section className='contact' id='contact'>
            <Container>
                <Row className='align-items-center justify-content-center card-box'>
                    <Col xs={12}>
                        <h1>{">> Contact Me"}</h1>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <p className='left-justify'>
                            I am actively seeking junior positions or
                            internships in the fields of software development,
                            robotics, machine learning, and brain-computer
                            interfaces, where I can apply my skills and
                            contribute to innovative projects. My passion for
                            technology drives me to explore new challenges, and
                            I am eager to collaborate with others who share this
                            enthusiasm.
                        </p>
                        <p className='left-justify'>
                            If you have any inquiries, suggestions, or
                            opportunities in mind, please don’t hesitate to
                            reach out! I look forward to connecting and
                            discovering how we can work together!
                        </p>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <div className='contact-form text-start'>
                            <form ref={refForm} onSubmit={sendEmail}>
                                <p>
                                    Hi, my name is:{" "}
                                    <input
                                        type='text'
                                        name='from_name'
                                        placeholder='Your name'
                                        required
                                    />{" "}
                                    and my email address is:{" "}
                                    <input
                                        type='email'
                                        name='email_addr'
                                        placeholder='Your email'
                                        required
                                    />{" "}
                                    and I would like to talk about:{" "}
                                    <textarea
                                        placeholder='Your message'
                                        name='message'
                                        required
                                        rows={4}
                                    />
                                </p>
                                <input
                                    type='submit'
                                    className='btn btn-outline-primary'
                                    value='Send!'
                                />
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
});

// export default Contact;
