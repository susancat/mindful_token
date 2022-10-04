import { Row, Col, Button, Image, Container } from 'react-bootstrap';
import Link from 'next/link';
import homeStyles from '../../styles/Home.module.css';
import styles from '../../styles/Create.module.css';

const Create = () => {
    return (
        <div className={styles.createRow} id="create">
            <Row style={{marginLeft: '3rem'}}>
              <h3>Create</h3>
              <p className="mt-1">Color your own version of fish and be part of the community.</p>
            </Row>
            <Row className=''>
                <Col xs={12} md={12} lg={5}>    
                    <Container style={{marginLeft: '2.5rem'}}>
                        <h4 className="">The theme of this month is: </h4>
                    </Container>
                    <Image className='mt-4' src="create.png" alt="month fish" fluid='true' />
                    <Row className='ms-5 mt-5'>
                     <Col xs={5} className="d-flex">
                        <h2 className="align-self-center"><strong>Dolphin</strong></h2>
                        </Col>
                        <Col xs={7} className="d-flex">
                            <p className='align-self-center mt-3'>Download template&ensp;<a href='/whale.png' target="_blank" download><Image src="/downTemBtn.png" className={styles.downloadBtn} /></a></p>
                        </Col>
                    </Row>           
                </Col>
                <Col xs={12} md={12} lg={7}>
                    {/* <div className={styles.imgDiv}>
                        <Image className={styles.bgpart8} src="/measuredBoxes/8.png" alt="Ocean8" />
                    </div> */}
                    {/* <Image className={styles.bgpart10} src="/measuredBoxes/10.png" alt="Ocean10" /> */}
                    <Row>
                        <Image className={styles.rightImg} src="/preview3DModel.png" fluid='true' alt="preview 3D model" />
                    </Row>
                    <Row className='d-flex justify-content-center'>
                        <Button href='/create' className={`${homeStyles.btn} ${styles.overlayBtn}`} style={{fontWeight: '800', fontSize: '1.5rem'}}>Preview 3D model &rarr;</Button>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Create;