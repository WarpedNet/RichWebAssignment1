'use client'
import { Label } from "@mui/icons-material";
import Link from "@mui/material/Link";
import { Box, Breadcrumbs, Button, Divider, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";

export default function Manager() {
    const [weather, setweather] = useState(0)
    const [products, setproducts] = useState(null)

    useEffect(() => {
        fetch("/api/weather")
        .then((res) => res.json())
        .then((weather) => {setWeatherData(weather)})
    }, [])

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
                    <h1>Something idk</h1>
                </Box>
            </Stack>
            {/* Products */}
            {
                products.map((item, i) => (
                    <div key={i}>
                        ID: {item._id}
                        <br></br>
                        {item.time}
                        -
                        {item.customerRef}
                        <br></br>
                        <Button>Add to cart</Button>
                    </div>
                ))
            }
        </Box>
    );
}