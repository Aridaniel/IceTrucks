import connectDB from '../../middleware/mongodb';
import Truck from '../../schemas/truck';
import admin from 'firebase-admin';
import { verifyIdToken } from '../../firebaseAdmin';

// ToDo: Clean up the user authentication for the POST method
const handler = async (req, res) => {
  // let decodedToken;
  if (req.method === 'POST') {
    let canPost = false;
    const authToken = req.headers.authorization;
    let decodedToken;
    // Verify token recieved through authorization header
    try {
      decodedToken = await verifyIdToken(authToken);
    } catch (error) {
      res.status(401).send({ msg: 'Log in to post', error });
      return;
    }
    // console.log('POSTreq decTok: ', decodedToken);
    // Set canPost flag to true if the getUser() finds a user with given uid
    canPost = await admin
      .auth()
      .getUser(decodedToken.uid)
      .then((userRecord) => {
        return true;
      })
      .catch((error) => {
        return false;
      });

    if (canPost) {
      const {
        name,
        email,
        phone,
        menu,
        description,
        location,
        tags,
      } = req.body;
      // Check if name, email, phone, description or /* tags */ are provided
      if (name && email && phone && description /* && tags */) {
        try {
          let truck = new Truck({
            name,
            userId: decodedToken.uid,
            email,
            phone,
            menu: menu !== null ? menu : 'No menu yet',
            description,
            location,
            tags,
          });
          let createdTruck = await truck.save();
          return res.status(200).send(createdTruck);
        } catch (error) {
          return res.status(500).send({ message: error.message });
        }
      } else {
        res.status(422).send('data_incomplete');
      }
    } else {
      console.log('Canpostelse: ', canPost);
      res.status(401).send({ msg: 'Unauthorized' });
    }
  } else if (req.method === 'GET') {
    const data = await Truck.find({});

    res.status(200).send({ data: data });
  } else {
    res.status(422).send('req_method_not_supported');
  }
};

export default connectDB(handler);
