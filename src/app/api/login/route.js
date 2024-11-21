export async function GET(req, res) {

    console.log("In Login api")

    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    const password = searchParams.get('password');
    console.log(email);
    console.log(password);

    const url = process.env.DB_ADDRESS
    const {MongoClient} = require("mongodb");
    const client = new MongoClient(url);

    await client.connect();
    console.log("Connected to Database");
    const db = client.db("krispykreme");
    const collection = db.collection("users");
    
    const dbLookup = await collection.findOne({
        "email":email
    }, {"_id": false, "email": true, "passwordhash": true});

    if (dbLookup["passwordhash"]) {
        const bcrypt = require('bcrypt');

        const match = await bcrypt.compare(password, dbLookup["passwordhash"]);
        console.log(dbLookup["passwordhash"]);
        if (match) {
            console.log("Logged in!")
            return Response.json({ "data":"valid", "password":"valid"});
        }
        else {
            return Response.json({ "data":"valid", "password":"invalid" });
        }
    }
    else {
        return Response.json({ "data":"invalid" });
    }
    
    
}
