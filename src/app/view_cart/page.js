'use client'
import { Label } from "@mui/icons-material";
import Link from "@mui/material/Link";
import { Box, Breadcrumbs, Button, Divider, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";

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
                    <h1>Cart</h1>
                </Box>
            </Stack>
            {/* Products */}
            {
                cart.map((item, i) => {
                    const [product, setproduct] = useState(null);
                    fetch(`/api/getProductFromID?productID=${item.productID}`)
                    .then((res) => res.json())
                    .then((product) => {setproduct(product)})
                    return (
                        <div key={i}>
                            ID: {product._id}
                            <br></br>
                            {product.productName}
                            -
                            {product.productPrice}
                            <br></br>
                            <Button onClick={() => removeFromCart(item)}>Remove from cart</Button>
                        </div>
                    )
                })
            }
        </Box>
    );
}