import { Container, Modal, Button, Row, Col, Image } from 'react-bootstrap';
import { useEffect } from 'react';

function GridModel(props) {
  //useEffect check if the model html node exists then load the image
  useEffect(() => {
    const modelViewerTexture = document.getElementById('modelModal');
    if (modelViewerTexture) {
      modelViewerTexture.addEventListener("load", () => {
        let material = modelViewerTexture.model.materials[0];
      let newTexture = async (imageSource) => {
        return await modelViewerTexture.createTexture(imageSource)
      }
      let initTexture = async (attr, channel, imageSource) => {
        const texture = await newTexture(imageSource);
        material[attr][channel].setTexture(texture);
      }
        
        let source = props.texture;
        
        initTexture('pbrMetallicRoughness', 'baseColorTexture', source)      
    });
    }
  });

    return (
      <Modal {...props}  size="lg" aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
                <Col sm={12} md={6}>
                    <Image src={props.texture} fluid="true" />
                </Col>
                <Col sm={12} md={6} className='mt-2'>
                  <model-viewer 
                    id="modelModal"
                    src="https://cdn.glitch.me/fba9d1c3-4e26-47cd-867f-19660ae37f80%2Ftest-whale-scale-root-bone.glb?v=1636271548450"
                    ios-src="https://cdn.glitch.me/fba9d1c3-4e26-47cd-867f-19660ae37f80%2Ftest-whale-scale-root-bone-tex.usdz?v=1636599386704"
                    poster="https://cdn.glitch.me/fba9d1c3-4e26-47cd-867f-19660ae37f80%2Funnamed.png?v=1636256018924"
                    alt="A 3D model of an astronaut"
                    shadow-intensity="1"
                    camera-controls
                    auto-rotate autoplay ar
                    ar-modes="webxr scene-viewer quick-look">
                  </model-viewer>
                  <section className="attribution">
                    <h5 className='ms-auto'>{props.title}&nbsp;&nbsp;&nbsp;<span style={{fontSize:'.9rem'}}>{props.text}</span></h5>
                  </section> 
                </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default GridModel;
