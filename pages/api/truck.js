import connectDB from '../../middleware/mongodb';
import Truck from '../../schemas/truck';

// ToDo: Check if user is authenticated via authentication header where id token is passed in order to allow post
const handler = async (req, res) => {
  if (req.method === 'POST') {
    console.log('body:' , req.body)
    const { name, email, phone, menu, description, location, /* tags */ } = req.body;
    // Check if name, email, phone, description or /* tags */ are provided
    if (name && email && phone && description/* && tags */) {
        try {
          let truck = new Truck({
            name,
            email,
            phone,
            menu: menu !== null ? menu : 'No menu yet',
            description,
            location,
            /* tags */
          });
          let createdTruck = await truck.save();
          return res.status(200).send(createdTruck);
        } catch (error) {
          return res.status(500).send({message:error.message});
        }
      } else {
        res.status(422).send('data_incomplete');
      }
  } else if(req.method === 'GET') {
    const data = await Truck.find({});

    res.status(200).send({'data': data});
  } else {
    res.status(422).send('req_method_not_supported');
  }
}

export default connectDB(handler);