import { useState } from 'react';
import { Row, Col, Carousel, Image } from 'react-bootstrap';

import Script from 'next/script';

function ControlledCarousel() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Row>
        <Col sm={12} md={7}>
            <Carousel variant="dark" activeIndex={index} onSelect={handleSelect} interval={null}>
            <Carousel.Item>
                <Image
                    className="d-block w-100 p-5"
                    src="whale.png"
                    alt="First slide"
                />
                <Carousel.Caption>
                <p>whale</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    className="d-block w-100 p-5"
                    src="whaleCartoon.png"
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <p>whale</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    className="d-block w-100 p-5"
                    src="whale.png"
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <p>whale</p>
                </Carousel.Caption>
            </Carousel.Item>
            </Carousel>
        </Col>
        <Col sm={12} md={5}>
            <div style={{marginTop: '5rem', width: '40vw'}}>
            <model-viewer 
                id="galleryModels" 
                src="https://cdn.glitch.me/fba9d1c3-4e26-47cd-867f-19660ae37f80%2Ftest-whale-scale-root-bone.glb?v=1636271548450"
                ios-src="https://cdn.glitch.me/fba9d1c3-4e26-47cd-867f-19660ae37f80%2Ftest-whale-scale-root-bone-tex.usdz?v=1636599386704"
                poster="https://cdn.glitch.me/fba9d1c3-4e26-47cd-867f-19660ae37f80%2Funnamed.png?v=1636256018924"
                alt="A 3D model of an astronaut"
                shadow-intensity="1"
                camera-controls
                auto-rotate autoplay ar
                ar-modes="webxr scene-viewer quick-look"
                style={{height: '80vh'}}>
            </model-viewer>
            </div>
        </Col>
        <Script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" />
        <Script nomodule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js" />
      </Row>
    );
  }
  
 export default ControlledCarousel;