const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
// const ObjectId = require('mongodb').ObjectId;
const ObjectId = require("mongodb").ObjectId;
const port = process.env.PORT || 5000;

const cors = require('cors')

// dbuser3
// pYvQntBG3Bry2lGk

app.use(cors())
app.use(express.json());


const uri = "mongodb+srv://dbuser3:pYvQntBG3Bry2lGk@cluster0.tjo1e.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// console.log('connected')

async function run(){
    try{

        await client.connect();
        const userCollection = client.db("player").collection("users");

        // get user

        app.get('/users', async(req,res)=>{
            const query = {};
            const cursor = userCollection.find(query);
           const users = await cursor.toArray();
           res.send(users);
        })


        // get user

    //    post
    app.post('/user', async(req,res)=>{
        const newUser = req.body;
        console.log(newUser);
        const result = await userCollection.insertOne(newUser);
        res.send({result});
    })
    //    post

    // spacific user
    app.get('/users/:id', async(req,res)=>{
        const id = req.params.id;
        console.log(id);
        const query = {_id: ObjectId(id)}
        const result = await userCollection.findOne(query);
        res.send(result)
    })
    // spacific user
    // delete user
    app.delete('/users/:id', async(req,res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await userCollection.deleteOne(query);
        res.send(result);
    })
    // delete user
    

    }
    finally{

    }

}
run().catch(console.dir);


app.get('/', (req,res)=>{
    res.send('hlw world');
});

app.listen(port,(res,send)=>{
    console.log('my backend server is running port number' ,port);
})