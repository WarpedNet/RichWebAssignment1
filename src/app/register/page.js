'use client'
import * as React from 'react';
import { useState } from 'react';
import { Box, Button, ButtonGroup, FormControl, FormLabel, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useRouter } from 'next/navigation';
import { Snackbar } from '@mui/base/Snackbar';
import * as validator from 'email-validator';

export default function Register() {
  const router = useRouter();
  const [registration, setregistration] = useState(null);
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
    let emailConfirm = data.get("emailConfirm")
    let emailValid = validator.validate(email);
    let password = data.get("password");
    let passwordConfirm = data.get("passwordConfirm");
    let phonenum = data.get("phonenum");

    if (email.length > 120) {
      seterrorTitle("Invalid Email");
      seterrorMSG("Email address is too long");
      setopenDialog(true);
    }
    if (password.length < 5) {
      seterrorTitle("Invalid Password");
      seterrorMSG("Password is too short");
      setopenDialog(true);
    }
    if (emailValid && email.length > 0) {
      runDBCallAsync(`/api/register?email=${email}&emailconfirm=${emailConfirm}&password=${password}&passwordconfirm=${passwordConfirm}&phonenum=${phonenum}`);
    }
    else {
      seterrorTitle("Invalid Email");
      seterrorMSG("Email Address Provided is Invalid")
      setopenDialog(true);
    }
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
