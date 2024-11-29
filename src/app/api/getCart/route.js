import { getSession } from '../session';

export async function GET(req, res) {
    // =================================================
    const { MongoClient } = require('mongodb');
    const client = new MongoClient(process.env.DB_ADDRESS);
    const dbName = 'krispykreme'; // database name
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('view_cart'); // collection name

    let session = getSession();

    const findResult = await collection.find(
        {email: session.email},
        {
            _id:false, email:false, productID: true
        }
    ).toArray();
    console.log('Found documents =>', findResult);
    //==========================================================
    // at the end of the process we need to send something back.
    return Response.json(findResult)
    }