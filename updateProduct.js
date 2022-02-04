const { Product } = require('../models/product');
const { ProductCat } = require('../models/productCat');
require('dotenv').config();
require('../startup/db')();
const faker = require('faker');

async function updateProducts() {
  const productCat = await ProductCat.find({ parent: { $ne: null } });
  const prodCatsIds = productCat.map((cat) => cat._id.toString());

  let products = await Product.find({});

  for (let i = 0; i <= products.length; i++) {
    (products[i].price = faker.commerce.price()),
      (products[i].discountPrice = products[i].price * 0.9),
      (products[i].product_cat = prodCatsIds[Math.floor(Math.random() * prodCatsIds.length)]);

    await products[i].save();
  }

  console.log('Products Ok');

  process.exit();
}
updateProducts();
