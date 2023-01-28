const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product");
const app = express();
mongoose.set("strictQuery", false);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 3000;
const CONNECTION =
  process.env.CONNECTION ||
  "mongodb+srv://test_user:iH8newpw!!@cluster0.y0wvexw.mongodb.net/products?retryWrites=true&w=majority";

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

const product = new Product({
  name: "Free Runs",
  price: 99,
});

app.get("/", (req, res) => {
  res.send("welcome to shoe products api");
});

app.get("/api/products", async (req, res) => {
  //   console.log(await mongoose.connection.db.listCollections().toArray())
  try {
    const result = await Product.find();
    res.send({ products: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});

app.get("/api/products/:id", async (req, res) => {
  console.log({ requestParams: req.params });
  try {
    const { id } = req.params;
    const result = await Product.findById(id);
    if (result === null) {
      res.send({ product: "product not found" });
    } else {
      res.send({ product: result });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await Product.replaceOne({ _id: productId }, req.body);
    console.log(result);
    res.json({ updatedCount: result.modifiedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await Product.deleteOne({ _id: productId });
    console.log(result);
    res.json({ deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
});

app.post("/api/products", async (req, res) => {
  console.log(req.body);
  const product = new Product(req.body);
  try {
    await product.save();
    res.status(201).json({ product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const start = async () => {
  try {
    await mongoose.connect(CONNECTION);
    app.listen(PORT, () => {
      console.log("App listening on " + PORT);
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
