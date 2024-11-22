'use client';
import { useRouter } from 'next/navigation';
import { Box } from "@mui/material";

export default function customer (){
    const router = useRouter();

    async function checkLogin() {
        const res = await fetch("/api/checklogin");
        const data = await res.json();
        
        if (data.isLoggedIn){
            return true;
        }
        else {
            router.push("/");
        }
    }
    
    checkLogin();
    return (
        <Box>
            <h1>Yippee</h1>
        </Box>
    );

}