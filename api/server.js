/* Name: Sanchita Kanade
   Class:CS648.02 Modern Full-Stack Web Development (Spring 2020)
   Assignment: 7
   File: server.js
*/

require('dotenv').config();
const express = require('express');
const { connectToDb } = require('./db.js');
const { installHandler } = require('./api_handler.js');

const port = process.env.API_SERVER_PORT || 3000;
const app = express();

installHandler(app);
(async function start() {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log(`API server started on port ${port}`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
}());
