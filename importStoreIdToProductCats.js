const { Store } = require('../models/store');
const { ProductCat } = require('../models/productCat');
require('dotenv').config();
require('../startup/db')();

async function storeIdToProductCats() {
  const productCats = await ProductCat.find({});
  const store = await Store.findOne();

  for (let productCat of productCats) {
    productCat.store = store._id;
    await productCat.save();
  }

  console.log('Product Categories Ready');
  process.exit();
}

storeIdToProductCats();
