const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected!");
});

//generate random array index position from any insterted array
const sample = (array) => array[Math.floor(Math.random() * array.length)];

// function sample (array) {
//     return array[Math.floor(Math.random() * array.length)];
// }

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "61d8a0dc326dedb93161dfb3",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse auctor eu lacus non iaculis. Mauris elit dolor, luctus a diam sed, fermentum rutrum mauris. Sed sit amet leo ut ante pretium euismod id sit amet lorem. Phasellus ac magna id nisi imperdiet malesuada. Praesent erat ligula, dapibus sed mauris nec, tristique eleifend eros. Integer consequat dolor in dignissim pharetra. Vestibulum lacus massa, aliquet id est et, pretium tempus lectus.",
      price: price,
      images: [
        {
          url: "https://res.cloudinary.com/dkpn2dtyr/image/upload/v1642124892/YelpCamp/fkt0qdfapzj5uwqhb3v4.jpg",
          filename: "YelpCamp/fkt0qdfapzj5uwqhb3v4",
        },
        {
          url: "https://res.cloudinary.com/dkpn2dtyr/image/upload/v1642124892/YelpCamp/pqdr4atreiyujhozpoxo.jpg",
          filename: "YelpCamp/pqdr4atreiyujhozpoxo",
        },
      ],
    });

    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
