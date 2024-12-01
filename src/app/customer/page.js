'use client'
import { Label } from "@mui/icons-material";
import Link from "@mui/material/Link";
import { Box, Breadcrumbs, Button, Divider, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { checklogin } from "../api/checklogin/route";

export default function Customer() {
    const [weather, setweather] = useState(0)
    const [products, setproducts] = useState(null)

    useEffect(() => {
        fetch("/api/weather")
        .then((res) => res.json())
        .then((weather) => {setweather(weather)})
    }, [])

    useEffect(() => {
      fetch("/api/getProducts")
      .then ((res) => res.json())
      .then((products) => {setproducts(products)})
    
    }, [])
    function checkLogin() {
        fetch("/api/checklogin")
        .then((res) => res.json())
        .then((res) => {
            if (!res.isLoggedIn) {
                redirect("/");
            }
        });
    }
    useEffect(() => {
        checkLogin();
    }, [])
    
    function putInCart(item) {
        fetch(`/api/putInCart?productName=${item.productName}&productPrice=${item.productPrice}`);
    }

    if (!products) {
        return (
            <h1>Loading Products...</h1>
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
                    <Button onClick={() => redirect("/view_cart")}>Cart</Button>
                </Box>
            </Stack>
            {/* Products */}
            {
                products.map((item, i) => (
                    <div key={i}>
                        ID: {item._id}
                        <br></br>
                        {item.productName}
                        -
                        {item.productPrice}
                        <br></br>
                        <Button onClick={() => putInCart(item)}>Add to cart</Button>
                    </div>
                ))
            }
        </Box>
    );
}