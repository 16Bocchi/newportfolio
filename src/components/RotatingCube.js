import React, { useState, useRef, useEffect } from "react";
import pythonImg from "../assets/images/Python.png";
import postmanImg from "../assets/images/Postman.png";
import swiftImg from "../assets/images/Swift.png";
import gitImg from "../assets/images/Git.png";
import pyTestImg from "../assets/images/pytest.png";
import tensorFlowImg from "../assets/images/TensorFlow.png";

function RotatingCube() {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const dragging = useRef(false);
    const lastPoint = useRef({ x: 0, y: 0 });
    const rotationDelta = useRef({ x: 0, y: 0 });
    const autoRotateInterval = useRef(null);
    const timeoutRef = useRef(null);
    const rotationSpeed = window.innerWidth < 768 ? 1.5 : 0.7;

    useEffect(() => {
        autoRotateInterval.current = setInterval(() => {
            if (!dragging.current) {
                setRotation((prev) => ({
                    x: prev.x + rotationSpeed,
                    y: prev.y + rotationSpeed,
                }));
            }
        }, 100);

        return () => clearInterval(autoRotateInterval.current);
    }, [rotationSpeed]);

    const startDrag = (clientX, clientY) => {
        dragging.current = true;
        lastPoint.current = { x: clientX, y: clientY };
        clearInterval(autoRotateInterval.current);
        clearTimeout(timeoutRef.current);
    };

    const moveDrag = (clientX, clientY) => {
        if (dragging.current) {
            rotationDelta.current = {
                x: lastPoint.current.y - clientY,
                y: clientX - lastPoint.current.x,
            };
            lastPoint.current = { x: clientX, y: clientY };

            requestAnimationFrame(() => {
                setRotation((prev) => ({
                    x: prev.x + rotationDelta.current.x * 0.3,
                    y: prev.y + rotationDelta.current.y * 0.3,
                }));
            });
        }
    };

    const endDrag = () => {
        dragging.current = false;
        timeoutRef.current = setTimeout(() => {
            autoRotateInterval.current = setInterval(() => {
                setRotation((prev) => ({
                    x: prev.x + rotationSpeed,
                    y: prev.y + rotationSpeed,
                }));
            }, 100);
        }, 2500);
    };

    return (
        <div
            className='cube-container'
            onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
            onMouseMove={(e) => moveDrag(e.clientX, e.clientY)}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            onTouchStart={(e) =>
                startDrag(e.touches[0].clientX, e.touches[0].clientY)
            }
            onTouchMove={(e) =>
                moveDrag(e.touches[0].clientX, e.touches[0].clientY)
            }
            onTouchEnd={endDrag}
        >
            <div
                className='cube'
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                }}
            >
                <div className='face front'>
                    <img src={pythonImg} alt='Python' />
                </div>
                <div className='face back'>
                    <img src={pyTestImg} alt='Pytest' />
                </div>
                <div className='face left'>
                    <img src={swiftImg} alt='Swift' />
                </div>
                <div className='face right'>
                    <img src={gitImg} alt='Git' />
                </div>
                <div className='face top'>
                    <img src={postmanImg} alt='Postman' />
                </div>
                <div className='face bottom'>
                    <img src={tensorFlowImg} alt='TensorFlow' />
                </div>
            </div>
        </div>
    );
}

export default RotatingCube;
