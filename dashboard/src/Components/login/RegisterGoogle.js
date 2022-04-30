import React, { useState,useContext } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import './login.css';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import  { Redirect } from 'react-router-dom';
import RegistrationContext,{RegistrationProvider} from './RegistrationStates';
export default function SimpleContainer() {
    const context = useContext(RegistrationContext);
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [confpass, setconfpass] = useState('');
    const [phonenum, setphonenum] = useState('');
    const [regid, setregid] = useState('');
    const [address, setaddress] = useState('');
    const [redirect, setRedirect] = useState(false);
    function validatePassword(str) {
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(str);
    }
    function checkPass(event) {
        if (validatePassword(password) == false) {
            alert('Enter a Strong Password');
        }
    }
    
    function submitData(e) {
        e.preventDefault();
        if (password !== confpass) {
            alert('Enter Same Password ');
            return;
        }
        const bdy = JSON.stringify({
            firstname: context.regCtx.firstname,
            lastname: context.regCtx.lastname,
            username: username,
            email: context.regCtx.email,
            password: password,
            reg_id: regid,
            phone_num: phonenum,
            address: address
        });
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: bdy
        }).then(res => {
        }).then(data => {
            alert('Registration Successful ! Please Check your mail for verification link');
            context.openRegisterPage = 0;
            // Redirect to Sign Page
            setRedirect(true);
        });
    }
    const [page,setPage] = useState(0);
    function navigatePage() {
        setPage(prevpage => !prevpage);
    }
   
    return (
        <div className="login-bg2">
               {context.regCtx.isLoggedIn==1 && <Redirect to="/dashboard"/>}
            <CssBaseline />
            <Container maxWidth="sm" className="container">
                <div className="bubbles"></div>
                <Box sx={{ height: '85vh', borderRadius: '20px', marginTop: '10vh' }} className="form-content">
                    <h1 className="login">Register</h1>
                    {
                        page == 0 &&
                        <div className="form-content2">
                            <TextField
                                id="outlined-email-input"
                                label="First Name"
                                type="text"
                                fullWidth
                                className="emailfield"
                                autoComplete="current-email"
                                disabled
                                variant="filled"
                                style={{ backgroundColor: 'white' }}
                                value={context.regCtx.firstname}
                            />
                            <TextField
                                id="outlined-email-input"
                                label="Last Name"
                                type="text"
                                fullWidth
                                className="emailfield"
                                autoComplete="current-email"
                         
                                variant="filled"
                                style={{ backgroundColor: 'white' }}
                                value={context.regCtx.lastname}
                                disabled
                            />
                            <TextField
                                id="outlined-email-input"
                                label="Email"
                                type="email"
                                fullWidth
                                className="emailfield"
                                autoComplete="current-email"

                                variant="filled"
                                style={{ backgroundColor: 'white' }}
                                value={context.regCtx.email}
                                disabled
                            />
                            <TextField
                                id="outlined-email-input"
                                label="Username"
                                type="text"
                                fullWidth
                                className="emailfield"
                                autoComplete="current-email"
                                value={username}
                                variant="filled"
                                style={{ backgroundColor: 'white' }}
                                onChange={e=>setusername(e.target.value)}

                            />
                            
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                fullWidth
                                className="emailfield"
                                autoComplete="current-password"
                                value={password}
                                variant="filled"
                                style={{ backgroundColor: 'white' }}
                                onChange={e => setpassword(e.target.value)}
                                onBlur={checkPass}
                            />

                            <Button variant="contained" className="sign-in" size='large' style={{ color: 'black', backgroundColor: 'white', textTransform: 'none', fontFamily: "'Roboto', sans-serif !important" }} onClick={navigatePage}>Next</Button>

                        </div>
                    }
                    {
                        page == 1 &&
                        <div className="form-content2">

                            <TextField
                                id="outlined-password-input"
                                label="Confirm Password"
                                type="password"
                                fullWidth
                                className="emailfield red-field"
                                autoComplete="current-password"
                                value={confpass}
                                variant="filled"
                                style={{ backgroundColor: 'white' }}
                                onChange={e => setconfpass(e.target.value)}
                            />
                            <TextField
                                id="outlined-email-input"
                                label="Phonenumber"
                                type="number"
                                fullWidth
                                className="emailfield"
                                autoComplete="current-email"
                                value={phonenum}
                                variant="filled"
                                style={{ backgroundColor: 'white' }}
                                onChange={e => setphonenum(e.target.value)}

                            />
                            <TextField
                                id="outlined-email-input"
                                label="Registration ID"
                                type="text"
                                fullWidth
                                className="emailfield"
                                autoComplete="current-email"
                                value={regid}
                                variant="filled"
                                style={{ backgroundColor: 'white' }}
                                onChange={e => setregid(e.target.value)}
                            />
                            <TextField
                                id="outlined-email-input"
                                label="Address"
                                type="text"
                                fullWidth
                                className="emailfield"
                                autoComplete="current-email"
                                value={address}
                                variant="filled"
                                style={{ backgroundColor: 'white' }}
                                onChange={e => setaddress(e.target.value)}
                            />
                            <Button variant="contained" className="sign-in" size='large' style={{ color: 'black', backgroundColor: 'white', textTransform: 'none', fontFamily: "'Roboto', sans-serif !important" ,marginBottom:'0px'}} onClick={navigatePage}>Previous</Button>
                            <Button variant="contained" className="sign-in" size='large' style={{ color: 'black', backgroundColor: 'white', textTransform: 'none', fontFamily: "'Roboto', sans-serif !important" }} onClick={submitData}>Register</Button>
                            {redirect && <Redirect to="/login" />}

                          
                        </div>

                    }
                     
                </Box>

            </Container>

        </div>
    );
}
