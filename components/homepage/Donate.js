import { Row, Image, Container } from 'react-bootstrap';
import styles from '../../styles/Donate.module.css';

const Donate = () => {
    return (
        <div className={styles.donate} id="donate">
            <Image className={styles.bgpart9} src="/measuredBoxes/9.png" alt="Ocean9" />
            <Image className={styles.bgpart11} src="/measuredBoxes/11.png" alt="Ocean11" />
            <Row className={styles.title}>
                <h3 >Donate</h3>
                <p className="mt-1">For every NFT sold in the Mindful Ocean project, we are going to donate 5% of the profit to The Ocean Clean Up -- a non-profit engineering environmental organization based in the Netherlands. You can contribute and be part of our ocean proteaction program, by simply submit your creations!</p>         
                <picture>
                    <source srcSet="verticalDonate.png" media="(max-width: 600px)" />
                    <Image className={styles.img} src="donate.png" alt="Donate to The Ocean Clean Up" fluid='true' />
                </picture>             
            </Row>
        </div>
    )
}

export default Donate;