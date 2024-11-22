'use server'
import { getSession } from "../session.js";
import { redirect } from 'next/navigation';

export async function GET(req, res) {

    console.log("In Register api")

    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    const emailconfirm = searchParams.get('emailconfirm');
    const password = searchParams.get('password');
    const passwordConfirm = searchParams.get('passwordconfirm');
    const phonenum = searchParams.get('phonenum');

    if (email != emailconfirm || password != passwordConfirm) {
        return Response.json({ "data":"Invalid"})
    }

    const url = process.env.DB_ADDRESS
    const {MongoClient} = require("mongodb");
    const client = new MongoClient(url);

    await client.connect();
    console.log("Connected to Database");
    const db = client.db("krispykreme");
    const collection = db.collection("users");

    // Hashing password & inserting data into database
    const bcrypt = require('bcrypt');
    bcrypt.hash(password, 10, function(err, hash) {
        const insert = collection.insertOne({
            "email": email,
            "passwordhash": hash,
            "phonenum": phonenum,
            "role": "customer"
        })
        if (insert) {
            let session = getSession();
            session.email = email;
            session.isLoggedIn = true;
            session.role = "customer";
            session.save();
            redirect("/customer");
            return Response.json({ "data":"valid", "registration":"valid" })
        }
        else {
            return Response.json({ "data":"valid", "registration":"invalid"})
        }

    })


    return Response.json({ "data":"Invalid" })
}
