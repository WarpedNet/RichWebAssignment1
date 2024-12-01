'use client'
import { Label } from "@mui/icons-material";
import Link from "@mui/material/Link";
import { Box, Breadcrumbs, Button, Divider, Stack, Typography, TableCell, TableRow, Table, TableHead, TableBody } from "@mui/material";
import { useState, useEffect } from "react";
import { checklogin } from "../api/checklogin/route.js";
import { redirect } from "next/navigation.js";

export default function Cart() {
    const [weather, setweather] = useState(0)
    const [cart, setcart] = useState(null)
    
    useEffect(() => {
        fetch("/api/weather")
        .then((res) => res.json())
        .then((weather) => {setweather(weather)})
    }, [])

    useEffect(() => {
        fetch("/api/getCart")
        .then((res) => res.json())
        .then((cart) => {setcart(cart)})
    }, [])

    function checkLogin() {
        fetch("/api/checklogin")
        .then((res) => res.json())
        .then((res) => {
            if (!res.isLoggedIn) {
                console.log(res);
                redirect("/");
            }
        });
    }

    useEffect(() => {
        checkLogin();
    }, [])

    async function removeFromCart(item) {
        await fetch(`/api/removeFromCart?productName=${item.productName}&productPrice=${item.productPrice}`);
        fetch("/api/getCart")
        .then((res) => res.json())
        .then((cart) => {setcart(cart)})
    }

    async function checkout() {
        if (cart) {
            await fetch(`/api/checkout`, {
                method: 'POST',
                body: JSON.stringify(cart),
            });
            cart.map((item, i) => {
                fetch(`/api/removeFromCart?productName=${item.productName}&productPrice=${item.productPrice}`);
            });
            redirect("/checkout");
        }

    }

    if (!cart) {
        return (
            <h1>Loading Cart...</h1>
        )
    }
    if (!weather){
        return (
            <h1>Loading Weather...</h1>
        )
    }
    return (
        <Box sx={{minHeight: "100vh", backgroundColor: "#120309ff"}}>
            {/* Top NavBar */}
            <Stack direction="row" divider={<Divider orientation="vertical" flexItem/>} spacing={2} sx={{maxHeight: "10vh", backgroundColor: "#a63d40ff"}}>
                <Box sx={{width: "33vw", justifyContent:"center", backgroundColor: "#a63d40ff", color:"#8CB369", display:"flex", alignItems:"center"}}>
                    <h1>Current Temperature: {JSON.stringify(weather.temp)}°C</h1>
                </Box>
                <Box sx={{width: "33vw", display:"flex", justifyContent:"center"}}>
                    <Breadcrumbs>
                        <Link underline="hover" color="inherit" href="/" sx={{fontSize: "1.6em", color:"#41521fff"}}>Home</Link>
                        <Link underline="hover" color="inherit" href="/customer" sx={{fontSize: "1.6em", color:"#41521fff"}}>Products</Link>
                        <Typography sx={{color: "#95b2b8ff", fontSize: "1.6em", color:"#8CB369"}}>Cart</Typography>
                    </Breadcrumbs>
                </Box>
                <Box sx={{width: "33vw", display:"flex", justifyContent:"center"}}>
                    <Button variant="contained" sx={{fontSize: "1.2em", fontWeight: "bold", color:"#41521fff", backgroundColor:"#8CB369", width:"15vw"}} onClick={() => redirect("/view_cart")}>Go To Cart</Button>
                </Box>
            </Stack>
            {/* Products */}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontSize:"1.4em", fontWeight:"bold", textAlign:"center", color:"#A63D40", textDecoration:"underline"}}>Name</TableCell>
                        <TableCell sx={{fontSize:"1.4em", fontWeight:"bold", textAlign:"center", color:"#A63D40", textDecoration:"underline"}}>Price</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        cart.map((item, i) => {
                            return (
                                <TableRow key={i} sx={{backgroundColor:"#41521F"}}>
                                    <TableCell sx={{fontSize:"1.2em", textAlign:"center", color:"#95B2B8", textDecoration:"underline"}}>{item.productName}</TableCell>
                                    <TableCell sx={{fontSize:"1.2em", textAlign:"center", color:"#95B2B8", textDecoration:"underline"}}>{item.productPrice}&euro;</TableCell>
                                    <TableCell sx={{fontSize:"1.2em", textAlign:"center", color:"#95B2B8", textDecoration:"underline"}}>
                                        <Button variant="contained" sx={{backgroundColor:"#8CB369"}} onClick={() => removeFromCart(item)}>Remove</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
            {/* Checkout */}
            <Box sx={{width: "100vw", display:"flex", justifyContent:"center", marginTop:"5vh"}}>
                <Button variant="contained" sx={{backgroundColor:"#a63d40ff", width:"15vw", height:"8vh", fontSize:"1.4em", color:"#8CB369"}} onClick={() => checkout()}>Checkout</Button>
            </Box>
            
        </Box>
    );
}