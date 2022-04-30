import { Box } from '@mui/system';
import React,{useState,useEffect} from 'react'
import Container from '@mui/material/Container';
import { Redirect } from 'react-router-dom';
import Avatars from './Avatars';
import TextField from '@mui/material/TextField';
import './profile.css';
import { useContext } from 'react';
import Navbar from '../navbar/Navbar';
import RegistrationContext from '../login/RegistrationStates';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import axios from 'axios';
import FormControlLabel from '@mui/material/FormControlLabel';

import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TransactionTable from './TransactionTable';

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const Profile = () => {
    const context = useContext(RegistrationContext);
    const [cod, setcod] = useState(false);
	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?');
			return;
		}
   
		const options = {
			key: 'rzp_live_O9gAPMedCeMt0K',
			currency: 'INR',
			amount: '1',
			order_id: 'order_IToeYpfh5a9TAA',
			name: 'ParKar Services',
			description: 'Add Money in your ParKar Account',
			"handler": function (response) {
               
                axios.post(`/balance/${context.regCtx.user.username}/add/1`).then(data=>{
                    console.log(data);
                    const obj = data.data;
                    setbalance(parseInt(obj[Object.keys(obj)[0]])); 
                });
			},
			prefill: {
				name:context.regCtx.firstname,
				email: context.regCtx.user.email,
				phone_number: context.regCtx.user.phone_num
			}
		}
		const paymentObject = new window.Razorpay(options);
        paymentObject.on('payment.failed', function (response){
            alert("Payment Not Successful");
         });
		paymentObject.open();
	}
 
    const [balance, setbalance] = useState(0);
   
    
    useEffect(() => {
        axios.post(`/balance/${context.regCtx.user.username}`).then(data=>{
            const obj = data.data;
            setbalance(parseInt(obj[Object.keys(obj)[0]])); 
        });
    }, []);
    const [open, setOpen] = React.useState(false);
    const [open2, setopen2] = React.useState(false);

    const handleClickopen2 = () => {
      setopen2(true);
    };
  
    const handleClose2 = () => {
      setopen2(false);
    };
    const [transactionRows, settransactionRows] = useState([{
        id:'0',
        location:'First',
        inTime:'123',
        outTime:'123',
        cost:0
    }]);
    
    useEffect(() => {
        //Get Transaction History
        axios.post(`/userbookings/${context.regCtx.user.username}`).then(data=>{
            const r = [];
            data.data.forEach((element,index)=>{
                r.push({
                    id:index+1,
                    location:element.parkingSpace.location,
                    inTime:element.dateTime.inTime,
                    outTime:element.dateTime.outTime,
                    cost:element.cost
                })
            });
            settransactionRows(r);
        });
    
    }, []);
    const [amount, setamount] = useState(0);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleAdd = () =>{
        if(cod==true){
            axios.post(`/balance/${context.regCtx.user.username}/add/${amount}`).then(data=>console.log(data.data));
        }
        else{
            displayRazorpay();
        }
        
        setOpen(false);
    }
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <div>
            <Navbar />
            {
                context.regCtx.isLoggedIn == 1 &&

                <div>
                    <div className="profilepage">
                        <div className="profileField">

                            <Container>
                                <Box>
                                    <h1>Profile</h1>
                                    <div className="boxFlex">
                                        <div>
                                            <TextField id="filled-basic" label="Name" variant="filled" value={context.regCtx.firstname + " " + context.regCtx.lastname} disabled className="profileFields" />
                                        </div>
                                        <div>
                                            <TextField id="filled-basic" label="Email" variant="filled" value={context.regCtx.email} disabled className="profileFields" />
                                        </div>
                                        <div>
                                            <TextField id="filled-basic" label="Registration ID" variant="filled" value={context.regCtx.user.reg_id} disabled className="profileFields" />
                                        </div>
                                        <div>
                                            <TextField id="filled-basic" label="Phone Number" variant="filled" value={context.regCtx.user.phone_num} disabled className="profileFields" />
                                        </div>
                                    </div>
                                </Box>
                            </Container>

                        </div>
                        <div>
                            <Avatars />
                        </div>
                    
                    </div>
                    <div className="balanceHistory">
                        <Container style={{maxWidth:'68.5vw'}}>
                            <Box style={{display:'flex',justifyContent:'center'}}>
                            <Card sx={{ width:300}} style={{background:'#E4E4E4',marginRight:'30px'}}>
                            <CardActionArea>
                        
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Balance
                                    </Typography>
                                    <Typography>
                                        Rs. {balance}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" onClick={handleClickOpen}>
                                    Add Balance
                                </Button>
                            </CardActions>
                        </Card>
                  
                        <Card sx={{ width:300}} style={{background:'#E4E4E4'}}>
                            <CardActionArea>
                        
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Last Transaction
                                    </Typography>
                                    <Typography>
                                    Rs.
                                        {transactionRows.length>0 && 
                                          transactionRows.at(-1).cost
                                        }
                                        {   transactionRows.length==0 && 
                                            0
                                        }
                                     
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" onClick={handleClickopen2}>
                                    View Complete History
                                </Button>
                            </CardActions>
                        </Card>
                       
                            </Box>
                        </Container>

                        
                    </div>
                    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Balance</DialogTitle>
        <DialogContent>
        <FormControlLabel control={<Checkbox defaultChecked checked={cod} onChange={(e)=>setcod(e.target.checked)}/>} label="Cash On Delivery" />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter Amount"
            type="email"
            fullWidth
            variant="filled"
            value={amount}
            onChange={(e)=>setamount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
      <div>
      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
    
        
      >
        <DialogTitle id="alert-dialog-title">
          {"Transaction History"}
        </DialogTitle>
        <DialogContent>
       
        <TransactionTable rows={transactionRows}/>
         
        </DialogContent>
        {console.log(transactionRows)}
        <DialogActions>
        <Button onClick={handleClose2} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>

                </div>
            }
            {
                context.regCtx.isLoggedIn == 0 &&
                <Redirect to="/error" />
            }
        </div>
    )
}

export default Profile;
