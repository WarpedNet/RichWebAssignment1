import { getSession } from '../session';
import { ObjectId } from 'mongodb';

export async function GET(req, res) {
    const { searchParams } = new URL(req.url);
    const productID = searchParams.get("productID");

    const { MongoClient } = require('mongodb');

    const client = new MongoClient(process.env.DB_ADDRESS);

    const dbName = 'krispykreme';

    await client.connect();
    const db = client.db(dbName);
    const productCollection = db.collection('products');
    
    const result = await productCollection.find( {_id: new ObjectId(productID)},
    {
        productName: true,
        productPrice: true
    });
    return Response.json(result)
    
}