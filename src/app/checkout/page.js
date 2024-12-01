'use client'
import { Box, Typography, Button } from "@mui/material"
import { redirect } from "next/navigation"
export default function checkout() {
    return (
        <Box sx={{backgroundColor:"#120309", minWidth:"100vw", minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <Typography sx={{fontSize:"2.8em", textAlign:"center", color:"#95B2B8", fontWeight:"bold", textDecoration:"underline"}}>Thank you for your purchase!</Typography>
            <Button variant="contained" sx={{backgroundColor:"#41521F", marginTop:"5vh", width:"30vw", height:"8vh", fontSize:"1.6em"}} onClick={() => redirect("/customer")}>Go back to products</Button>
        </Box>
    )
}