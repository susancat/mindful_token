import Link from 'next/link';
import styles from '../styles/SubmitPage.module.css';
import { Row, Col, Image, Container } from 'react-bootstrap';

//if this page displayed, duplicated the localStorage image and remove the image in DB
  //may need to clear the localStorage.canvas for side-effects cleaning up
export default function MintedPage() {
    return(
        <div className={styles.submitPage}>
            <Row><Link href="/">&larr; Return to homepage</Link></Row>
            <Row className="mt-4"><h5>Submit Artwork</h5></Row>

            <Row className='mt-4'>
            <Col xs={4} className={`${styles.item} ${styles.itemDisable}`}>
                <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
                <div className={styles.content}><i className="fa-solid fa-circle-check" style={{color: "#7FFF00"}}></i>&nbsp;1. Authentication</div>
                <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
            </Col>
            <Col xs={4} className={`${styles.item} ${styles.itemDisable}`}>
                <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
                <div className={styles.content}><i className="fa-solid fa-circle-check" style={{color: "#7FFF00"}}></i>&nbsp;2. Submission</div>
                <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
            </Col>
            <Col xs={4} className={`${styles.item} ${styles.itemDisable}`}>
                <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
                <div className={styles.content}><i className="fa-solid fa-circle-check" style={{color: "#7FFF00"}}></i>&nbsp;3. Get Mintpass</div>
                <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
            </Col>
            </Row>
            <Container className='mt-2 ms-5 mb-5'>
                <Row className='text-center'>
                    <h6 style={{fontWeight: '800'}}>Your fish is successfully submitted.</h6>
                </Row>
                <Row className='d-flex justify-content-center'>
                    <Image src="/minted.png" alt="minted" style={{width: '50%'}} />
                </Row>
                <Row className='text-center'>
                    <h6 style={{fontWeight: '800'}}>Mint Pass is now generated in your wallet.</h6>
                    <p>View Mint Pass on your&nbsp; 
                        <span style={{textDecoration: "underline"}}><Link href="/dashboard">dashboard</Link></span>
                        &nbsp;or trade Mint Pass on&nbsp; 
                        <span style={{textDecoration: "underline"}}>
                            <a href="https://testnets.opensea.io/collection/mindfulpass-v2" target="_blank" rel='noreferrer'>Opensea</a>
                        </span>
                    </p>
                </Row>
            </Container>
         </div>
        )
}