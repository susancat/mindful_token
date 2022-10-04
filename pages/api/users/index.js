import { connect } from "../../../utils/connection";
import User from "../../../models/user";

export default async function handler(req, res) {
  await connect();//if put this inside the try/catch will be much slower
  const catcher = ( err ) => res.status(400).json({ err })
  if (req.method === 'GET') { //fetch all users
    try {
    const email = req.query.email;
    // console.log(email);
    res.json(await User.findOne({"email": email}).catch(catcher))
    } catch(err) {
      res.status(500).json(err);
    }
  } else if(req.method === 'POST') { 
    //update only if the user has minted to avoid multi-times POST call
    try{
      const email = req.body.email;
      const wallet = req.body.account;
      // console.log(req.body);
      const existingUser = await User.findOne({"email": email});
      if(!existingUser) {
        res.status(404).send('Sorry, please login from Mindful Ocean mobile app to create an account!');
      } else {
        //update the user here, should without await to avoid "query sent error"
        User.findOneAndUpdate({"email": email}, 
        {
          wallet: wallet,
        }, (err, updatedUser) => {
          if(err) {
            console.log(err);
          } else {
            console.log("updated")
          }
        }
        )
      } 
    } catch (err) {
    res.status(500).json(err);
   }
  } else if (req.method === 'PUT') {
    try{
      const email = req.body.email;
      const tokenId = req.body.tokenId;
      const index = req.body.index;
      // console.log(req.body);
      const existingUser = await User.findOne({"email": email});
      if(!existingUser) {
        res.status(404).send('Sorry, please login by your twitter account first!');
      } else {
        //update the user here, should without await to avoid "query sent error"
        existingUser.mintPassId.push(tokenId);//push will return new length of the array
        // const cutImgArr = existingUser.images.splice(index, 1);
        //the above array will be the part cut
        existingUser.images.splice(index, 1);
        User.findOneAndUpdate({"email": email}, 
        {
          mintPassId: existingUser.mintPassId,
          images: existingUser.images,
          allowSubmission: false,
          submissionTime: new Date()
        }, (err, updatedUser) => {
          if(err) {
            console.log(err);
          } else {
            console.log("removed")
          }
        }
        )
      } 
    } catch (err) {
    res.status(500).json(err);
   }
  }
}