import { connect } from "../../../utils/connection";
import Image from "../../../models/image";

export default async function handler(req, res) {
  await connect();//if put this inside the try/catch will be much slower
  const catcher = ( err ) => res.status(400).json({ err })
  if(req.method === 'POST') { 
      //duplicate the image stored in localStorage
      try{
        const name = req.body.tokenId;
        const img = req.body.img;
        const timeSubmitted = new Date();
        console.log(req.body);
        const newImage = {
          name,
          timeSubmitted,
          img
        }
        Image.create(newImage, (err, newImg) => {
          if(err) {
            console.log(err)
          } else {
            res.status(200).send('Image duplicated')
          }
        })
      } catch (err) {
      res.status(500).json(err);
    }
    }
}