const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(4000, () => {
  console.log("Server started");
});
mongoose
  .connect("mongodb://localhost:27017/devicemodals")
  .then((e) => {
    console.log("Connected Successfully to the database");
  })
  .catch((e) => {
    console.log(e);
  });

const deviceSchema = new mongoose.Schema({
  deviceType: {
    type: String,
  },
  preciousMetals: {
    type: Array,
  },
});
const deviceModal = new mongoose.model("deviceModal", deviceSchema);
const deviceData = {
  deviceType: "Smartphone",
  preciousMetals: ["gold", "silver", "lithium", "copper"],
};
// deviceModal.create(deviceData);
// app.get("/", (req, res) => {
//   res.send("Server Started Successfully");
// });

app.get("/devicemodals", (req, res) => {
  res.json([
    {
      deviceType: "Refrigerators ",
      preciousMetals: ["aluminum", "copper", "iron"],
    },
    {
      deviceType: "Washingmachine",
      preciousMetals: ["zinc", "gold", "copper", "aluminum"],
    },
    {
      deviceType: "LCD",
      preciousMetals: ["zinc", "gold", "copper", "aluminum"],
    },
    {
      deviceType: "Computers",
      preciousMetals: ["zinc", "gold", "copper", "aluminum"],
    },
    {
      deviceType: "Air-Conditioner",
      preciousMetals: [
        "palladium",
        "platinum",
        "rhodium",
        "gold",
        "tungsten",
        " alloys",
      ],
    },
  ]);
});
app.get("/ewastecenters", (req, res) => {
  res.json([
    {
      pincode: 751030,
      city: "jagamara",
      ewastecentername: "M/s. Green Waves Environmental Solution",
    },
    {
      pincode: 756019,
      city: "Armala",
      ewastecentername: "Veera Waste Management Systems",
    },
    {
      pincode: 756001,
      city: "Azimabad",
      ewastecentername: "Binbag Recycling Services Pvt. Ltd",
    },
    {
      pincode: 751007,
      city: "Saheed Nagar",
      ewastecentername: "World Scrap Recycling Solutions (P) Ltd",
    },
    {
      pincode: 751022,
      city: "Acharaya Vihar",
      ewastecentername: "Greenscape Eco Management Private ltd",
    },
  ]);
});
app.post("/searchpincode", (req, res) => {
  const datareceived = {
    pincode: req.body.pincode,
  };
  console.log(datareceived);
  const datajson = [
    {
      pincode: 751030,
      city: "jagamara",
      ewastecentername: "M/s. Green Waves Environmental Solution",
    },
    {
      pincode: 756019,
      city: "Armala",
      ewastecentername: "Veera Waste Management Systems",
    },
    {
      pincode: 756001,
      city: "Azimabad",
      ewastecentername: "Binbag Recycling Services Pvt. Ltd",
    },
    {
      pincode: 751007,
      city: "Saheed Nagar",
      ewastecentername: "World Scrap Recycling Solutions (P) Ltd",
    },
    {
      pincode: 751022,
      city: "Acharaya Vihar",
      ewastecentername: "Greenscape Eco Management Private ltd",
    },
  ];
  for (let i = 0; i < datajson.length; i++) {
    if (datareceived.pincode == datajson[i].pincode) {
      res.json(datajson[i]);
      console.log();
      res.sendFile(path.join(__dirname, "/index.html"));
    } else {
      res.send(
        "Sorry currently we dont have any E-waste center available at this Pincode"
      );
    }
  }
  //   console.log(datareceived.pincode);
  //   console.log(datajson[2]);
});
