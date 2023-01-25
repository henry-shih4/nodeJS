const express = require("express");
const app = express();
const PORT = 3000;

const json = [
  {
    name: "Court Starter",
    id: 1,
    description:
      "The Court Starter is a basic basketball shoe designed for recreational players and those new to the sport. A great choice for beginners looking for an affordable, reliable shoe that will help them play their best on the court.",
    price: "70",
    old_price: "140",
    main_image1: "/images/court-starter.png",
    main_image2: "/images/court-starter-white.png",
    main_image3: "/images/court-starter-yellow.png",
    main_image4: "/images/court-starter-green.png",
  },
  {
    name: "Velocity Surge",
    id: 2,
    description:
      "A high-performance athletic shoe designed for running and other activities, it has a lightweight and breathable upper with durable rubber sole for excellent traction and support.",
    price: "125",
    old_price: "250",
    main_image1: "/images/shoe-velocity-surge.png",
    main_image2: "/images/shoe-velocity-surge-purple.png",
    main_image3: "/images/shoe-velocity-surge-turqoise.png",
    main_image4: "/images/shoe-velocity-surge-white.png",
  },
  {
    name: "Elevate Pro",
    id: 3,
    description:
      "A high-performance basketball shoe with a durable rubber sole for excellent traction and support, as well as an advanced cushioning system for a comfortable and stable and secure fit. It features reinforced ankle support for added protection during quick cuts and jumps.",
    price: "125",
    old_price: "250",
    main_image1: "/images/shoe-elevate-pro.png",
    main_image2: "/images/shoe-elevate-pro-blue.png",
    main_image3: "/images/shoe-elevate-pro-red.png",
    main_image4: "/images/shoe-elevate-pro-white.png",
  },
];

app.get("/", (req, res) => {
  res.send("welcome to api");
});

app.get("/api/products", (req, res) => {
  res.send({ data: json });
});

app.post("/", (req, res) => {
  res.send("this is a post request");
});

app.listen(PORT, () => {
  console.log("App listening on " + PORT);
});
