import React, { useState, useContext } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import './login.css';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Redirect, useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { Link } from 'react-router-dom';
import RegistrationContext from './RegistrationStates';
export default function SimpleContainer(props) {
    const [firstname, setfirstname] = useState('');
    const history = useHistory();
    const context = useContext(RegistrationContext);
    const [lastname, setlastname] = useState('');
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [confpass, setconfpass] = useState('');
    const [phonenum, setphonenum] = useState('');
    const [regid, setregid] = useState('');
    const [email, setemail] = useState('');
    const [address, setaddress] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [page, setPage] = useState(0);
    function navigatePage() {
        setPage(prevpage => !prevpage);
    }
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const responseGoogle = (response) => {
        const mel = response.profileObj.email;
        const nem = response.profileObj.name.split(" ");
        const fN = nem[0];
        const lN = nem[1];
        console.log(mel, fN, lN);

        fetch('/sign_in_google', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'

            },
            body: JSON.stringify({
                firstname: fN,
                lastname: lN,
                email: mel,
                token: response.profileObj.googleId
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            else {
                // Not Registered
                throw new Error('User Not Registered');
            }

        }).then(data => {
            context.setRegCtx({
                user: data
            });
            history.push('/dashboard');
            console.log(data);
        })
            .catch((err) => {
                context.setRegCtx({
                    firstname: fN,
                    lastname: lN,
                    email: mel,
                    openRegisterPage: 1
                });
                history.push('/googlesignin');
            });
    }

    function validatePassword(str) {
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(str);
    }
    function checkPass(event) {
        if (validatePassword(password) == false) {
            alert('Enter a Strong Password');
        }
    }
    function checkEmail(event) {
        if (validateEmail(email) == false) {
            alert('Enter a Valid Email');
        }
    }
    function submitData(e) {
        e.preventDefault();
        // signUp(email,password);
        if (password !== confpass) {
            alert('Enter Same Password ');
            return;
        }
        const bdy = JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: password,
            reg_id: regid,
            phone_num: phonenum,
            address: address
        });
        console.log(bdy);
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
            // Redirect to Sign Page
            setRedirect(true);
        });
    }
    return (

        
        <div className="login-bg2">
            {context.regCtx.isLoggedIn==1 && <Redirect to="/dashboard"/>}
            <CssBaseline />
            <Container maxWidth="sm" className="container">
                <div className="bubbles"></div>
                <Box sx={{ height: '89vh', borderRadius: '20px', marginTop: '10vh' }} className="form-content">
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
                                value={firstname}
                                variant="filled"
                                style={{ backgroundColor: 'white' }}
                                onChange={e => setfirstname(e.target.value)}
                            />
                            <TextField
                                id="outlined-email-input"
                                label="Last Name"
                                type="text"
                                fullWidth
                                className="emailfield"
                                autoComplete="current-email"
                                value={lastname}
                                variant="filled"
                                style={{ backgroundColor: 'white' }}
                                onChange={e => setlastname(e.target.value)}

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
                                onChange={e => setusername(e.target.value)}

                            />
                            <TextField
                                id="outlined-email-input"
                                label="Email"
                                type="email"
                                fullWidth
                                className="emailfield"
                                autoComplete="current-email"
                                value={email}
                                variant="filled"
                                style={{ backgroundColor: 'white' }}
                                onChange={e => setemail(e.target.value)}
                                onBlur={checkEmail}
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
                      <GoogleLogin
                                clientId="569529603602-04dgt22gka71kl30ojqobflaetrjpm9n.apps.googleusercontent.com"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                                className="emailfield2"
                            />

<p>Already have an account ? <Link to="/login"  style={{ color: 'white' }}>Log In Here</Link></p>

                </Box>

            </Container>

        </div>

    );
}
