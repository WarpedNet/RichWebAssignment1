import { getSession } from '../session';

export async function POST(req, res) {
    if (req.method === 'POST') {
        const order = await req.json();
        const { MongoClient } = require('mongodb');
    
        const client = new MongoClient(process.env.DB_ADDRESS);
    
        const dbName = 'krispykreme';
    
        await client.connect();
        const db = client.db(dbName);
        const orderCollection = db.collection('orders');
    
        let session = await getSession();

        if (session.email == null) {
            return Response.json({"data": "invalid"})
        }
        else {
            await orderCollection.insertOne({email: session.email, order: order})
            return Response.json({"data": "valid"});
        }
    }
}