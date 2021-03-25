// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import firebase from 'firebase/app'
import firebaseClient from '../../firebaseClient'
import admin from 'firebase-admin'
import { verifyIdToken } from '../../firebaseAdmin';
import connectDB from '../../middleware/mongodb';
import Truck from '../../schemas/truck';

const handler = async (req, res) => {
  if(req.method === 'POST') {
    // firebaseClient();
    // const { truckId, status } = req.body;
    const { id, status} = req.body; // Send via auth header?
    const token = req.headers.authorization;
    let user;

    // Check if the token passed in is verified
    try {
      user = await verifyIdToken(token);
    } catch(error) {
      res.status(401).json({msg: 'Log in to post ', error})
      return;
    }
    // Check if the user has admin custom claims
    if(!user.admin) {
      // Return an error...
      res.status(403).json({error: 'Permission denied for this action'})
      return;
    }
    // User is allowed to post
    try {
      const found = await Truck.findByIdAndUpdate(id, {visible: status}, {new: true});
      res.status(200).json(found)
      return;
    } catch(error) {
      res.status(500).json({msg: 'Something went wrong updating status: ', error})
      return;
    }
  } else {  // Request method isn't POST
    res.status(200).json({error: 'Use POST method to change status'})
  }
}

export default connectDB(handler);

// export default async (req, res) => {
//   firebaseClient();
//   // const { truckId, status } = req.body;
//   const { token } = req.body;
  
//   // Check if user id is an admin user
//   const user = await verifyIdToken(token);
//   if(!user.admin) {
//     // Return an error...
//     res.status(403).json({error: 'Permission denied for this action'})
//   }
//   res.json({msg: user});
//   // res.json(user);
//   // admin.auth().getUser(userId).then((userRecord) => {
//   //   console.log('UserRec: ', userRecord);
//   // }).catch((error) => {
//   //   console.log('Error: ', error);
//   // })
//   // Return error if user is not admin

//   // Change trucks status

//   // Return error if status change fails

//   // Return success

//   // res.status(200).json({ name: 'John Doe' })
// }
