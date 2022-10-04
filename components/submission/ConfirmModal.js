import { Row, Button, Modal } from 'react-bootstrap';
import homeStyles from '../../styles/Home.module.css';
import styles from '../../styles/SubmitPage.module.css';

const ConfirmModal = ({confirmShow,setConShow }) => {
    const handleConfirmClose = () => setConShow(false);
    return (
        <Modal show={confirmShow} onHide={handleConfirmClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row className='mb-3'>
          <p>After a Mint Pass is generated, you cannot upload another artwork before 4 hours of wait time.</p>
        </Row>
        <Row className='d-flex justify-content-center'>
          <Button href='/mintpass' className={`${homeStyles.btn} ${styles.confirmBtn}`} style={{fontWeight: '800'}}>Confirm</Button>
        </Row>
        </Modal.Body>
      </Modal>
    )
}

export default ConfirmModal;