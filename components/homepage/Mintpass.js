import { Row, Col, Button, Image, Container } from 'react-bootstrap';
import homeStyles from '../../styles/Home.module.css';
import styles from '../../styles/Mintpass.module.css';

const Mintpass = () => {
    return (
        <div className={styles.mintpassRow} id="mintpass">
            <Row style={{marginLeft: '3rem'}}>
              <h3>Mint Pass</h3>
              <p className="mt-1">Submit artworks created by the Mindful Ocean app to collect Mint Pass. With a Mint Pass, you will be able to redeem your own artwork NFT when they are ready to be minted.</p>
            </Row>
            <Row className={styles.mintpassImg}>
                <Image className="" src="/mintpassSec.png" fluid='true' alt="mint pass" />
            </Row>
            <Row className='d-flex justify-content-center'>
                <Button href='/authentication' className={`${homeStyles.btn} ${styles.overlayBtn}`} style={{fontWeight: '800', fontSize: '1.5rem'}}>Submit &rarr;</Button>
            </Row>
        </div>
    )
}

export default Mintpass;