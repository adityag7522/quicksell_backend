require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const seedProducts = [
  {
    name: "Magic Board",
    price: "₹199",
    description: "Reusable writing pad",
    image: "https://res.cloudinary.com/demo/image/upload/v1719830001/magic_board.jpg",
    category: "toys-below-200"
  },
  {
    name: "Dancing Cactus",
    price: "₹499",
    description: "Funny talking toy",
    image: "https://res.cloudinary.com/demo/image/upload/v1719830001/dancing_cactus.jpg",
    category: "toys-200-to-500"
  },
  {
    name: "Puzzle Set",
    price: "₹349",
    description: "Early learning toy for kids",
    image: "https://res.cloudinary.com/demo/image/upload/v1719830001/puzzle_set.jpg",
    category: "educational-toys"
  }
];

mongoose.connect(process.env.MONGO_URI).then(() => {
  return Product.insertMany(seedProducts);
}).then(() => {
  console.log("Seeded successfully");
  mongoose.disconnect();
}).catch(err => console.error(err));
