const { User } = require('../models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();
require('../startup/db')();
const faker = require('faker');

async function importClients() {
  const clientsToInsert = [];

  for (let i = 0; i <= 50; i++) {
    clientsToInsert.push({
      firstname: faker.name.findName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: await bcrypt.hash('progressnet', await bcrypt.genSalt(10)),
      isActive: true,
      hash: null,
      phone: faker.phone.phoneNumber(),
      customer_addresses: [],
      role: {
        priority: 2,
        title: 'Client',
      },
      service_points: [],
      fcmToken: '',
    });
    //if (i % 100 === 0) console.log(i);
  }
  for (let i = 0; i < clientsToInsert.length; i++) {
    let user = await User.find();
    user = new User(clientsToInsert[i]);
    await user.save();
  }
  //await User.insertMany(clientsToInsert);
  console.log('Clients are ok');
}

async function seedClients() {
  const clients = await User.find({ 'role.priority': 2 });

  if (clients.length === 0) {
    await importClients();
    console.log('Clients Ok');
  } else {
    console.log('Clients exist');
  }

  process.exit();
}

seedClients();
