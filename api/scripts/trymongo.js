/* Name: Sanchita Kanade
   Class:CS648.02 Modern Full-Stack Web Development (Spring 2020)
   Assignment: 4
   File: trymongo.js
*/

/* eslint no-restricted-globals: "off" */
/* eslint linebreak-style: ["error", "windows"] */

const { MongoClient } = require('mongodb');

const url = process.env.DB_URL || 'mongodb+srv://sanchita:Mayureshwar123@nodeproject-fuurm.mongodb.net/CS649FullStackDevelopment?retryWrites=true&w=majority';

function testWithCallbacks(callback) {
  console.log('\n--- testWithCallbacks ---');
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  client.connect((connErr) => {
    if (connErr) {
      callback(connErr);
      return;
    }
    console.log('connected to MangoDb url', url);

    const db = client.db();
    const collection = db.collection('inventory');

    const item = { id: 1, name: 'A. Callback', age: 23 };
    collection.insertOne(item, (insertErr, result) => {
      if (insertErr) {
        client.close();
        callback(insertErr);
        return;
      }
      console.log('Result of insert:\n', result.insertedId);
      collection.find({ _id: result.insertedId }).toArray((findErr, docs) => {
        if (findErr) {
          client.close();
          callback(findErr);
          return;
        }
        console.log('Result of find:\n', docs);
      });
      client.close();
      callback();
    });
  });
}
async function testWithAsync() {
  console.log('\n--- testWithAsync ---');
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Connected to MongoDB URL', url);
    const db = client.db();
    const collection = db.collection('inventory');
    const item = { id: 2, name: 'B. Async', age: 16 };
    const result = await collection.insertOne(item);
    console.log('Result of insert:\n', result.insertedId);
    const docs = await collection.find({ _id: result.insertedId })
      .toArray();
    console.log('Result of find:\n', docs);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}
testWithCallbacks((err) => {
  if (err) {
    console.log(err);
  }
  testWithAsync();
});
