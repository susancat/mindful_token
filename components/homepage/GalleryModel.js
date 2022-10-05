import { useState,useEffect } from 'react';
import { Card } from 'react-bootstrap';
import styles from '../../styles/Gallery.module.css';
import axios from 'axios';

import GridModal from '../gallery/GridModal';

const GalleryModel = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [nft,setNft] = useState();
    const { index, metadata, image } = props
    useEffect(() => {
        loadNFT();
        const modelViewer = document.getElementById(`model${index}`);
        if(modelViewer) {
            modelViewer.addEventListener("load", () => {
                let material = modelViewer.model.materials[0];
                let newTexture = async (imageSource) => {
                    return await modelViewer.createTexture(imageSource)
                }
                let initTexture = async (attr, channel, imageSource) => {
                    const texture = await newTexture(imageSource);
                    material[attr][channel].setTexture(texture);
                }
                let source = image;
                initTexture('pbrMetallicRoughness', 'baseColorTexture', source)            
            }
        )};
    });

    async function loadNFT() {
        const mtdata = await axios.get(`${metadata}`);
        let nft = {
            texture:mtdata.data.image,
            name:mtdata.data.name,
            author:mtdata.data.author,
            description:mtdata.data.description
        }
        setNft(nft);
        setLoaded(true); 
        //the elements will be created after render, so the above shouldn't be called in rendering
    }

    async function load3DModel() {
        
        }   
    if (loaded === false && !nft) return (
        <h1 className="px-20 py-10 text-3xl">
            <div className="loadingAnim"></div>
        </h1>
    )
    return(
        <>
        <Card className={styles.card} onClick={() => setModalShow(true)}>
            {/* src is the 3D model, poster is the texture */}
            <model-viewer 
                id={`model${index}`}
                src="https://cdn.glitch.me/fba9d1c3-4e26-47cd-867f-19660ae37f80%2Ftest-whale-scale-root-bone.glb?v=1636271548450"
                ios-src="https://cdn.glitch.me/fba9d1c3-4e26-47cd-867f-19660ae37f80%2Ftest-whale-scale-root-bone-tex.usdz?v=1636599386704"
                poster="https://cdn.glitch.me/fba9d1c3-4e26-47cd-867f-19660ae37f80%2Funnamed.png?v=1636256018924"
                alt="A 3D model of an fish"
                shadow-intensity="1"
                camera-controls
                auto-rotate autoplay ar
                ar-modes="webxr scene-viewer quick-look">
            </model-viewer>
            <Card.Body>
                <Card.Title>{nft.name}</Card.Title>
                <Card.Text>
                by {nft.author}
                <p>{nft.description}</p>
                </Card.Text>
            </Card.Body>
        </Card>
        <GridModal show={modalShow} onHide={() => setModalShow(false)} texture={nft.texture} title={nft.name} text={`by ${nft.author}`} />
        </>
    )
}

export default GalleryModel;