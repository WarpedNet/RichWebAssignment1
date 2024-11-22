import { getSession } from "../api/session.js";
import { redirect } from 'next/navigation';
import { Box } from "@mui/material";

export default function customer (){
    let session = getSession();
    if (session.isLoggedIn) {
        return (
            <Box>
                
            </Box>
        );
    }
    else {
        redirect("..");
    }

}