'use server'
import { revalidatePath } from "next/cache.js";
import { getSession } from "../session.js";
import { redirect } from "next/navigation.js";

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
    }, {"_id": false, "email": true, "passwordhash": true, "role":true});

    if (dbLookup["passwordhash"]) {
        const bcrypt = require('bcrypt');

        const match = await bcrypt.compare(password, dbLookup["passwordhash"]);
        console.log(dbLookup["passwordhash"]);
        if (match) {

            const session = await getSession();
            session.email = email;
            session.isLoggedIn = true;
            const role = dbLookup["role"];
            session.role = role;
            session.save();
            if (role == "manager") {
                revalidatePath("/manager/");
                redirect("/manager/");
            }
            else {
                revalidatePath("/customer/");
                redirect('/customer/');
            }
        }
        else {
            return Response.json({ "data":"valid", "password":"invalid" });
        }
    }
    else {
        return Response.json({ "data":"invalid" });
    }
    
    
    
}
