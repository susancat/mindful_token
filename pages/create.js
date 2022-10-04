import {Row, Col, Image, Container, Button, Card} from 'react-bootstrap';
import Script from 'next/script';
import Link from 'next/link';
import styles from '../styles/CreatePage.module.css';
import homeStyles from '../styles/Home.module.css';
import Layout from '../components/SubpageLayout';
import DragDrop from '../components/DragDrop';

function CreatePage() {
    var canvas = "";
    //cause when render from frontend, there is no browser
    if(typeof window !== "undefined") {
        canvas = window.localStorage.canvas;
    } 

    return(
        <Container className={styles.createPage}>
            <Row className='ms-5' ><Link href="/"><h6 style={{cursor: 'pointer'}}>&larr; Return to homepage</h6></Link></Row>
            <Row className='mt-5 mb-3 text-center d-flex justify-content-center'>
                <h6>Create and color your own version of fish!</h6>
                <a href='/whale.png' target="_blank" className={`${styles.downloadBtn}`} download>
                    <h5 className={styles.downBtnText} >Download template <Image src="/downloadIcon.png" style={{width: '10%'}} /></h5>
                </a>
            </Row>
            <Row>
                <div className={styles.card} style={{width: '50%', marginLeft: 'auto', marginRight: 'auto'}} >
                    <section className="attribution">
                        <p>upload your artwork (no bigger than 1MB) to preview it on 3D model!</p>
                    </section> 
                    <model-viewer
                        id="previewModel"
                        src="https://cdn.glitch.me/fba9d1c3-4e26-47cd-867f-19660ae37f80%2Ftest-whale-scale-root-bone.glb?v=1636271548450"
                        ios-src="https://cdn.glitch.me/fba9d1c3-4e26-47cd-867f-19660ae37f80%2Ftest-whale-scale-root-bone-tex.usdz?v=1636599386704"
                        poster="https://cdn.glitch.me/fba9d1c3-4e26-47cd-867f-19660ae37f80%2Funnamed.png?v=1636256018924"
                        alt="A 3D model of an ocean animal"
                        shadow-intensity="1"
                        camera-controls
                        auto-rotate autoplay ar
                        ar-modes="webxr scene-viewer quick-look"
                       >
                    </model-viewer>
                    <DragDrop />
                </div>
            </Row>
            <Row className='text-center d-flex justify-content-center mt-4'>
                <h6>If you are happy with the result, you may go to our mobile app to</h6>
                <h6>create and proceed here to submit the artwork and redeem the mintpass.</h6>
            </Row>
            <Row className='d-flex justify-content-center mt-5'>
                <Button href='/authentication' className={`${homeStyles.btn} ${styles.overlayBtn}`} style={{fontWeight: '800', fontSize: '1.5rem'}}>Submit &rarr;</Button>
            </Row>
            {/* <Col>
            <Image src={`${canvas}`} id="previewImg" fluid="true" />
            </Col> */}
            <Script type="text/javascript" charset="utf-8" src="/js/createPreview.js" />
            <Script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" />
            <Script nomodule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js" />
        </Container>
    )
}

//per-page layout
CreatePage.getLayout = function getLayout(page) {
    return (
      <Layout>
        {page}
      </Layout>
    )
}

export default CreatePage;