const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (cb) => {
  MongoClient.connect(
    "mongodb+srv://ykkmec_dev:devsenaykkmec@personalprojects.fj7izd2.mongodb.net/?retryWrites=true&w=majority&appName=PersonalProjects"
  )
    .then((client)=>{
      cb(client);
    })
    .catch();
};

module.exports = mongoConnect;
