'use client'
import { Label } from "@mui/icons-material";
import Link from "@mui/material/Link";
import { Box, Breadcrumbs, Button, Divider, Stack, Typography } from "@mui/material";
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
        <Box>
            {/* Top NavBar */}
            <Stack direction="row" divider={<Divider orientation="vertical" flexItem/>} spacing={2} sx={{maxHeight: "10vh"}}>
                <Box sx={{width: "33vw", justifyContent:"center", backgroundColor: "#a63d40ff"}}>
                    <h1>{JSON.stringify(weather.temp)}</h1>
                </Box>
                <Box sx={{width: "33vw", backgroundColor: "#a63d40ff"}}>
                    <Breadcrumbs>
                        <Link underline="hover" color="inherit" href="/">Home</Link>
                        <Typography sx={{color: "#95b2b8ff"}}>Customer</Typography>
                    </Breadcrumbs>
                </Box>
                <Box sx={{width: "33vw", justifyContent:"center", backgroundColor: "#a63d40ff"}}>
                    <h1>Something idk</h1>
                </Box>
            </Stack>
            {/* Products */}
            {
                orders.map((order, i) => (
                    <div key={order._id}>
                        ID: {order._id}
                        <br></br>
                        {order.email}
                        {(order.order).map((product, j) => (
                            <div key={product._id}>
                                ItemID: {product._id}
                                <br></br>
                                Name: {product.productName}
                                <br></br>
                                Price: {product.productPrice}
                            </div>
                        ))
                        }
                        <Button onClick={() => removeOrder(order._id)}>Remove order</Button>
                    </div>
                ))
            }
        </Box>
    );
}