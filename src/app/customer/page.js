import { getSession } from "../api/session.js";
import { redirect } from 'next/navigation';

export default function customer (){
    let session = getSession();
    if (session.isLoggedIn) {
        return (
            <Box>
                
            </Box>
        );
    }
    else {
        redirect("/app");
    }

}