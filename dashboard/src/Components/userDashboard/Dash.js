import React, { useState, useEffect, useContext } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import './Dash.css';
import moment from 'moment';
import { createTheme } from '@mui/system';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import RegistrationContext from '../login/RegistrationStates';
import Modal from '@mui/material/Modal';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Navbar from '../navbar/Navbar';
import { Redirect } from 'react-router-dom';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ServiceList from './ServiceList';
import AddBalance from './AddBalance';
const Dash = () => {
    const context = useContext(RegistrationContext);

    const theme = createTheme({
        palette: {
            background: {
                paper: "rgb(237,247,237)",
            },
            text: {
                primary: '#173A5E',
                secondary: '#46505A',
            },
            action: {
                active: '#001E3C',
            },
            success: {
                dark: '#009688',
            },
        },
    });
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [location, setLocation] = useState('');
    const [intime, setintime] = useState('2021-12-23T18:00');
    const [outtime, setoutime] = useState('2021-12-23T19:00');
    const [items, setItems] = useState([]);
    const [ass, setAss] = useState(0);
    const [loading, setloading] = useState(false);
    const [showSeats, setShowSeats] = useState(false);
    function outtimeSetter(e) {
        try {
            setoutime(e.target.value);
        } catch (error) {

        }
    }
    const [ddlist, setddlist] = useState([]);
    useEffect(() => {
        axios.get('/worker/getAllServices').then(res => {
            const arrY = res.data;
            setddlist(removeDuplicates(arrY, "serviceName"));
        })
    }, [])
    const itt = new Date(intime);
    const ott = new Date(outtime);
    var hrs = Math.abs(itt.getTime() - ott.getTime()) / 3600000;
    var cost = Math.abs(100 + 25 * Math.floor(hrs));
    function intimeSetter(e) {
        try {
            setintime(e.target.value);
        }
        catch (err) {

        }

    }
    useEffect(() => {
        const url = `/search/location/all`;
        fetch(url).then(res => res.json()).then(data => {
            setItems(data);
        });
    }, []);

    function locationHandler(e, value) {
        if (value != '') {
            setLocation(value);
        }
    }
    const [balance, setBalance] = useState(0);
    const [loc, setloc] = useStateWithCallbackLazy('');
    useEffect(() => {
        const it = moment(intime);
        const ot = moment(outtime);
        const bdy = {
            parkingSpace: loc,
            dateTimeModel: {
                inTime: it.toISOString(true).replace('+05:30', 'Z'),
                outTime: ot.toISOString(true).replace('+05:30', 'Z')
            }
        }
        console.log(JSON.stringify(bdy));
        axios.all([
            axios.post('/book/avialablespot', {
                parkingSpace: loc,
                dateTimeModel: {
                    inTime: it.toISOString(true).replace('+05:30', 'Z'),
                    outTime: ot.toISOString(true).replace('+05:30', 'Z')
                }
            }),
            axios.post(`/balance/${context.regCtx.user.username}`, {
            })
        ]).then(axios.spread((...responses) => {
            console.log(responses);
            setShowSeats(true);
            setAss(responses[0].data);
            console.log(responses[0].data);
            setBalance(responses[1].data[Object.keys(responses[1].data)[0]]);
        }));

    });
    async function checkSlots(e) {
        setloading(true);

        items.forEach(element => {
            if (element.location == location) {
                setloc(element);
            }
        });
        setTimeout(() => {
            setloading(false);
        }, 200);

    }
    function removeDuplicates(originalArray, prop) {
        var newArray = [];
        var lookupObject = {};

        for (var i in originalArray) {
            lookupObject[originalArray[i][prop]] = originalArray[i];
        }

        for (i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return newArray;
    }
    const [rating, setrating] = React.useState(5);
    const [open, setOpen] = React.useState(false);
    const [services, setServices] = useState([]);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        const body = {
            services: checked,
            confirmBookInfo: {
                username: context.regCtx.user.username,
                parkingSpace: loc,
                dateTimeModel: {
                    inTime: (intime + ':00.000Z'),
                    outTime: (outtime + ':00.000Z')
                }
            }
        }

        console.log(body);
        axios.post('/worker/assignwork', {
            services: checked,
            confirmBookInfo: {
                username: context.regCtx.user.username,
                parkingSpace: loc,
                dateTimeModel: {
                    inTime: (intime + ':00.000Z'),
                    outTime: (outtime + ':00.000Z')
                }
            }
        }).then(data => console.log(data.data)).catch(err => console.log(err));
        setOpen(false);
    }
    async function bookSeats(e) {
        const it = moment(intime);
        const ot = moment(outtime);
        try {
            fetch('/book/confirm', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: context.regCtx.user.username,
                    parkingSpace: loc,
                    dateTimeModel: {
                        inTime: it.toISOString(true).replace('+05:30', 'Z'),
                        outTime: ot.toISOString(true).replace('+05:30', 'Z')
                    }
                })
            }).then(res => res.json()).then(data => {
                console.log(data);
                checkSlots();
                setOpen(true);
                setAss(ass => ass - 1);
                setBalance(balance => (balance - cost));
            });
        }
        catch (err) {
            console.log(err);
        }

    }
    const [checked, setChecked] = useState(false);
    function checkListHandler(checked) {
        setChecked(checked);
    }

    const ro = [
        { cost, balance }
    ];
    return (
        <div>

            <Navbar />
            {

                (context.regCtx.isLoggedIn == 1) &&
                <div>
                
                    <div className="content">
                        <div className="searchbar">


                            <Stack className="location">
                                <Autocomplete
                                    id="free-solo-demo"

                                    options={items.map((option) => option.location)}
                                    renderInput={(params) => <TextField {...params} label="Location" />}
                                    onChange={(event, value) => setLocation(value)}
                                />
                            </Stack>
                            {/* <div className="location"><input type="search" className="search location-search" placeholder="Enter Location" value={location} onChange={locationHandler} /><i className="fa fa-search"></i></div> */}
                            {/* <div className="intime"><input type="datetime-local" className="search" placeholder="Enter In-Time" /></div> */}
                            <TextField
                                id="datetime-local"
                                label="In Time"
                                type="datetime-local"

                                sx={{ width: 250 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={intime}
                                onChange={intimeSetter}
                            />
                            {console.log(ddlist)}
                            <TextField
                                id="datetime-local"
                                label="Out Time"
                                type="datetime-local"

                                sx={{ margin: 2, width: 250 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={outtime}
                                onChange={outtimeSetter}
                            />
                        </div>
                        <Button variant="contained" color="success" className="s1" onClick={checkSlots}>
                            Find Slots
                        </Button>

                    </div>
                    <div className="carimg"></div>
                    {
                        loading &&
                        <Box sx={{ width: '95%', margin: 'auto' }}>
                            <Skeleton />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation={false} />
                        </Box>

                    }
                    {
                        !loading &&
                        <div>
                            {
                                showSeats &&
                                <div className="displaySeatsInfo">
                                    {ass > 0 &&
                                        <div>

                                            <Alert severity="success" className="showSeatsAlert" style={{marginBottom:'20px'}}>{ass} Seats are Available</Alert>
                                            <div className="bookSeats">

                                                <Box
                                                    sx={{
                                                        width: '100%',
                                                        height: 300,

                                                    }}
                                                >
                                                    <h1 className="b1" style={{marginBottom:'20px'}}>Book Seats</h1>

                                              


                                                    <TableContainer component={Paper} style={{ maxWidth: '300px', margin: 'auto' }}>
                                                        <Table aria-label="simple table">
                                                            <TableHead>
                                                                <TableRow>

                                                                    <TableCell align="center" style={{ fontSize: '30px', fontWeight: '1000' }}>Price</TableCell>
                                                                    <TableCell align="center" style={{ fontSize: '30px', fontWeight: '1000' }}>Balance</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {ro.map((row, idx) => (
                                                                    <TableRow
                                                                        key={idx}
                                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    >
                                                                        <TableCell align="center" style={{ fontSize: '20px' }}>Rs. {row.cost}</TableCell>
                                                                        <TableCell align="center" style={{ fontSize: '20px' }}>Rs. {row.balance}</TableCell>

                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>



                                                    <Button variant="contained" color="success" className="s1" onClick={bookSeats} style={{marginTop:'20px !important'}}>
                                                        Book Seats
                                                    </Button>

                                                </Box>


                                            </div>
                                        </div>
                                    }
                                    {
                                        ass == 0 &&
                                        <Alert severity="error" className="showSeatsAlert">{ass} Seats are Available</Alert>
                                    }
                                </div>
                            }
                        </div>

                    }
                    <div>
                        {
                            open &&
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h4" component="h4">
                                        Booking Confirmed
                                    </Typography>
                                    <p style={{ fontSize: '20px', display: 'inline', lineHeight: '30px' }}>Rate Us :</p>

                                    <Rating
                                        name="simple-controlled"
                                        value={rating}
                                        onChange={(event, newValue) => {
                                            setrating(newValue);
                                        }}
                                    />
                                    <br />
                                    <br />
                                    Add More Services
                                    <ServiceList ddlist={ddlist} checkListHandler={checkListHandler} />
                                    <TextField
                                        id="outlined-textarea"
                                        label="Feedback"
                                        placeholder="Please Enter Your Feedback"
                                        multiline
                                        rows={3}
                                        fullWidth
                                        style={{marginBottom:'10px'}}
                                    />
                                    <Button onClick={handleClose} variant='contained'>Ok</Button>
                                </Box>
                            </Modal>
                        }

                    </div>
                </div>
            }
            {
                (context.regCtx.isLoggedIn == 0) &&
                <Redirect to="/error" />
            }
        </div >
    )
}

export default Dash;
