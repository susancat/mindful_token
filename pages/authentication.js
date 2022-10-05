import { signIn, signOut, getSession } from 'next-auth/react';
import { getAccount, grabAccount, disconnectAccount, postUser } from '../store/actions';

import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link';
import styles from '../styles/SubmitPage.module.css';
import {Row, Col, Image, OverlayTrigger, Button, Tooltip} from 'react-bootstrap';

export default function AuthPage({ session }) {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.accountState);

  useEffect(() => {
    dispatch(getAccount());
  },[dispatch])

  const connect = async() => {
    await dispatch(grabAccount());
    await dispatch(postUser());
  }
  
//didn't work
  const disconnect = async() => {
    dispatch(disconnectAccount());
  }

  return(
    <div className={styles.submitPage}>
        <Row><Link href="/"><h6 style={{cursor: "pointer"}}>&larr; Return to homepage</h6></Link></Row>
        <Row className="mt-4"><h4>Submit Artwork</h4></Row>

        <Row className='mt-4' style={{fontSize: "1.3rem", fontWeight:'800'}} >
          <Col xs={4} className={`${styles.item} ${styles.itemActive}`}>
            <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
            <div className={styles.content}><i className="fa-regular fa-circle"></i>&nbsp;1. Authentication</div>
            <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
          </Col>
          <Col xs={4} className={styles.item}>
            <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
            <div className={styles.content}><i className="fa-regular fa-circle"></i>&nbsp;2. Submission</div>
            <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
          </Col>
          <Col xs={4} className={styles.item}>
            <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
            <div className={styles.content}><i className="fa-regular fa-circle"></i>&nbsp;3. Get Mintpass</div>
            <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
          </Col>
      </Row>

      <Row className="mt-5 mb-5">
          <h5 className="mt-1">1. Connect Social</h5>
          {
            session &&
            <Row>
            <Col xs={6}>
              <Button size="lg" className={styles.disactiveBtn}>
                <i className="fa-solid fa-circle-check" style={{color: "#7FFF00"}}></i>
                <span style={{fontSize: "1.3rem", fontWeight:'800'}}>&nbsp;Twitter Connected</span>
              </Button>
            </Col>
            <Col xs={6} className='d-flex justify-content-center'>
              <OverlayTrigger overlay={<Tooltip>Disconnect</Tooltip>}>
                <Button className={styles.activeBtn} onClick={ () => signOut() }>
                <i className="fa-solid fa-xmark"></i>
                <span style={{fontSize: "1.3rem", fontWeight:'800'}}>&nbsp;{session.user.name ?? session.user.email}</span>
                </Button>
              </OverlayTrigger>
              </Col>
            </Row>
            }
          {
            !session &&
            <Row>
            <Col xs={6}>
              <Button size="lg" className={styles.disactiveBtn} onClick={ () => signIn() }>
                <Image src="/twitter.png" width="15px" height="15px" alt="twitter icon" />
                <span style={{fontSize: "1.3rem", fontWeight:'800'}}>&nbsp;Connect Twitter</span>
              </Button>
            </Col>
            <Col xs={6}>
              <h5 className="mt-2" style={{color: "grey", textAlign: "center"}}>&nbsp;&nbsp;&nbsp;Twitter not connected</h5>
            </Col>
            </Row>
          }
          <Row className='mt-3'>
            <Col xs={6}>
              <OverlayTrigger overlay={<Tooltip>You will need to access images created from Mindful Ocean app which saved under your twitter ID</Tooltip>}>
                <h6 style={{textDecoration: "underline"}}>Why should I link my twitter account?</h6>
              </OverlayTrigger>
            </Col>
          </Row>
        </Row>
        <hr />
        <Row className='mt-5'>
          <h5>2. Connect Wallet</h5>
          {(account) ?
          <Row>
            <Col xs={6}>
                <Button size="lg" className={styles.disactiveBtn}>
                  <i className="fa-solid fa-circle-check" style={{color: "#7FFF00"}}></i>
                  <span style={{fontSize: "1.3rem", fontWeight:'800'}}>&nbsp;Wallet Connected&nbsp;</span>
                </Button>
            </Col>
            <Col xs={6} className='d-flex justify-content-center'>
              <OverlayTrigger overlay={<Tooltip>Disconnect</Tooltip>}>
                    <Button className={styles.activeBtn} onClick={disconnect}>
                    <i className="fa-solid fa-xmark"></i>
                    <span style={{fontSize: "1.3rem", fontWeight:'800'}}>&nbsp;{account.slice(0,5).concat('...').concat(account.slice(-4))}</span>
                    </Button>
              </OverlayTrigger>
            </Col>
          </Row>
          : 
          <Row className="mt-1">
            <Col xs={6}>
              <Button size="lg" className={styles.disactiveBtn} onClick={connect}>
                  <Image src="/metamask.png" width="15px" height="15px" alt="metamask icon" />
                  <span style={{fontSize: "1.3rem", fontWeight:'800'}}>&nbsp;Connect Wallet&nbsp;</span>
              </Button>
            </Col>
            <Col xs={6}>
                <h5 className="mt-2" style={{color: "grey", textAlign: "center"}}>&nbsp;&nbsp;&nbsp;Wallet not connected</h5>
              </Col>
          </Row>
          }
        </Row>

        <Row className='justify-content-md-center mt-5'>
          {session && account ?
          <Button href="/submission" size="lg" className={styles.disactiveBtn} style={{width: "30%", borderRadius: "10px", fontSize: "1.3rem", fontWeight:'800'}}>Next&nbsp;&rarr;</Button>
          :
          <Button size="lg"  variant="secondary" style={{width: "30%", borderRadius: "10px", fontSize: "1.3rem", fontWeight:'800'}} disabled>Next&nbsp;&rarr;</Button>
          }
        </Row>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session
    }
  }
}