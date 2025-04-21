const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;
const Url =
  "mongodb+srv://root:root@cluster0.7oucb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(Url)
    .then((client) => {
      console.log("connection successfull.");
      _db = client.db("airbnb");
      callback();
    })
    .catch((err) => {
      console.log(
        "DataBase Connection Failed Plase Check Your internet Connection:",
        err
      );
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error("Not Connected to database");
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
