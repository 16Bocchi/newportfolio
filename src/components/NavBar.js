import { Navbar, Nav } from "react-bootstrap";
import { useEffect, useState } from "react";

export const NavBar = () => {
    const [activeLink, setActiveLink] = useState(""); // Active link state
    const [scrollLock, setScrollLock] = useState(false); // Lock to manage scroll during link clicks

    useEffect(() => {
        // Initialize Intersection Observer to watch each section
        const sections = document.querySelectorAll("section");

        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.6, // Trigger when 60% of the section is visible
        };

        const observer = new IntersectionObserver((entries) => {
            if (scrollLock) return; // Skip if a link click is active

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        }, observerOptions);

        sections.forEach((section) => observer.observe(section));

        // Cleanup observer on unmount
        return () => {
            observer.disconnect();
        };
    }, [scrollLock]);

    const handleNavLinkClick = (link) => {
        setActiveLink(link);
        setScrollLock(true); // Lock scroll updates during link click

        const targetSection = document.getElementById(link);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: "smooth",
            });
        }

        setTimeout(() => {
            setScrollLock(false);
        }, 500); // Adjust this delay to match scroll duration
    };

    return (
        <Navbar expand='lg' className='bg-body-tertiary d-none d-lg-block'>
            <Nav className='flex-column'>
                <Nav.Link
                    href='#landing'
                    className={
                        activeLink === "landing"
                            ? "active navbar-link"
                            : "navbar-link"
                    }
                    onClick={() => handleNavLinkClick("landing")}
                >
                    <i className='fas fa-circle'></i>
                </Nav.Link>
                <Nav.Link
                    href='#about'
                    className={
                        activeLink === "about"
                            ? "active navbar-link"
                            : "navbar-link"
                    }
                    onClick={() => handleNavLinkClick("about")}
                >
                    <i className='fas fa-circle'></i>
                </Nav.Link>
                <Nav.Link
                    href='#projects'
                    className={
                        activeLink === "projects"
                            ? "active navbar-link"
                            : "navbar-link"
                    }
                    onClick={() => handleNavLinkClick("projects")}
                >
                    <i className='fas fa-circle'></i>
                </Nav.Link>
                <Nav.Link
                    href='#contact'
                    className={
                        activeLink === "contact"
                            ? "active navbar-link"
                            : "navbar-link"
                    }
                    onClick={() => handleNavLinkClick("contact")}
                >
                    <i className='fas fa-circle'></i>
                </Nav.Link>
            </Nav>
        </Navbar>
    );
};
