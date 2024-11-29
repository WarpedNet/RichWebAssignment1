import { getSession } from '../session';

export async function GET(req, res) {
    const { searchParams } = new URL(req.url);
    const productID = searchParams.get("productID");

    const { MongoClient } = require('mongodb');

    const client = new MongoClient(process.env.DB_ADDRESS);

    const dbName = 'krispykreme';

    await client.connect();
    const db = client.db(dbName);
    const cartCollection = db.collection('shopping_cart');

    let session = await getSession();
    if (session.email == null) {
        return Response.json({"data": "invalid"});
    }
    else {
        await cartCollection.insertOne({email: session.email, productID: productID});
        return Response.json({"data":"valid"});
    }
    
}