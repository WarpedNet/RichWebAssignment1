'use client'
import { Label } from "@mui/icons-material";
import Link from "@mui/material/Link";
import { Box, Breadcrumbs, Button, Divider, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { checklogin } from "../api/checklogin/route.js";
import { redirect } from "next/navigation.js";
export default function Manager() {

    const [weather, setweather] = useState(0)
    const [orders, setorders] = useState(null)
    
    useEffect(() => {
        fetch("/api/weather")
        .then((res) => res.json())
        .then((weather) => {setweather(weather)})
    }, [])

    useEffect(() => {
        fetch("/api/getOrders", {method: 'POST'})
        .then((res) => res.json())
        .then((info) => setorders(info))
    }, [])

    function checkLogin() {
        fetch("/api/checklogin")
        .then((res) => res.json())
        .then((res) => {
            if (!res.isLoggedIn || res.role != "manager") {
                console.log(res);
                redirect("/");
            }
        });
    }

    useEffect(() => {
        checkLogin();
    }, [])

    async function removeOrder(orderID) {
        await fetch(`/api/removeOrder?orderID=${orderID}`);
        await fetch("/api/getOrders", {method: 'POST'})
        .then((res) => res.json())
        .then((info) => setorders(info));
    }
    
    if (!orders) {
        return (
            <h1>Loading Orders...</h1>
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
                        <Typography sx={{color: "#95b2b8ff", fontSize: "1.6em", color:"#8CB369"}}>Orders</Typography>
                    </Breadcrumbs>
                </Box>
                <Box sx={{width: "33vw", display:"flex", justifyContent:"center"}}/>
            </Stack>
            {/* Products */}
            <Table>
                <TableHead>
                    <TableRow sx={{backgroundColor:"#41521F"}}>
                        <TableCell sx={{fontSize:"1.4em", fontWeight:"bold", textAlign:"center", color:"#A63D40", textDecoration:"underline"}}>OrderID</TableCell>
                        <TableCell sx={{fontSize:"1.4em", fontWeight:"bold", textAlign:"center", color:"#A63D40", textDecoration:"underline"}}>ProductID</TableCell>
                        <TableCell sx={{fontSize:"1.4em", fontWeight:"bold", textAlign:"center", color:"#A63D40", textDecoration:"underline"}}>ProductName</TableCell>
                        <TableCell sx={{fontSize:"1.4em", fontWeight:"bold", textAlign:"center", color:"#A63D40", textDecoration:"underline"}}>ProductPrice</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        orders.map((order, i) => (
                                (order.order).map((product, j) => (
                                    // <div key={product._id}>
                                    //     ItemID: {product._id}
                                    //     <br></br>
                                    //     Name: {product.productName}
                                    //     <br></br>
                                    //     Price: {product.productPrice}
                                    //     <Button onClick={() => removeOrder(order._id)}>Remove order</Button>
                                    // </div>
                                    <TableRow sx={{backgroundColor:"#41521F"}} key={j}>
                                        <TableCell sx={{fontSize:"1.2em", textAlign:"center", color:"#95B2B8", textDecoration:"underline"}}>{order._id}</TableCell>
                                        <TableCell sx={{fontSize:"1.2em", textAlign:"center", color:"#95B2B8", textDecoration:"underline"}}>{product._id}</TableCell>
                                        <TableCell sx={{fontSize:"1.2em", textAlign:"center", color:"#95B2B8", textDecoration:"underline"}}>{product.productName}</TableCell>
                                        <TableCell sx={{fontSize:"1.2em", textAlign:"center", color:"#95B2B8", textDecoration:"underline"}}>{product.productPrice}</TableCell>
                                        <TableCell sx={{fontSize:"1.2em", textAlign:"center"}}><Button variant="contained" sx={{backgroundColor:"#8CB369"}} onClick={() => removeOrder(order._id)}>Remove Order</Button></TableCell>
                                    </TableRow>
                                ))
                        ))
                    }
                </TableBody>
            </Table>
        </Box>
    );
}