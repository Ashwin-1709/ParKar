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

const ParkingSpaces = () => {

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'location', headerName: 'Parking Space', width: 250 },
        { field: 'numberOfSpots', headerName: 'Number Of Seats', width: 250 },
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
        fetch('/search/location/all').then(res => res.json()).then(data => {
            console.log(data);
            setRows(data);
        });
    }, rows);
    const addSpace = () => {
        fetch('/savespace/parkingspace', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                location: location,
                numberOfSpots: num
            })
        }).then(res =>   res.text()).then(data => {
            setRows(rows);
            console.log(data);
        });
        setOpen(false);
    }
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

    const handleRowSelection = (e) => {

        // prints correct indexes of selected rows
        console.log(e.selectionModel);

        // missing the first row selected
        setSelection(e.selectionModel);


    }

    function handleDelete(e) {

        var newRow = rows;
        select.forEach(element => {
            newRow = newRow.filter(function (item) {
                return item.id == element;
            });
        });
        console.log(newRow);
        fetch('/deletespace/parkingspace', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newRow)
        }).then(res => res.json()).then(data => console.log(data));
        //  
    }
    return (
        <div className="parkingSpacesLayout">
            <div className="modal">
                <Button variant="contained" onClick={handleClickOpen} style={{ margin: 'auto', marginBottom: '20px', fontFamily: 'Arial' }}>
                    Add Parking Space
                </Button>
                <Modal
                    open={open2}
                    onClose={handleClose2}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Item Deleted
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                           Please Refresh the page
                        </Typography>
                    </Box>
                </Modal>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add Parking Space</DialogTitle>
                    <DialogContent style={{ width: '30vw' }}>
                        <TextField
                            autoFocus
                            id="parkingSpaceName"
                            label="Parking Space"
                            type="text"
                            fullWidth
                            variant="filled"
                            style={{ marginBottom: '10px' }}
                            value={location}
                            onChange={(e) => { setlocation(e.target.value) }}
                        />
                        <TextField
                            autoFocus
                            id="numberOfSeats"
                            label="Amount"
                            type="number"
                            fullWidth
                            variant="filled"
                            value={num}
                            onChange={(e) => { setNum(e.target.value) }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={addSpace}>Add</Button>
                    </DialogActions>
                </Dialog>
            </div>

            <Container>
                <div style={{ height: 380, width: '50vw', margin: 'auto' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        onSelectionModelChange={(item) => setSelection(item)}

                    />
                </div>
            </Container>
            <Button variant="contained" style={{ fontFamily: 'Arial', marginTop: '20px' }} color="error" onClick={handleDelete}>Delete Spaces &nbsp;<i className="fa fa-trash"></i></Button>


        </div>
    )
}

export default ParkingSpaces
