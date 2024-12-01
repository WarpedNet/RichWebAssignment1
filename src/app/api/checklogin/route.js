'use server'
import { getSession } from "../session";
import { redirect } from "next/navigation";

export async function GET(req, res) {
    let session = await getSession();
    if (session.isLoggedIn){
        console.log(session.role);
        return Response.json({isLoggedIn: true, role: session.role});
    }
    else {
        return Response.json({isLoggedIn: false});
    }
    
}