import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let truck = new Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  menu: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  },
  location: {
    type: Object,
    required: false
  },
  tags: {
    type: Array,
    required: true
  }
});

mongoose.models = {};

let Truck = mongoose.model('Truck', truck);
export default Truck;