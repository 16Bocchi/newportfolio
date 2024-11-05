import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const links = [
    {
        href: "https://www.linkedin.com/in/daniel-braithwaite",
        text: "LinkedIn",
        target: "_blank",
        rel: "noopener noreferrer",
    },
    {
        href: "https://github.com/16Bocchi",
        text: "GitHub",
        target: "_blank",
        rel: "noopener noreferrer",
    },
    {
        href: "./Resume.pdf",
        text: "Download Resume",
        download: true,
    },
];

export const BottomBar = () => {
    return (
        <div className='bottom-bar'>
            <Container>
                <Row className='justify-content-center'>
                    {links.map((link, index) => (
                        <Col xs='auto' key={index}>
                            <a
                                href={link.href}
                                target={link.target}
                                rel={link.rel}
                                download={link.download}
                            >
                                {link.text}
                            </a>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};
