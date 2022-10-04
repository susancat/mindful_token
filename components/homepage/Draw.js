import { Row, Image, Button, Col, Container } from 'react-bootstrap';
import styles from '../../styles/Draw.module.css';

const Draw = () => {
    return (
      <div className={styles.draw} id="mobileapp" >
        <Row className={styles.title}>
          <h3>Create</h3>
          <p className="mt-1">Download Mindful Ocean at App Store to create your own version of fish.</p>
        </Row>
        <Row className={styles.bgRow}>      
          <Image className={styles.bgpart13} src="/measuredBoxes/13.png" alt="ocean13" />
          <div className={styles.container}>
            <Image className={styles.icon} src="icon.png" alt="top mindful ocean" fluid='true' />
            <Row className={`mt-3 ${styles.appBtnRow}`}>
              <Col xs={12} sm={6} lg={6} className="mt-1 d-flex justify-content-center">
                <Button href="/mobileapp" className={styles.appBtn} style={{backgroundImage:"url('apple_store.png')"}}></Button>
              </Col>
              <Col xs={12} sm={6} lg={6} className="mt-1 d-flex justify-content-center">
                <Button href="/mobileapp" className={styles.appBtn} style={{backgroundImage:"url('google_play_store.png')"}}></Button>
              </Col>
            </Row>
          </div>
        </Row>
        <div className={styles.imgDiv}>
              <Image src="/measuredBoxes/12.png" alt="ocean12" className={styles.bgpart12} />
        </div> 
      </div>
    )
}

export default Draw;