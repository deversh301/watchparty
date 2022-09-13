const { MongoClient , ServerApiVersion } = require("mongodb");
//const connectionString = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4';
const connectionString = 'mongodb+srv://ershyadav303:Ramdhiraj%40301%23@cluster0.erbcoun.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});
const database = client.db("yt_watch_party")

module.exports = { client , database  }

