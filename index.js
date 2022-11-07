const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors = require('cors')
require('dotenv').config
const app = express()
const port = process.env.PORT || 5000;

//  middleware 

app.use(cors())
app.use(express.json())

// username : travelUser
//  password : o483NanrYboHxTc8

const user = process.env.travel_user;
const password = process.env.travel_password;

console.log(user, password)

app.get('/', (req, res) => {
    res.send('this is service review connected')
})

const uri = `mongodb+srv://travelUser:o483NanrYboHxTc8@cluster0.5rnuhbi.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

    }
    finally {

    }
}

run().catch(err => console.log(err))



app.listen(port, () => {
    console.log(`this is services review connected port ${port}`)
})
