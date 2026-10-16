import express from 'express'
import { MongoClient } from 'mongodb';
import cors from 'cors'
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());

const client = new MongoClient(`mongodb+srv://${process.env.DB_USERS}:${process.env.DB_PASSWORD}@cluster0.oscwqjb.mongodb.net/`);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const connectedClient = await connectToMongoDB();
const db =connectedClient.db('simplecraddb');
const users =db.collection('users');

app.get('/', (req, res) => {
  res.send('simple crud is runnig');
});

app.get('/users',async (req, res) => {
  const cursor = users.find({});
  const allUsers = await cursor.toArray();
  res.send(allUsers);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});