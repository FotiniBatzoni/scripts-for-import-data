const { Product } = require('../models/product');
const { ProductCat } = require('../models/productCat');
const { Store } = require('../models/store');
require('dotenv').config();
require('../startup/db')();
const faker = require('faker');

async function populateProducts() {
  const productCats = await ProductCat.find({ parent: { $ne: null } });
  const prodCatsIds = productCats.map((cat) => cat._id.toString());

  const store = await Store.findOne({});
  const storeId = store._id;

  for (let i = 0; i <= 100; i++) {
    let index = Math.floor(Math.random() * prodCatsIds.length);
    let productPrice = faker.commerce.price();

    let product = {
      name: faker.commerce.productName(),
      sku: Math.floor(100000000 + Math.random() * 900000000), ///
      description: faker.commerce.productDescription(),
      price: productPrice,
      discountPrice: (productPrice * 0.9).toFixed(2),
      store: storeId,
      product_cat: prodCatsIds[index],
      gallery: [],
      isActive: true,
      priority: i,
      quantity: i + 10,
      quantityAlarm: 5,
      unitOfMeasurement: 'Τεμ',
    };

    let newProduct = new Product(product);
    await newProduct.save();

    productCats[index].products.push(newProduct._id);
    await productCats[index].save();
  }

  console.log('Products Ok');

  process.exit();
}

populateProducts();
