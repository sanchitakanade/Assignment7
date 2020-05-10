/* Name: Sanchita Kanade
   Class:CS648.02 Modern Full-Stack Web Development (Spring 2020)
   Assignment: 7
   File: product.js
*/

/* eslint no-restricted-globals: "off" */
const { getDb, getNextSequence } = require('./db.js');

async function get(_, { id }) {
  const db = getDb();
  const product = await db.collection('inventory').findOne({ id });
  return product;
}

// API to retrieve product
async function list(_, { Category, priceMax }) {
  const db = getDb();
  const filter = {};
  if (Category) filter.Category = Category;
  if (priceMax !== undefined) {
    filter.Price = {};
    filter.Price.$lte = priceMax;
  }
  const products = await db.collection('inventory').find(filter).toArray();
  return products;
}

// API to add product
async function add(_, { product }) {
  const db = getDb();
  const newProduct = Object.assign({}, product);
  newProduct.id = await getNextSequence('productsCounter');
  const result = await db.collection('inventory').insertOne(newProduct);
  const savedProduct = await db.collection('inventory')
    .findOne({ _id: result.insertedId });
  return savedProduct;
}

async function update(_, { id, changes }) {
  const db = getDb();
  console.log(id);
  await db.collection('inventory').updateOne({ id }, { $set: changes });
  const savedIssue = await db.collection('inventory').findOne({ id });
  return savedIssue;
}

async function remove(_, { id }) {
  const db = getDb();
  const product = await db.collection('inventory').findOne({ id });
  if (!product) return false;
  // let result = await db.collection('deleted_products').insertOne(product);
  // if (result.insertedId) {
  const result = await db.collection('inventory').removeOne({ id });
  return result.deletedCount === 1;
}

// I used following function to display total number of records returned by query
async function countRows(_, { Category, priceMax }) {
  const db = getDb();
  const filter = {};
  if (Category) filter.Category = Category;
  if (priceMax !== undefined) {
    filter.Price = {};
    filter.Price.$lte = priceMax;
  }
  const results = await db.collection('inventory').aggregate([
    { $match: filter },
    {
      $group: { _id: null, count: { $sum: 1 } },
    },
  ]).toArray();
  return results.map(a => a.count);
}

async function counts(_, { Category, priceMax }) {
  const db = getDb();
  const filter = {};
  if (Category) filter.Category = Category;
  if (priceMax !== undefined) {
    filter.Price = {};
    filter.Price.$lte = priceMax;
  }
  const results = await db.collection('inventory').aggregate([
    { $match: filter },
    {
      $group: {
        _id: { Price: '$Price', Category: '$Category' },
        count: { $sum: 1 },
      },
    },
  ]).toArray();

  const stats = {};
  results.forEach((result) => {
    // eslint-disable-next-line no-underscore-dangle
    const { Price, Category: categoryKey } = result._id;
    if (!stats[Price]) stats[Price] = { Price };
    stats[Price][categoryKey] = result.count;
  });
  return Object.values(stats);
}

module.exports = {
  add, list, get, update, delete: remove, counts, countRows,
};
