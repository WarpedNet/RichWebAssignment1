'use server'
import { getSession } from "../session.js";
import { redirect } from 'next/navigation';
import * as bcrypt from "bcrypt"
import * as validator from 'email-validator';

export async function GET(req, res) {
    var jsesc = require("jsesc");
    console.log("In Register api")

    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email');
    const emailconfirm = searchParams.get('emailconfirm');
    const emailValid = validator.validate(email) && validator.validate(emailconfirm);
    const password = jsesc(searchParams.get('password'));
    const passwordConfirm = jsesc(searchParams.get('passwordconfirm'));
    const phonenum = jsesc(searchParams.get('phonenum'));
    if (!emailValid || email != emailconfirm || password != passwordConfirm) {
        return Response.json({ data:"invalid", registration: "invalid"})
    }

    const url = process.env.DB_ADDRESS
    const {MongoClient} = require("mongodb");
    const client = new MongoClient(url);

    await client.connect();
    console.log("Connected to Database");
    const db = client.db("krispykreme");
    const collection = db.collection("users");

    let dupeEmail = await collection.findOne({
        "email": email
    }, {email: true});
    if (await dupeEmail != null) {
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
