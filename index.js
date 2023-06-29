const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const cors = require('cors')


app.use(cors())
app.use(express.json())

app.listen(PORT => {
console.log(`listening on ${port}`)
})


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://jnx:ZOyB9TS4Yl6HT4LX@cluster0.ru9p7po.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
