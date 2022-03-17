const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
// const { User } = require("./models/user");
const cors = require("cors");
// const { auth } = require("./middleware/auth");
const { Product } = require("./models/products");
const passport = require("passport");
const bodyParser = require("body-parser");
const mercadopago = require("mercadopago");

if (process.env.NODE_ENV !== "production") {
  // Load environment variables from .env file in non prod environments
  require("dotenv").config();
}

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true }, (err) => {
  if (err) return err;
  console.log("conectado a MongoDB");
});

require("./middleware/JwtStrategy");
require("./middleware/LocalStrategy");
require("./middleware/authenticate");
const userRouter = require("./routes/userRoutes");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  credentials: true,
};

app.use(cors(corsOptions));

app.use(passport.initialize());

app.use("/users", userRouter);

app.post("/api/product/article", (req, res) => {
  const product = new Product(req.body);
  product.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      article: doc,
    });
  });
});

app.get("/api/product/articles_by_id", (req, res) => {
  let type = req.query.type;
  let items = req.query._id;
  if (type === "array") {
    let ids = req.query.id.split(",");
    items = [];
    items = ids.map((item) => {
      return mongoose.Types.ObjectId(item);
    });
  }
  Product.find({ _id: { $in: items } }).exec((err, docs) => {
    return res.status(200).send(docs);
  });
});

app.get("/api/product/articles_by_name", (req, res) => {
  let type = req.query.type;
  let items = req.query.name;
  if (type === "array") {
    let ids = req.query.name.split(",");
    items = [];
    items = ids.map((item) => {
      return mongoose.Types.name(item);
    });
  }
  Product.find({ name: { $in: items } }).exec((err, docs) => {
    return res.status(200).send(docs);
  });
});

app.get("/api/product/articles_by_type", (req, res) => {
  let type = req.query.type;
  let items = req.query.type;
  if (type === "array") {
    let ids = req.query.type.split(",");
    items = [];
    items = ids.map((item) => {
      return mongoose.Types.typeProduct(item);
    });
  }
  Product.find({ typeProduct: { $in: items } }).exec((err, docs) => {
    return res.status(200).send(docs);
  });
});

app.get("/api/product/articles_by_sex", (req, res) => {
  let type = req.query.type;
  let items = req.query.sex;
  if (type === "array") {
    let ids = req.query.sex.split(",");
    items = [];
    items = ids.map((item) => {
      return mongoose.Types.Sex(item);
    });
  }
  Product.find({ Sex: { $in: items } }).exec((err, docs) => {
    return res.status(200).send(docs);
  });
});

app.get("/api/product/articles", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  Product.find()
    .sort([[type, order]])
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.send(articles);
    });
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`servidor en el puerto ${port}`);
});
