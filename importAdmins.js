const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const { Role } = require('../models/role');

const admins = [
  {
    firstname: 'promarket',
    lastname: 'Admin',
    phone: '2100000000',
    role: { title: 'Admin', priority: 1 },
    email: 'admin@progressnet.gr',
    password: 'progressnet',
    isActive: true,
  },
  {
    firstname: 'ProNet',
    lastname: 'Admin',
    phone: ' 2111828724',
    role: { title: 'Admin', priority: 1 },
    email: 'info@progressnet.dev',
    password: 'progressnet',
    isActive: true,
  },
];

async function seedAdmin() {
  require('dotenv').config();
  require('../startup/db')();
  let roles = await Role.find({});
  if (roles.length === 0) {
    console.log('Please set roles first');
    return false;
  }

  let users = await User.find({ 'role.priority': 1 });
  if (users.length > 0) {
    console.log('Admins already exist');
    return false;
  }

  try {
    for (let admin of admins) {
      const hashed = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(admin.password, hashed);
      const user = new User(admin);
      await user.save();
    }
    return true;
  } catch (error) {
    console.log(error.message);
    return true;
  }
}

seedAdmin().then((response) => {
  if (response) {
    console.log('AdminSeed was successful');
  } else {
    console.log('Admin seed failed');
  }
  process.exit();
});
