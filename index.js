const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;

//  middleware 

app.use(cors())
app.use(express.json())


const user = process.env.travel_user;
const password = process.env.travel_password;

console.log(user, password)

app.get('/', (req, res) => {
    res.send('this is service review connected')
})

const uri = `mongodb+srv://${user}:${password}@cluster0.5rnuhbi.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    const serviceCollection = client.db("TouristAllData").collection('serviceData')
    try {
        app.get('/services', async (req, res) => {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const query = {};
            const cursor = serviceCollection.find(query);
            const service = await cursor.skip(page * size).limit(size).toArray();
            const count = await serviceCollection.estimatedDocumentCount()
            res.send({ count, service })
        })
    }

    finally {

    }
}

run().catch(err => console.log(err))



app.listen(port, () => {
    console.log(`this is services review connected port ${port}`)
})
