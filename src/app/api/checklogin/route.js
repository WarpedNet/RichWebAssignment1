'use server'
import { getSession } from "../session";

export async function GET(req, res) {
    let session = getSession();
    if (session.isLoggedIn){
        return Response.json({"isLoggedIn": true});
    }
    else {
        return Response.json({"isLoggedIn": false});
    }
    
}