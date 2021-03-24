import connectDB from '../../../middleware/mongodb';
import Truck from '../../../schemas/truck';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const id = req.query.id;
    const data = await Truck.findById(id);
    res.status(200).json(data);
  }
};

export default connectDB(handler);
