import { getSession } from '../session';
import { ObjectId } from 'mongodb';

export async function GET(req, res) {
    const { searchParams } = new URL(req.url);
    const productName = searchParams.get("productName");
    const productPrice = searchParams.get("productPrice")

    const { MongoClient, ObjectId } = require('mongodb');

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
        await cartCollection.deleteOne({email: session.email, productName: productName, productPrice: productPrice});
        return Response.json({"data":"valid"});
    }
    
}