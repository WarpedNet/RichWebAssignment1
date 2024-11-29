export async function GET(req, res) {
    console.log("in the api page")
    // =================================================
    const { MongoClient } = require('mongodb');
    const client = new MongoClient(process.env.DB_ADDRESS);
    const dbName = 'krispykreme'; // database name
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('orders'); // collection name
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
    return Response.json(findResult)
}