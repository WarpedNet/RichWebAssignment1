'use client'
import * as React from 'react';
import { Label } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormLabel, TextField } from "@mui/material";
import { redirect } from 'next/navigation';
import { useState } from 'react';
import * as validator from 'email-validator';

export default function Home() {

  const [openDialog, setopenDialog] = useState(false);
  const [errorTitle, seterrorTitle] = useState(false);
  const [errorMSG, seterrorMSG] = useState(false);
  const handleClose = () => {
    setopenDialog(false);
  }
  const handleSubmit = (e) => {
    console.log("login");
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let email = data.get("email");
    let isEmailValid = validator.validate(email);
    let password = data.get("password");
    
    if (isEmailValid && email.length != 0 && password.length != 0){
      if (email.length > 120) {
        seterrorTitle("Invalid Email");
        seterrorMSG("Email Address provided is too long");
        setopenDialog(true);
      }
      runDBCallAsync(`/api/login?email=${email}&password=${password}`);
    }
    else {
      seterrorTitle("Invalid Email");
      seterrorMSG("Email Address provided is Invalid");
      setopenDialog(true);
    }
  }
  async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();
    if (data.data == "invalid") {
      seterrorTitle("Login Invalid");
      seterrorMSG("Invalid Login Details");
      setopenDialog(true);
    }
    else if (data.data == "valid" && data.password == "valid" && data.role == "manager"){
      redirect("/manager");
    }
    else {
      redirect("/customer");
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
          <Button sx={{color: "#a63d40ff", fontSize: "1em", fontWeight: "bold", borderColor:"#41521fff"}} onClick={() => redirect("/register")}>Register</Button>
        </ButtonGroup>
      </FormControl>
      <Dialog open={openDialog} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
          <DialogTitle>
            {errorTitle}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {errorMSG}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
      </Dialog>
    </Box>
  );
}
