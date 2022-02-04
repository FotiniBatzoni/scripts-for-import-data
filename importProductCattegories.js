const faker = require('faker');
require('dotenv').config();
require('../startup/db')();
const { ProductCat } = require('../models/productCat');
const { Store } = require('../models/store');
// const fs = require('fs');
// const baseDirectory = require('path').resolve('./');
// //const generateFilename = require('../utilities/generateFilename');

async function populateCategories() {
  const store = await Store.findOne({});

  const storeId = store._id;

  const mainCategories = [
    {
      name: 'Φρούτα και Λαχανικά',
      parent: null,
      priority: 1,
      description: 'Φρούτα και Λαχανικά',
      products: [],
      store: storeId,
    },
    {
      name: 'Κρέας',
      parent: null,
      priority: 2,
      description: 'Κρέας',
      products: [],
      store: storeId,
    },
    {
      name: 'Γαλακτοκομικά',
      parent: null,
      priority: 3,
      description: 'Γαλακτοκομικά',
      products: [],
      store: storeId,
    },
    {
      name: 'Τυροκομικά και Αλλαντικά',
      parent: null,
      priority: 4,
      description: 'Τυροκομικά και Αλλαντικά',
      products: [],
      store: storeId,
    },
    {
      name: 'Κατεψυγμένα',
      parent: null,
      priority: 5,
      description: 'Κατεψυγμένα',
      products: [],
      store: storeId,
    },
    {
      name: 'Αναψυκτικά και Χυμοί',
      parent: null,
      priority: 6,
      description: 'Αναψυκτικά και Χυμοί',
      products: [],
      store: storeId,
    },
    {
      name: 'Ποτά',
      parent: null,
      priority: 7,
      description: 'Ποτά',
      products: [],
      store: storeId,
    },
    {
      name: 'Γλυκίσματα',
      parent: null,
      priority: 8,
      description: 'Γλυκίσματα',
      products: [],
      store: storeId,
    },
    {
      name: 'Είδη οικιακής χρήσης',
      parent: null,
      priority: 9,
      description: 'Είδη οικειακής χρήσης',
      products: [],
      store: storeId,
    },
    {
      name: 'Είδη καθαρισμού και χαρτικά',
      parent: null,
      priority: 10,
      description: 'Είδη καθαρισμού και χαρτικά',
      products: [],
      store: storeId,
    },
  ];

  let parentCats = await ProductCat.find({ parent: null });
  if (parentCats.length > 0) {
    console.log('Main cats exist');
  } else {
    for (let category of mainCategories) {
      let mainCat = new ProductCat(category);
      await mainCat.save();

      let childCategory = {
        name: faker.commerce.productName(),
        parent: mainCat._id,
        priority: 0,
        description: faker.commerce.productDescription(100),
        products: [],
        store: storeId,
      };

      let childCat = new ProductCat(childCategory);
      await childCat.save();
    }
    console.log('Cats Set');
  }

  console.log('Product Categories Ready');
  process.exit();
}

populateCategories();
