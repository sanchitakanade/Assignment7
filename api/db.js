/* Name: Sanchita Kanade
   Class:CS648.02 Modern Full-Stack Web Development (Spring 2020)
   Assignment: 7
   File: db.js
*/

require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;
const url = process.env.DB_URL || 'mongodb+srv://sanchita:Mayureshwar123@nodeproject-fuurm.mongodb.net/CS649FullStackDevelopment?retryWrites=true&w=majority';

async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate({ _id: name }, { $inc: { current: 1 } }, { returnOriginal: false });
  return result.value.current;
}
function getDb() {
  return db;
}

module.exports = { connectToDb, getNextSequence, getDb };
