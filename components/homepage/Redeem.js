import { Row, Image, Container } from 'react-bootstrap';
import styles from '../../styles/Redeem.module.css';

const Redeem = () => {
    return (
        <div className={styles.redeem} id="mindfultoken">
           <Row className={styles.title} >
                <h3>Redeem</h3>
                <p className='mt-1'>Redeem your Mindful Token after submitting your coloring artworks! With the Token you can vote for the next NGO and fish theme for the coming event!</p>         
                <picture>
                    <source srcSet="verticalRedeem.png" media="(max-width: 600px)" />
                    <Image className={styles.redeemImg} src="redeem.png" alt="redeem" fluid='true' lazy="true" />
                </picture>
           </Row>
           <Image className={styles.bgpart14} src="/measuredBoxes/14.png" alt="Ocean14" />
           <div className={styles.imgDiv}>
                <Image className={styles.bgpart15} src="/measuredBoxes/15.png" alt="Ocean15" />
            </div>
        </div>
    )
}

export default Redeem;