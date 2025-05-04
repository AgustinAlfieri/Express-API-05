import { MongoClient, Db } from 'mongodb';

const connectionString =
  process.env.MONGODB_URI ||
  'mongodb://127.0.0.1:27017/?retryWrites=true&w=majority';

const client = new MongoClient(connectionString);
await client.connect();

export let db: Db = client.db('heroclash4geeks');
