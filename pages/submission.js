import Script from 'next/script';
import { getSession } from 'next-auth/react';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import homeStyles from '../styles/Home.module.css';
import styles from '../styles/SubmitPage.module.css';
import { Row, Col, Image, Container, Button, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';

import axios from 'axios';
import AppModal from '../components/submission/AppModal';
import ConfirmModal from '../components/submission/ConfirmModal';
//just pass the setShow and setConShow as props to children components
export default function SubmitPage({ session,user }) {
  const [show, setShow] = useState(false);
  const [confirmShow, setConShow] = useState(false);
  const [newest, setNewest] = useState(true);

  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);

  const images = user.images;
  const mintAllow = user.allowSubmission;
  const mintTime = new Date(user.submissionTime);
console.log(mintAllow);
  useEffect(() => {
    
  },[])
  //the default order is by newest 

  const handleShow = () => setShow(true);
  const handleConfirmShow = () => setConShow(true);

  let imageSelected;
  if(typeof window !== "undefined") {
    console.log(window.localStorage.index + " " + window.localStorage.canvas)
    imageSelected =  window.localStorage.canvas;
  }

  function refreshPage(){ 
    window.location.reload(); 
  }

  function sortOldest() {
    setNewest(false);
  }

  function sortNewest() {
    setNewest(true);
  }

  async function selectImage(image, index) {
      localStorage.canvas = image;
      localStorage.index = index;
      location.reload();
  }
  function startCountDown() {
    // const mintTime = new Date("06/09/2022 14:00:00"); //for testing only
    const waitingTime = 4 * 3600000;//users wait for 4 hours
    const interval = setInterval(() => {
    const now = new Date();
    const difference = waitingTime - (now.getTime() - mintTime.getTime());
    //in millisec
    const h = Math.floor(
      (difference % (1000 * 60 * 60 *24)) / (1000 * 60 * 60)
    );
    setHours(h);

    const m = Math.floor(
      (difference % (1000 * 60 * 60)) / (1000 * 60)
    );
    setMins(m);

    const s = Math.floor(
      (difference % (1000 * 60)) / 1000
    );
    setSecs(s);
    }, 1000);

    return () => 
    {
      allowSubmission();
      clearInterval(interval);
    };
  }

  async function allowSubmission() {
    await axios.get(
      `/api/users`,
        { params: 
          { 
            allowSubmission: true, 
          }
        }
      )
  }
  return(
    <div className={styles.submitPage}>
        <Row><Link href="/"><h6 style={{cursor: "pointer"}}>&larr; Return to homepage</h6></Link></Row>
        <Row className="mt-4"><h4>Submit Artwork</h4></Row>

        <Row className='mt-4' style={{fontSize: "1.3rem",fontWeight:'800'}}>
          <Col xs={4} className={styles.item}>
            <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
            <div className={styles.content}><i className="fa-solid fa-circle-check" style={{color: "#7FFF00"}}></i>&nbsp;1. Authentication</div>
            <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
          </Col>
          <Col xs={4} className={`${styles.item} ${styles.itemActive}`}>
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

        <Container className='mt-4 mb-5'>
          <Row>
          <Col xs={5}>
            <Row>
              <Col xs={10}><h4>Browse your artworks: </h4></Col>
              <Col xs={2}>
                {
                  newest ? 
                  <OverlayTrigger overlay={<Tooltip id="">Sort: Oldest</Tooltip>}>
                    <span className="d-inline-block">
                    <Button variant="light" className={styles.sortBtn} onClick={sortOldest}><i className="fa-solid fa-arrow-down-short-wide"></i></Button>
                    </span>
                  </OverlayTrigger>
                 :
                  <OverlayTrigger overlay={<Tooltip id="">Sort: Newest</Tooltip>}>
                    <span className="d-inline-block">
                    <Button variant="light" className={styles.sortBtn} onClick={sortNewest}><i className="fa-solid fa-arrow-down-wide-short"></i></Button>
                    </span>
                  </OverlayTrigger>
                }  
              </Col> 
            </Row>
            {!images ?
              <Row  className='mt-5 mb-5'>
                <p className='mt-5 mb-5'>No artwork is created in this account</p>
                <h4 className='text-center'>
                  <Image src="/twitter.png" width="15px" height="15px" alt="twitter icon" />
                  <span style={{fontWeight:'800'}}>&nbsp;{session.user.name}</span>
                </h4>
                <p className='mt-5 mb-3'>Download <span style={{textDecoration: "underline", cursor: "pointer"}} onClick={handleShow}>Mindful Ocean</span> to create and submit artwork, or</p>
                <Link href="/authentication" passHref><span style={{textDecoration: "underline", cursor: "pointer"}}>Switch to a different account</span></Link>
              </Row>
            :
            <>
            <div className={`text-center mt-1 mb-0 ${styles.bounce}`}>
              <Link href="/submission#0" passHref><i className="fa-solid fa-caret-up" style={{ color: "grey",fontSize: "2rem", cursor: "pointer"}}></i></Link>
            </div> 
              { newest ?
              //sort by newest: cause the "map" still loop from 0
                <Row className={`mt-1 ${styles.scrollBox}`}>
                    { 
                    images.map(image => (
                      <Form.Check key={`newest${images.indexOf(image)}`} className={styles.images} style={{position: "relative"}}>
                      <Form.Check.Label htmlFor={`imageGroup${image}`}>
                            <Form.Check.Input
                              name="imageGroup1"
                              type="radio"
                              id={`imageGroup${image}`}
                              className={styles.imageRadio}
                              // onChange={selectImage(image)} doesn't work
                              onChange={() => selectImage(images[images.length - images.indexOf(image) - 1], images.length - images.indexOf(image) - 1)}
                          />
                        <Image src={images[images.length - images.indexOf(image) - 1]} alt="submitted images" key={images.indexOf(image)} id={images.indexOf(image)} style={{cursor: "pointer", position: "relative"}} fluid />
                        <Button variant="light" size="lg" style={{position: "absolute",top: "0",right: "0",zIndex: "10", color: "#005D6C", backgroundColor:"rgba(250,250,250,.6)"}}>
                              <i className="fa-solid fa-trash-can"></i>
                          </Button>
                      </Form.Check.Label>
                    </Form.Check>
                    ))
                    }                      
                  </Row>       
                  : 
                  //sort by oldest
                  <Row className={`mt-1 ${styles.scrollBox}`}>
                { 
                  images.map(image => (
                    <Form.Check key={`oldest${images.indexOf(image)}`} className={styles.images} style={{position: "relative"}}>
                      <Form.Check.Label htmlFor={`imageGroup${image}`}>
                            <Form.Check.Input
                              name="imageGroup1"
                              type="radio"
                              id={`imageGroup${image}`}
                              className={styles.imageRadio}
                              onChange={() => selectImage(image, images.indexOf(image))} 
                          />
                          <Image src={image} alt="submitted images" className={styles.inputLabel} id={images.indexOf(image)} style={{cursor: "pointer"}} fluid />
                          <Button variant="light" size="lg" style={{position: "absolute",top: "0",right: "0",zIndex: "10", color: "#005D6C", backgroundColor:"rgba(250,250,250,.6)"}}>
                              <i className="fa-solid fa-trash-can"></i>
                          </Button>
                      </Form.Check.Label>
                    </Form.Check>
                  ))
                }                      
                </Row> 
               } 
            <div className={`mb-1 mt-0 text-center ${styles.bounce}`}>
                  <Link href={"/submission#4"}><i className="fa-solid fa-sort-down" style={{ color: "grey",fontSize: "2rem", cursor: "pointer"}}></i></Link>
                </div>
            <p>Create more in <span style={{textDecoration: "underline", cursor: "pointer"}} onClick={handleShow}>Mindful Ocean app</span></p>  
            </>     
            }
            <Row className='mt-3'>
              <Button className={`mt-3 p-0 ${styles.activeBtn}`} size="lg" style={{width: '70%', borderRadius: '20px', fontWeight: '800'}} onClick={refreshPage}><i className="fa-solid fa-rotate"></i>&nbsp;Refresh</Button>
            </Row>
          </Col>
         
            <Col xs={7} className="mt-5">
              <Row className='mt-4'></Row>
              <model-viewer
                  id="previewModel"
                  src="https://cdn.glitch.me/fba9d1c3-4e26-47cd-867f-19660ae37f80%2Ftest-whale-scale-root-bone.glb?v=1636271548450"
                  ios-src="https://cdn.glitch.me/fba9d1c3-4e26-47cd-867f-19660ae37f80%2Ftest-whale-scale-root-bone-tex.usdz?v=1636599386704"
                  poster=""
                  alt="A 3D model of an ocean animal"
                  shadow-intensity="1"
                  camera-controls
                  auto-rotate autoplay ar
                  ar-modes="webxr scene-viewer quick-look"
                  style={{height: '60vh'}}>
              </model-viewer>
              <Row className='d-flex justify-content-center mt-5'>
                {
                  (!mintAllow) || !images || imageSelected === "" ?
                  <Button variant="secondary" onClick={handleConfirmShow} className={`${homeStyles.btn} ${styles.submitBtn}`} disabled>Submit &rarr;</Button> :
                  <Button onClick={handleConfirmShow} className={`${homeStyles.btn} ${styles.submitBtn}`}>Submit &rarr;</Button>
                }
              </Row>     
                {
                   (!mintAllow) ?
                   <Row className='mt-5 text-center'>
                      <h6>Please try again later in: </h6>
                      <Row>
                        <Col xs={4}>
                          <h1 className='text-end' style={{fontWeight: "800"}}>0{hours} : </h1>
                          <h6>Hours</h6>
                        </Col>
                        {(mins <= 9) ?
                        <Col xs={4}>
                           <h1 style={{fontWeight: "800"}}>0{mins} :</h1> 
                           <h6>Minutes</h6>
                        </Col> :
                        <Col xs={4}>
                           <h1 style={{fontWeight: "800"}}>{mins} : </h1>
                           <h6>Minutes&nbsp;&nbsp;&nbsp;&nbsp;</h6>
                        </Col>
                        }
                        {(secs <= 9) ?
                          <Col xs={4}>
                             <h1 className='text-start' style={{fontWeight: "800"}}>0{secs}</h1>
                             <h6>Seconds</h6>
                          </Col> :
                          <Col xs={4}>
                             <h1 className='text-start' style={{fontWeight: "800"}}>{secs}</h1>
                             <h6 className='text-start'>Seconds</h6>
                          </Col>
                        }
                    </Row>
                </Row>
                : 
                <></>
                }             
            </Col>
          </Row>
        </Container>
        {/* mobile app confirm modal */}
        <AppModal setShow={setShow} show={show} />
      {/* submit confirm modal */}
        <ConfirmModal  setConShow={setConShow} confirmShow={confirmShow} />
        <Script type="text/javascript" charset="utf-8" src="/js/createPreview.js" />
        <Script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" />
        <Script nomodule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js" />
    </div>
  )
}

//getServerSideProps will get static data in building page process from server before the page render
export async function getServerSideProps(context) {
  const session = await getSession(context);  
  const BASE_URL = process.env.NEXTAUTH_URL;
  if(session) {
    const res = await axios.get(
      `${BASE_URL}/api/users`,
        { params: 
          { 
            email: session.user.email, 
          }
        }
      )
    const user = res.data;
    return {
      props: {
        session,
        user
      }
    }
  }
}