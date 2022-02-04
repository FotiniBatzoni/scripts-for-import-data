const { User } = require('../models/user');
const { CustomerAddress } = require('../models/customerAddress');
require('dotenv').config();
require('../startup/db')();

const addressesToImport = async () => {
  let users = await User.find({ 'role.priority': 2 });

  let customerAddresses = []; //50 customer addresses

  for (let i = 0; i < users.length; i++) {
    if (users[i].customer_addresses.length === 0) {
      customerAddresses.push({
        title: 'Home',
        user: users[i]._id,
        address: {
          formatted_address: 'Ηρακλέους, Ελλάδα',
          geometry: {
            location: {
              lat: 37.95335567084302,
              lng: 23.70791684333407,
            },
          },
          floor: i + 1,
          doorbell: users[i].lastname,
        },
      });
    }
  }

  for (let i = 0; i < customerAddresses.length; i++) {
    let customerAddressToImport = new CustomerAddress(customerAddresses[i]);
    await customerAddressToImport.save();

    console.log('customer addresses are ok');

    await User.findByIdAndUpdate(
      { _id: customerAddressToImport.user },
      { customer_addresses: customerAddressToImport._id }
    );
  }
  process.exit();
};

addressesToImport();
