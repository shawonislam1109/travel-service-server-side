const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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


app.get('/', (req, res) => {
    res.send('this is service review connected')
})

const uri = `mongodb+srv://${user}:${password}@cluster0.5rnuhbi.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    const serviceCollection = client.db("TouristAllData").collection('serviceData');
    const reviewCollection = client.db("TouristAllData").collection('reviewData')
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
        app.get('/review', async (req, res) => {
            let query = {}

            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = reviewCollection.find(query)
            const review = await cursor.toArray()
            res.send(review)
        })

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const service = await serviceCollection.findOne(query);
            res.send(service)
        })
        app.get('/review/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const review = await reviewCollection.findOne(query);
            res.send(review);
        })
        app.post('/services', async (req, res) => {
            const addService = req.body;
            const result = await serviceCollection.insertOne(addService);
            res.send(result);
        })
        app.post('/review', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })
        app.delete('/review/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const orders = await reviewCollection.deleteOne(query);
            res.send(orders);
        })
        app.put('/review/:id', async (req, res) => {
            const review = req.body;
            console.log(review)
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    author: review.author,
                    image: review.image,
                    spaces: review.spaces,
                    address: review.address
                    // image, author, spaces, address
                }
            };
            const result = await reviewCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })
    }

    finally {

    }
}

run().catch(err => console.log(err))



app.listen(port, () => {
    console.log(`this is services review connected port ${port}`)
})
