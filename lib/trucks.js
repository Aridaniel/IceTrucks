// import {server} from '../config/index';
import {connectToDatabase} from '../utils/database'
let ObjectId = require('mongodb').ObjectID;

// Get a single book's data using ObjectId
export async function getAllTrucks() {
  const {db} = await connectToDatabase();
  const data = await db.collection('trucks').find({}).toArray();
  const allTrucks = JSON.parse(JSON.stringify(data));
  return allTrucks;
}

// Get all the truck id's for dynamic static page generation
export async function getAllTruckIds() {
  const {db} = await connectToDatabase();
  // const allBooks = await getMongoBooks();
  const data = await db.collection('trucks').find({}).toArray();
  const allTrucks = JSON.parse(JSON.stringify(data));
  return allTrucks.map((item) => {
    return {
      params: {
        id: item._id
      }
    }
  });
}

// Get a single book's data using ObjectId
export async function getTruckData(id) {
  const {db} = await connectToDatabase();
  const data = await db.collection('trucks').findOne({'_id': ObjectId(id)});
  const foundTruck = JSON.parse(JSON.stringify(data));
  return {
    id,
    ...foundTruck
  }
}