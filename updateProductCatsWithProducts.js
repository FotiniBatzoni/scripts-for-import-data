const { Product } = require('../models/product');
const { ProductCat } = require('../models/productCat');
require('dotenv').config();
require('../startup/db')();
const faker = require('faker');

async function updateProductCats() {
  const productCat = await ProductCat.find({ parent: { $ne: null } });
  const prodCatsIds = productCat.map((cat) => cat._id.toString());

  let products = await Product.find({});

  for (let i = 0; i <= products.length; i++) {
    let productCatId = products[i].product_cat;
    let productCat = await ProductCat.findById(productCatId);
    productCat.products.push(product[i]);

    await productCat.save();
  }

  console.log('Product Cats Ok');

  process.exit();
}

updateProductCats();
