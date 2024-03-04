require("dotenv").config();

const port = process.env.PORT || 5000;

let MONGO_URI;

if (process.env.NODE_ENV === "test") {
  MONGO_URI = process.env.MONGO_URI_TEST;
} else if (process.env.NODE_ENV === "development") {
  MONGO_URI = process.env.MONGO_URI_TEST;
} else if (process.env.NODE_ENV === "build") {
  MONGO_URI = process.env.MONGO_URI;
} else {
  MONGO_URI = process.env.MONGO_URI;
}

module.exports = {
  MONGO_URI,
  port,
};