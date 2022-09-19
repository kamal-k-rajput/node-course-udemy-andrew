// CRUD Operaions (create read update delete)     //
const { MongoClient, ObjectId } = require("mongodb");
const connectionUrl = "mongodb://127.0.0.1/27017";
const database = "task-manager";
const id = new ObjectId();
console.log(id);
MongoClient.connect(
  connectionUrl,
  {
    useNewUrlParser: true,
  },
  async (err, client) => {
    if (err) {
      return console.log("Unable to connect to database");
    } else {
      console.log("connected successfully");
      const db = client.db(database);
      db.collection("users")
        .find(
          { _id: new ObjectId("6326ca87203c8ccdba8d92da") }
          // (err, response) => {
          //   if (err) {
          //     return console.log(err);
          //   } else {
          //     console.log(response);
          //   }

          // }
        )
        .toArray((err, res) => {
          console.log(res);
        });
      db.collection("users")
        .find(
          { _id: new ObjectId("6326ca87203c8ccdba8d92da") }
          // (err, response) => {
          //   if (err) {
          //     return console.log(err);
          //   } else {
          //     console.log(response);
          //   }
          // }
        )
        .toArray((err, res) => {
          console.log(res);
        });
      db.collection("users")
        .find({ _id: new ObjectId("6326ca87203c8ccdba8d92da") })
        .count((err, res) => {
          console.log(res);
        });
    }
  }
);
