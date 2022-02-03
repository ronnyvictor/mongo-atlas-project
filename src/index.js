const mongdb = require ('mongodb') // Importing code from node modules

const client = new mongdb.MongoClient('mongodb+srv://admin:HzHLRt34STVEQGeU@cluster0.cqhjj.mongodb.net?retryWrites=true&w=majority') // Using mongo client

const connectClient = async () => { 
    await client.connect()
    console.log('Client Connected')
}

const express = require('express')

const app = express()

app.use(express.json())


const getCollection = (collection) => {
    const db = client.db('mongo-project')
    const col = db.collection (collection)
    return col
}


const insert = async (obj,collection) => {
    const col = getCollection(collection)
    let wtf = await col.insertOne(obj)
    console.log("User Inserted!",wtf)
}

connectClient().then()
app.listen(3000, () => console.log('Listening on port 3000...'))

app.post('/users', (request, response) => {
    // console.log(request.body)
    const { name, street} = request.body  /// /* name = request.body.name  */
    const user = {name, street}
    insert(user,'users').then(() => response.send(user))
    
})

app.post('/products', (request, response) => {
    // console.log(request.body)
    const {title, description, price} = request.body 
    const products = {title, description, price}
    insert(products,'products').then(() => response.send(products))
    
})

app.get('/users', (request, response) => {
    const db = client.db('mongo-project')
    const userCollection = db.collection('users')
    userCollection.get()
    .then(snapshot => {
        response.send(snapshot)
    })
})