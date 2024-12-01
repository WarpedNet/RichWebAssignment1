import { getSession } from '../session';

export async function POST(req, res) {
    if (req.method === 'POST') {

        const { MongoClient } = require('mongodb');
    
        const client = new MongoClient(process.env.DB_ADDRESS);
    
        const dbName = 'krispykreme';
    
        await client.connect();
        const db = client.db(dbName);
        const orderCollection = db.collection('orders');

        const orders = await orderCollection.find({}).toArray();
        return Response.json(orders)
    }
}