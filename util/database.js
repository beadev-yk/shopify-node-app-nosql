const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
  MongoClient.connect(
    "mongodb+srv://ykkmec_dev:yLmwG86cOU7qPr3a@personalprojects.fj7izd2.mongodb.net/?retryWrites=true&w=majority&appName=PersonalProjects"
  )
    .then((client) => {
      _db = client.db();
      cb(client);
    })
    .catch((err) => {
      throw err;
    });
};

getDb = () => {
  if (!_db) {
    throw new Error("Database not connected");
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
