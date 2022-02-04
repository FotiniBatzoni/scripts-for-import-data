require('dotenv').config();
require('../startup/db')();
const { Role } = require('../models/role');

const roles = [
  {
    priority: 1,
    title: 'Admin',
  },
  {
    priority: 2,
    title: 'Customer',
  },
];

async function roleSeed() {
  const roleExists = await Role.find();
  if (roleExists.length > 0) {
    console.log('Roles already exists');
    process.exit();
  }

  await Role.insertMany(roles);
  console.log('Roles are inserted successfully');
  process.exit();
}

roleSeed();
