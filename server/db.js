const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'mang_xa_hoi';

async function saveMessage(msg) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('messages');
  await collection.insertOne({ text: msg, time: new Date() });
}

module.exports = { saveMessage };
