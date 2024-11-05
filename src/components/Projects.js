import React, { useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import vision from "../assets/images/vision.png";
import auslan from "../assets/images/auslan.png";
import mnist from "../assets/images/mnist.png";
import sort from "../assets/images/sort.webp";

const projects = [
    {
        title: "Psithurism",
        description:
            "Australia's first Apple Vision Pro + Apple Watch application, focused on mindfulness and mental health in a virtual world.",
        moreInfo: `
            Psithurism leverages wearable tech to create a calming, immersive experience 
            in virtual nature settings that adapt to the user's heart rate.

            The app uses the Apple Watch to monitor the user's heart rate and sends this
            information to the Apple Vision Pro, which then adjusts the breathing exercises
            and the environment to help the user relax.
            
            Created using SwiftUI, RealityKit, and Firebase, Psithurism is a unique blend 
            of augmented reality, bioinformatics, and mindfulness.
        `,
        image: vision,
        viewCodeLink: "https://github.com/16Bocchi/PsithurismVision",
    },
    {
        title: "AusLan Translation Web Application",
        description:
            "Australian Sign Language translation application. Converts AusLan to English text and English to sign animation.",
        moreInfo: `
            The Auslan Translation application is a web-app that converts Auslan (Australian Sign Language)
            to Australian English text in real-time. \n
            
            It uses a custom input parser to convert the user's
            continuous signs into individual signs, which are then translated using a custom machine learning
            model trained on Auslan Daily, a children's television program akin to playschool.

            It also has the ability to convert English text to Auslan using a custom-built animation system
            that displays the signs in a way that is easy to understand for both hearing and non-hearing users.
        `,
        image: auslan,
        viewCodeLink: "https://github.com/LNWork/Auslan-sign-app/tree/Dev",
    },
    {
        title: "Python Photo Sorter",
        description:
            "Quick multi-processor photo sorter using Python. Sorts by year, month, day and splits into raw or jpeg",
        image: sort,
        moreInfo: `
            The Python Photo Sorter is a simple tool that sorts photos into folders based on their creation date.
            It uses the EXIF data stored in the image files to determine the date the photo was taken and then moves
            the photo to the appropriate folder. It also has the ability to split the photos into RAW and JPEG folders
            for easier management.
        `,
        viewCodeLink: "https://github.com/16Bocchi/photoSort",
    },
    {
        title: "MNIST Digit Recognition",
        description:
            "CNN for recognizing handwritten digits from the MNIST dataset. Built using only NumPy and Pandas.",
        image: mnist,
        moreInfo: `
            The MNIST Digit Recognition project is a simple Convolutional Neural Network (CNN) that recognizes
            handwritten digits from the MNIST dataset. It was built using only NumPy and Pandas to demonstrate
            the inner workings of a CNN and how it can be used to classify images.

            The model was trained on the MNIST dataset and achieved an accuracy of over 90% on the test set.
        `,
        viewCodeLink: "https://github.com/16Bocchi/CNN",
    },
];

export const Projects = () => {
    const [expandedProject, setExpandedProject] = useState(null);
    const swiperRef = useRef(null);

    const handleExpand = (index) => {
        setExpandedProject(index);
    };

    const handleClose = () => {
        setExpandedProject(null);
    };

    const swiperOptions = {
        spaceBetween: 30,
        loop: true,
        autoplay:
            expandedProject === null
                ? { delay: 2500, disableOnInteraction: false }
                : false,
        pagination: {
            el: ".swiper-custom-pagination",
            clickable: true,
        },
        modules: [Autoplay, Pagination],
        className: "mySwiper",
        breakpoints: {
            576: { slidesPerView: 1 },
            992: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
        },
    };

    return (
        <section className='projects' id='projects'>
            <Container>
                <Row className='justify-content-center text-center'>
                    <Col xs={12}>
                        <h1>{">> "}Cool things I've done</h1>
                    </Col>
                    <Col xs={12} className='carousel-container'>
                        <Swiper {...swiperOptions}>
                            {projects.map((project, index) => (
                                <SwiperSlide
                                    key={index}
                                    className='carousel-card'
                                >
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className='card-image'
                                    />
                                    <h3>{project.title}</h3>
                                    <p className='project-description'>
                                        {project.description}
                                    </p>
                                    <div className='button-group'>
                                        <button
                                            onClick={() => handleExpand(index)}
                                            className='btn btn-outline-primary'
                                        >
                                            Learn More
                                        </button>
                                        <a
                                            href={project.viewCodeLink}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='btn btn-outline-primary'
                                        >
                                            View Code
                                        </a>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className='swiper-custom-pagination'></div>
                    </Col>
                </Row>

                {expandedProject !== null && (
                    <div className='expanded-overlay' onClick={handleClose}>
                        <div
                            className='expanded-content'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3>{projects[expandedProject].title}</h3>
                            {projects[expandedProject].moreInfo
                                .split("\n\n")
                                .map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            <button
                                onClick={handleClose}
                                className='btn btn-secondary'
                            >
                                Back
                            </button>
                        </div>
                    </div>
                )}
            </Container>
        </section>
    );
};
