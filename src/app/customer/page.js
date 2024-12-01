'use client'
import { Label } from "@mui/icons-material";
import Link from "@mui/material/Link";
import { Box, Breadcrumbs, Button, CircularProgress, Divider, Stack, TableCell, TableRow, Table, TableHead, TableBody, Typography, Snackbar, SnackbarContent } from "@mui/material";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { checklogin } from "../api/checklogin/route";

export default function Customer() {
    const [weather, setweather] = useState(0)
    const [products, setproducts] = useState(null)
    const [snackbar, setsnackbar] = useState(false)

    useEffect(() => {
        fetch("/api/weather", {next: {revalidate: 0}})
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
        setsnackbar(true);
    }

    if (!products) {
        return (
            <div>
                <h1>Loading Products...</h1>
                <br></br>
                <CircularProgress/> 
            </div>

        )
    }
    if (!weather){
        return (
            <div>
                <h1>Loading Weather...</h1>
                <br></br>
                <CircularProgress/> 
            </div>
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
                        <Typography sx={{color: "#95b2b8ff", fontSize: "1.6em", color:"#8CB369"}}>Products</Typography>
                    </Breadcrumbs>
                </Box>
                <Box sx={{width: "33vw", display:"flex", justifyContent:"center"}}>
                    <Button variant="contained" sx={{fontSize: "1.2em", fontWeight: "bold", color:"#41521fff", backgroundColor:"#8CB369", width:"15vw"}} onClick={() => redirect("/view_cart")}>Go To Cart</Button>
                </Box>
            </Stack>
            {/* Products */}
            <Table>
                <TableHead>
                    <TableRow sx={{backgroundColor:"#41521F"}}>
                        <TableCell sx={{fontSize:"1.4em", fontWeight:"bold", textAlign:"center", color:"#A63D40", textDecoration:"underline"}}>ID</TableCell>
                        <TableCell sx={{fontSize:"1.4em", fontWeight:"bold", textAlign:"center", color:"#A63D40", textDecoration:"underline"}}>Name</TableCell>
                        <TableCell sx={{fontSize:"1.4em", fontWeight:"bold", textAlign:"center", color:"#A63D40", textDecoration:"underline"}}>Cost</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        products.map((item, i) => (
                            <TableRow key={i} sx={{backgroundColor:"#41521F"}}>
                                <TableCell sx={{fontSize:"1.2em", textAlign:"center", color:"#95B2B8", textDecoration:"underline"}}>{item._id}</TableCell>
                                <TableCell sx={{fontSize:"1.2em", textAlign:"center", color:"#95B2B8", textDecoration:"underline"}}>{item.productName}</TableCell>
                                <TableCell sx={{fontSize:"1.2em", textAlign:"center", color:"#95B2B8", textDecoration:"underline"}}>{item.productPrice}&euro;</TableCell>
                                <TableCell sx={{fontSize:"1.2em", textAlign:"center"}}><Button variant="contained" sx={{backgroundColor:"#8CB369"}} onClick={() => putInCart(item)}>Add to cart</Button></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <Snackbar
            anchorOrigin={{vertical:"top", horizontal:"center"}}
            open={snackbar}
            onClose={() => setsnackbar(false)}
            autoHideDuration={1500}
            color="#41521F"
            ><SnackbarContent sx={{backgroundColor:"#120309", display:"flex", justifyContent:"center"}} message={
            <Typography sx={{color:"white", fontSize:"1.8em", fontWeight:"bold", textAlign:"center"}}>Added to cart!</Typography>
            }/>
            </Snackbar>
        </Box>
    );
}