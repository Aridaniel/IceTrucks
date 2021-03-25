// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { verifyIdToken } from '../../../firebaseAdmin';
import connectDB from '../../../middleware/mongodb';
import Truck from '../../../schemas/truck';

const handler = async (req, res) => {
  if(req.method === 'DELETE') {
    const id = req.query.id;
    const token = req.headers.authorization;
    let user;

    // Check 1: if the token passed in is verified
    try {
      user = await verifyIdToken(token);
    } catch(error) {
      res.status(401).json({msg: 'Log in to delete ', error})
      return;
    }

    // Check 2: if the user has admin custom claims
    if(!user.admin) {
      // Return an error...
      res.status(403).json({error: 'Permission denied for this action'})
      return;
    }

    // User is allowed to post
    try {
      const deleted = await Truck.findByIdAndDelete(id);
      res.status(200).json(deleted)
      return;
    } catch(error) {
      res.status(500).json({msg: 'Something went wrong updating status: ', error})
      return;
    }

    // res.status(200).json({msg: 'id sent: ', id})
  } else {  // Request method isn't POST
    res.status(200).json({error: 'Use DELETE method to delete truck'})
  }
}

export default connectDB(handler);