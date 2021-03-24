import connectDB from '../../../middleware/mongodb';
import Truck from '../../../schemas/truck';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const id = req.query.id;
      const data = await Truck.findById(id);
      res.status(200).json(data);
    } catch(error) {
      res.status(400).json({'error': 'No truck with given id'})
    }
  }
};

export default connectDB(handler);
