'use client'
import * as React from 'react';
import { Label } from "@mui/icons-material";
import { Box, Button, ButtonGroup, FormControl, FormLabel, TextField } from "@mui/material";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();

  const handleSubmit = (e) => {
    console.log("login");
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let email = data.get("email");
    let password = data.get("password");
  
    runDBCallAsync(`/api/login?email=${email}&password=${password}`)
  }
  async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();

    if (data.data == "valid" && data.password == "valid" && data.role == "customer") {
      router.push("/customer");
    }
    else if (data.data == "valid" && data.password == "valid" && data.role == "manager"){
      router.push("/manager");
    }
    else {
      console.log("Incorrect Login");
    }
  }
  return (
    // Login
    <Box sx={{display: "flex", justifyContent:"center", alignItems:"center", minHeight:"100vh", backgroundColor: "#120309ff"}} component="form" onSubmit={handleSubmit}> 
      <FormControl sx={{alignItems: "center", padding:"2vw", border:"3px solid", borderColor: "#120309ff", borderRadius: "10px"}}>
        <FormLabel sx={{fontSize: 48, mb: 2, fontWeight: "bold", borderBottom: "3px solid", borderColor: "#a63d40ff", color:"#41521fff"}}>Log In</FormLabel>

        <TextField id="email" name="email" label="Email" variant="outlined" sx={{backgroundColor: "#a63d40ff"}} required/>
        <TextField id="password" name="password" type="password" label="Password" variant="outlined" sx={{backgroundColor: "#a63d40ff"}} required/>
        <ButtonGroup color="primary" sx={{mt: "2vh"}}>
          <Button sx={{color: "#41521fff", fontSize: "1em", fontWeight: "bold", borderColor:"#a63d40ff"}} type="submit">Login</Button>
          <Button sx={{color: "#a63d40ff", fontSize: "1em", fontWeight: "bold", borderColor:"#41521fff"}} onClick={() => router.push("/register")}>Register</Button>
        </ButtonGroup>
      </FormControl>
    </Box>
  );
}
