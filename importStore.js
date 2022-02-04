const { Store } = require('../models/store');
require('dotenv').config();
require('../startup/db')();

async function importStore() {
  let store = {
    general: {
      store_name: 'Test Market ',
      store_email: 'test2@gmail.com',
      isActive: true,
      store_phone: '6987442233',
      address: {
        formatted_address: 'Ida',
        geometry: {
          location: {
            lng: 37.951923245355395,
            lat: 23.72017782010404,
          },
        },
      },
    },
  };

  let newStore = new Store(store);

  await newStore.save();

  console.log('Store  ok');

  process.exit();
}

importStore();
