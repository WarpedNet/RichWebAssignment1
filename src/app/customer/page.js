'use client';
import { getSession } from "../api/session.js";
import { useRouter } from 'next/navigation';
import { Box } from "@mui/material";

export default function customer (){
    let session = getSession();
    const router = useRouter();
    if (session.isLoggedIn) {
        return (
            <Box>
                
            </Box>
        );
    }
    else {
        router.push("/");
    }

}