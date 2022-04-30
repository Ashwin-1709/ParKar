import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './ParkingSpaces.css';
import Typography from 'material-ui/styles/typography';
import { Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import NavbarAdmin from './NavbarAdmin';

const BookingDetails = () => {

    const columns = [

        { field: 'username', headerName: 'Username', width: 150 },
        { field: 'location', headerName: 'Parking Space', width: 150 },
        { field: 'numberOfSpots', headerName: 'Number of Spots', width: 150 },
        { field: 'inTime', headerName: 'In - Time', width: 200 },
        { field: 'outTime', headerName: 'Out - Time', width: 200 },
        
    ];
    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    const [rows, setRows] = useState([]);
    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    const [location, setlocation] = useState('');
    const [num, setNum] = useState(0);
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetch('/bookingdetail',{
                method:'POST',
                headers:{
                    'Content-type' : 'application/json'
                }
        }).then(res => res.json()
        ).then(data => {
            console.log(data);
            const row = [];
            data.forEach(element => {
                const body = {
                    id:Math.floor(Math.random()*1100000),
                    username:element.username,
                    location:element.parkingSpace.location,
                    numberOfSpots:element.parkingSpace.numberOfSpots,
                    inTime:element.dateTimeModel.inTime,
                    outTime:element.dateTimeModel.outTime
                }
                row.push(body);
            });
            setRows(row);
            // console.log(row);
        }).catch(err=>{
            console.log(err);
        });
    }, []);
  
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
    const [select, setSelection] = useState([]);
    console.log(select);
    return (
        <div>
            <NavbarAdmin />
        <div className="parkingSpacesLayout">
            
            <Container>
                <div style={{ height: 380, width: '70vw', margin: 'auto' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        onSelectionModelChange={(item) => setSelection(item)}
                    />
                </div>
            </Container>


        </div>
        </div>
    )
}

export default BookingDetails;
