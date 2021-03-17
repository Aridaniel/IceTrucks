import connectDB from '../../middleware/mongodb';
import Truck from '../../schemas/truck';

// ToDo: Check if user is authenticated via authenticatio header where id token is passed in order to allow post
const handler = async (req, res) => {
  if (req.method === 'POST') {
    // Check if name, email or password is provided
    const { name, email, phone, menu, description, location, tags } = req.body;
    if (name && email && phone && description && tags) {
        try {
          // Hash password to store it in DB
          // var passwordhash = await bcrypt.sign(password);
          let truck = new Truck({
            name,
            email,
            phone,
            menu: menu !== null ? menu : 'No menu yet',
            description,
            location,
            tags
          });
          let createdTruck = await truck.save();
          return res.status(200).send(createdTruck);
        } catch (error) {
          return res.status(500).send(error.message);
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
// export default (req, res) => {
//   res.status(200).json({ name: 'TRUUUCKS' })
// }