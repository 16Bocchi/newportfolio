import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

const ScrollIndicator = () => (
    <div className='scroll-indicator'>
        <span>&#9660;</span>
    </div>
);

const DesktopLanding = ({ scrollToContact, lastLogin, txt }) => (
    <Row className='align-items-stretch justify-content-center'>
        <Col xs={12} md={6} xl={5} className='card-box gx-5'>
            <h1>Hi! I'm Daniel</h1>
            <p className='tagLine'>
                Undergraduate Student and Software Engineer
            </p>
            <div>
                <button
                    className='btn btn-outline-primary'
                    onClick={scrollToContact}
                >
                    Contact me
                </button>
                <br />
                <br />
                <button
                    className='btn btn-outline-primary'
                    onClick={() =>
                        window.open(
                            "https://www.linkedin.com/in/daniel-braithwaite",
                            "_blank"
                        )
                    }
                >
                    Let's connect
                </button>
            </div>
        </Col>
        <Col xs={12} md={6} xl={5} className='gx-5'>
            <div className='terminal'>
                <div className='terminal-bar'>
                    <span className='terminal-button close'></span>
                    <span className='terminal-button minimize'></span>
                    <span className='terminal-button maximize'></span>
                </div>
                <p className='terminal-body'>
                    <span className='prompt'>
                        Last login: {lastLogin} on console
                    </span>
                    <br />
                    <a
                        href='https://github.com/16Bocchi'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <span className='prompt'>16Bocchi@github ~ %</span>
                    </a>
                    <span className='command'>echo I am a: </span>
                    <span className='output'>{txt}</span>
                    <span className='cursor'>_</span>
                </p>
            </div>
        </Col>
    </Row>
);

const MobileLanding = ({ scrollToContact, lastLogin, txt }) => (
    <>
        <div className='card-box-mobile'>
            <h1>Hi! I'm Daniel</h1>
            <p className='tagLine'>
                Undergraduate Student and Software Engineer
            </p>
        </div>
        <div className='terminal'>
            <div className='terminal-bar'>
                <span className='terminal-button close'></span>
                <span className='terminal-button minimize'></span>
                <span className='terminal-button maximize'></span>
            </div>
            <p className='terminal-body'>
                <span className='prompt'>
                    Last login: {lastLogin} on console
                </span>
                <br />
                <a
                    href='https://github.com/16Bocchi'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <span className='prompt'>16Bocchi@github ~ %</span>
                </a>
                <span className='command'>echo I am a: </span>
                <span className='output'>{txt}</span>
                <span className='cursor'>_</span>
            </p>
        </div>
        <Row className='card-box-mobile'>
            <button
                className='btn btn-outline-primary'
                onClick={scrollToContact}
            >
                Contact me
            </button>
            <div className='divider'></div>
            <button
                className='btn btn-outline-primary'
                onClick={() =>
                    window.open(
                        "https://www.linkedin.com/in/daniel-braithwaite",
                        "_blank"
                    )
                }
            >
                Let's connect
            </button>
        </Row>
    </>
);

export const Landing = () => {
    const [idx, setIdx] = useState(0);
    const [isDelete, setIsDelete] = useState(false);
    const [txt, setTxt] = useState("");
    const [lastLogin, setLastLogin] = useState("");
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const period = 1000;
    const [deltaTime, setDeltaTime] = useState(200 - Math.random() * 50);
    const wordRotation = [
        "Software engineer",
        "Student",
        "Photographer",
        "Machine learning enthusiast",
        "Web developer",
        "Tech enthusiast",
        "Problem solver",
        "Test automation engineer",
    ];

    useEffect(() => {
        const now = new Date();
        setLastLogin(now.toLocaleString());
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const ticker = setInterval(() => {
            tick();
        }, deltaTime);

        return () => {
            clearInterval(ticker);
        };
    }, [txt]);

    const tick = () => {
        const i = idx % wordRotation.length;
        const fullTxt = wordRotation[i];
        const updatedTxt = isDelete
            ? fullTxt.substring(0, txt.length - 1)
            : fullTxt.substring(0, txt.length + 1);

        setTxt(updatedTxt);

        if (isDelete) {
            setDeltaTime((prevDeltaTime) => prevDeltaTime / 1.2);
        }

        if (!isDelete && updatedTxt === fullTxt) {
            setIsDelete(true);
            setDeltaTime(period);
        } else if (isDelete && updatedTxt === "") {
            setIsDelete(false);
            setIdx(idx + 1);
            setDeltaTime(200);
        }
    };

    const scrollToContact = () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className='landing' id='landing'>
            <Container>
                {isMobile ? (
                    <MobileLanding
                        scrollToContact={scrollToContact}
                        lastLogin={lastLogin}
                        txt={txt}
                    />
                ) : (
                    <DesktopLanding
                        scrollToContact={scrollToContact}
                        lastLogin={lastLogin}
                        txt={txt}
                    />
                )}
            </Container>
            <ScrollIndicator />
        </section>
    );
};
