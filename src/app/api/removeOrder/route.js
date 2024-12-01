import { getSession } from '../session';
import { ObjectId } from 'mongodb';

export async function GET(req, res) {
    const { searchParams } = new URL(req.url);
    const orderID = searchParams.get("orderID");

    const { MongoClient, ObjectId } = require('mongodb');

    const client = new MongoClient(process.env.DB_ADDRESS);

    const dbName = 'krispykreme';

    await client.connect();
    const db = client.db(dbName);
    const orderCollection = db.collection('orders');

    let session = await getSession();
    if (session.email == null || session.role != "manager") {
        return Response.json({"data": "invalid"});
    }
    else {
        await orderCollection.deleteOne({_id: new ObjectId(orderID)});
        return Response.json({"data":"valid"});
    }
    
}