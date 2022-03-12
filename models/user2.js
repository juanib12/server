const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});

const User2 = new Schema({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  avatar: {
    type: Array,
    default: [],
  },
  authStrategy: {
    type: String,
    default: "local",
  },
  points: {
    type: Number,
    default: 50,
  },
  refreshToken: {
    type: [Session],
  },
});

//Remove refreshToken from the response
User2.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken;
    return ret;
  },
});

User2.plugin(passportLocalMongoose);

module.exports = mongoose.model("User2", User2);
