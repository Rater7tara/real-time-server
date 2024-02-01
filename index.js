const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// MongoDB functions
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@nowshinkhan.c8ljhxf.mongodb.net/?retryWrites=true&w=majority`;

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
    // await client.connect();

    const allCollection = client.db('realTime').collection('tasks');
    
    app.get('/tasks/:id', async(req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await allCollection.findOne(query);
        res.send(result);
    })

  
      app.post('/tasks', async(req, res) =>{
        const newTasks = req.body;
        console.log(newTasks);
        const result = await allCollection.insertOne(newTasks)
        res.send(result);
      })
  
      app.delete('/tasks/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) }
        const result = await allCollection.deleteOne(query);
        res.send(result);
    })
  
    app.put('/tasks/:id', async(req, res) =>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)}
      const options = { upsert: true };
      const updateTask =req.body;
      const Task = {
        $set:{
          id: updateTask.id,
          title: updateTask.title,
          description: updateTask.description,
          completed: updateTask.completed,
          time: updateTask.time,
          picture: updateTask.picture
        }
      }
  
      const result = await allCollection.updateOne(filter, Task, options)
      res.send(result);
    })
  

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('real time server is running')
})

app.listen(port, () => {
    console.log(`real time Server is running on port: ${port}`)
})