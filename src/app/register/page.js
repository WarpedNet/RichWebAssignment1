'use client'
import * as React from 'react';
import { useState } from 'react';
import { Box, Button, ButtonGroup, FormControl, FormLabel, TextField } from "@mui/material";
import { useRouter } from 'next/navigation';
import { Snackbar } from '@mui/base/Snackbar';

export default function Register() {
  const router = useRouter();
  const [registration, setregistration] = useState(null);

  const handleSubmit = (e) => {
    console.log("login");
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let email = data.get("email");
    let emailConfirm = data.get("emailConfirm")
    let password = data.get("password");
    let passwordConfirm = data.get("passwordConfirm");
    let phonenum = data.get("phonenum");

    runDBCallAsync(`/api/register?email=${email}&emailconfirm=${emailConfirm}&password=${password}&passwordconfirm=${passwordConfirm}&phonenum=${phonenum}`);
  }

  async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();
    if (data.data != "valid") {
      setregistration(true);
    }
    else {
      setregistration(false);
    }
  }

  return (
    // Login
    <Box sx={{display: "flex", justifyContent:"center", alignItems:"center", minHeight:"100vh", backgroundColor: "#120309ff"}} component="form" onSubmit={handleSubmit}> 
      <FormControl sx={{alignItems: "center", padding:"2vw", border:"3px solid", borderColor: "#120309ff", borderRadius: "10px"}}>
        <FormLabel sx={{fontSize: 48, mb: 2, fontWeight: "bold", borderBottom: "3px solid", borderColor: "#a63d40ff", color:"#41521fff"}}>Register</FormLabel>
        
        <TextField id="email" name="email" label="Email" variant="outlined" sx={{backgroundColor: "#a63d40ff"}} required/>
        <TextField id="emailConfirm" name="emailConfirm" label="Confirm Email" variant="outlined" sx={{backgroundColor: "#a63d40ff"}} required/>
        <TextField id="password" name="password" type="password" label="Password" variant="outlined" sx={{backgroundColor: "#a63d40ff"}} required/>
        <TextField id="passwordConfirm" name="passwordConfirm" type="password" label="Confirm Password" variant="outlined" sx={{backgroundColor: "#a63d40ff"}} required/>
        <TextField id="phonenum" name="phonenum" label="PhoneNum" variant="outlined" sx={{backgroundColor: "#a63d40ff"}} required/>

        <ButtonGroup color="primary" sx={{mt: "2vh"}}>
          <Button sx={{color: "#41521fff", fontSize: "1em", fontWeight: "bold", borderColor:"#a63d40ff"}} onClick={() => {router.push("..")}}>Login</Button>
          <Button sx={{color: "#a63d40ff", fontSize: "1em", fontWeight: "bold", borderColor:"#41521fff"}} type="submit">Register</Button>
        </ButtonGroup>

      </FormControl>
    </Box>
    
  );
}
