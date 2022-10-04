import { Row, Col, Button, Modal, Image } from 'react-bootstrap';
import styles from '../../styles/SubmitPage.module.css';

const AppModal = ({show, setShow}) => {
 const handleClose = () => setShow(false);
 return(
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Mindful Ocean app</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Image src="/icon.png" alt="icon" fluid />
        <Row className='mb-3'>
        <Col xs={6} className="d-flex justify-content-center">
            <Button href="/mobileapp" className={styles.appBtn} style={{backgroundImage:"url('apple_store.png')"}}></Button>
        </Col>
        <Col xs={6} className="d-flex justify-content-center">
            <Button href="/mobileapp" className={styles.appBtn} style={{backgroundImage:"url('google_play_store.png')"}}></Button>
        </Col>
        </Row>
        </Modal.Body>
  </Modal>
 )
}

export default AppModal;