/* Name: Sanchita Kanade
   Class:CS648.02 Modern Full-Stack Web Development (Spring 2020)
   Assignment: 5
   File: init.mongo.js
*/

/* global db print */
/* eslint no-restricted-globals: "off" */

db.inventory.remove({});
db.deleted_products.remove({});

const productsDB = [
  {
    id: 1,
    Category: 'Shirts',
    Name: 'Blue Shirt',
    Price: 60.09,
    Image: 'https://clipground.com/images/dress-shirt-sleeve-clipart-11.jpg',
  },
  {
    id: 2,
    Category: 'Jeans',
    Name: 'Straight Fit Jeans',
    Price: 70.10,
    Image: 'https://anf.scene7.com/is/image/anf/KIC_131-7301-1283-278_prod1?$product-anf-v1$&wid=800&hei=1000',
  },
  {
    id: 3,
    Category: 'Jackets',
    Name: 'Casual Zipper Summer Jacket for Men',
    Price: 30.10,
    Image: 'https://ae01.alicdn.com/kf/HTB1htB.aKL2gK0jSZFmq6A7iXXaf/MANTLCONX-Newest-Solid-Autumn-Mens-Jackets-Male-Casual-Zipper-Summer-Jacket-Men-Spring-Casual-Outwear-Men.jpg',
  },
];

db.inventory.insertMany(productsDB);
const count = db.inventory.count();
print('Inserted', count, 'items');

// here _id indicates counter's name, it's just a string
db.counters.remove({ _id: 'productsCounter' });
db.counters.insert({ _id: 'productsCounter', current: count });
db.inventory.createIndex({ id: 1 }, { unique: true });
db.deleted_products.createIndex({ id: 1 }, { unique: true });
