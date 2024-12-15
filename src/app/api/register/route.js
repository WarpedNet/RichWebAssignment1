'use server'
import { getSession } from "../session.js";
import { redirect } from 'next/navigation';
import * as bcrypt from "bcrypt"

export async function GET(req, res) {

    console.log("In Register api")

    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    const emailconfirm = searchParams.get('emailconfirm');
    const password = searchParams.get('password');
    const passwordConfirm = searchParams.get('passwordconfirm');
    const phonenum = searchParams.get('phonenum');

    if (email != emailconfirm || password != passwordConfirm) {
        return Response.json({ data:"invalid", registration: "invalid"})
    }

    const url = process.env.DB_ADDRESS
    const {MongoClient} = require("mongodb");
    const client = new MongoClient(url);

    await client.connect();
    console.log("Connected to Database");
    const db = client.db("krispykreme");
    const collection = db.collection("users");
    let dupeEmail = collection.findOne({
        "email": email
    }, {email: true});
    console.log(dupeEmail.email == undefined)
    if (dupeEmail.email != undefined) {
        return Response.json({data: "invalid", registration:"invalid"});
    }
    // Hashing password & inserting data into database
    let hash = await bcrypt.hash(password, 10)
    const insert = collection.insertOne({
        "email": email,
        "passwordhash": hash,
        "phonenum": phonenum,
        "role": "customer"
    })
    if (insert) {
        let session = await getSession();
        session.email = email;
        session.isLoggedIn = true;
        session.role = "customer";
        await session.save()

        return Response.json({ data:"valid", registration:"valid" })
    }
    else {
        return Response.json({ data:"valid", registration:"invalid"})
    }
}
