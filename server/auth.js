const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'mang_xa_hoi';

async function registerUser(username, password) {
  await client.connect();
  const db = client.db(dbName);
  const users = db.collection('users');

  const existing = await users.findOne({ username });
  if (existing) throw new Error("User exists");

  const hashed = await bcrypt.hash(password, 10);
  await users.insertOne({ username, password: hashed });
}

async function loginUser(username, password) {
  await client.connect();
  const db = client.db(dbName);
  const users = db.collection('users');

  const user = await users.findOne({ username });
  if (!user) return false;

  const match = await bcrypt.compare(password, user.password);
  return match;
}

module.exports = { registerUser, loginUser };
