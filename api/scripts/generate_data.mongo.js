/* global db print */
/* eslint no-restricted-globals: "off" */
/* eslint linebreak-style: ["error", "windows"] */

const products = ['Jeans', 'Formal shirt', 'T-shirt', 'Legging', 'Trouser'];
const category = ['Shirts', 'Jeans', 'Jackets', 'Sweaters', 'Accessories'];
const initialCount = db.inventory.count();
for (let i = 0; i < 100; i += 1) {
  const Name = products[Math.floor(Math.random() * 5)];
  const Category = category[Math.floor(Math.random() * 4)];
  const Price = Math.ceil(Math.random() * 20);
  const Image = 'https://www.google.com/';
  const id = initialCount + i + 1;
  const product = {
    id, Name, Category, Price, Image,
  };
  db.inventory.insertOne(product);
}
const count = db.inventory.count();
db.counters.update({ _id: 'productsCounter' }, { $set: { current: count } });
print('New product count:', count);
