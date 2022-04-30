import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import './login.css';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../Auth-Context';
import { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import RegistrationContext from './RegistrationStates';
import { useHistory } from "react-router-dom"
import FilledInput from '@mui/material/FilledInput';
import { Link } from 'react-router-dom';
export default function SimpleContainer() {
    let history = useHistory();
    const [mail, setMail] = useState('');
    const ctx = useContext(AuthContext);
    const context = useContext(RegistrationContext);
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    //Google Sign In Logic 
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
                throw new Error('not registered')
                // Redirect to Google SignIn
            }

        }).then(data => {
            context.setRegCtx({
                firstname: fN,
                lastname: lN,
                email: mel,
                isLoggedIn: 1,
                user: data
            });

            localStorage.setItem('regCtx', JSON.stringify({
                firstname: fN,
                lastname: lN,
                email: mel,
                isLoggedIn: 1,
                user: data
            }));
            history.push('/dashboard');
        }).catch(err => {
                context.setRegCtx({
                    firstname: fN,
                    lastname: lN,
                    email: mel
                });
                history.push('/googlesignin');
            });

    }


    const [age, setAge] = React.useState('');

    const handleChanger = (event) => {
        setAge(event.target.value);
    };








    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    function getSignIn(e) {
        var date = new Date(Date.UTC(2012, 1, 12, 3, 0, 0));
        console.log(date.toISOString());
        fetch('/sign_in', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                mail: mail,
                password: values.password
            })
        }).then(res => {
            if (res.ok) {
                (res.json()).then(data => {
                    context.setRegCtx(prevState => ({
                        ...prevState,
                        user: data,
                        isLoggedIn: 1
                    }));
                  
                        localStorage.setItem('regCtx', JSON.stringify({
                            user:data,
                            isLoggedIn:1,
                            firstname:data.firstname,
                            lastname:data.lastname,
                            email:data.email
                        }));
                   
                    history.push('/dashboard');
                    console.log(data);
                });

            }
            else {
                alert('Bad Credentials');
                return;
            }

        });
    }
    return (
        <div className="login-bg">
               {context.regCtx.isLoggedIn==1 && <Redirect to="/dashboard"/>}
            <CssBaseline />
            <div className="bubbles"></div>
            <Container maxWidth="sm" className="container">
            <h1 style={{textAlign:'center',paddingTop:'20px'}}>ParKar<i className="fas fa-car"></i></h1>
            <p style={{textAlign:'center'}}>Online Car Parking Solutions</p>
                <Box sx={{ height: '70vh', borderRadius: '20px', marginY: '5vh' }} className="form-content">
                    
                    <h1 className="login2">Login</h1>
                    <TextField
                        id="outlined-password-input"
                        label="Email"
                        type="email"
                        fullWidth
                        className="emailfield"
                        autoComplete="current-password"
                        value={mail}
                        variant="filled"
                        style={{ backgroundColor: 'white' }}
                        onChange={e => setMail(e.target.value)}
                    />
                    <FormControl sx={{ m: 1, width: '60%' }} variant="filled">
                        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                        <FilledInput
                            id="filled-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            style={{ backgroundColor: 'white' }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Button variant="contained" style={{ color: 'black', backgroundColor: 'white', textTransform: 'none', fontFamily: "'Roboto', sans-serif !important" }} className="sign-in" size='large' onClick={getSignIn}>Login</Button>
                    <GoogleLogin
                        clientId="569529603602-04dgt22gka71kl30ojqobflaetrjpm9n.apps.googleusercontent.com"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        className="emailfield2"
                    />
                    <p>Don't Have an Account ? <Link to="/register"  style={{ color: 'white' }}>Sign Up Here</Link></p>
                </Box>

            </Container>


        </div>





    );
}
