import React, { useEffect, useState ,useRef} from 'react'
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
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
const ManageWorkers = () => {

    const columns = [
        { field: 'workerID', headerName: 'Worker ID', width: 125 },
        { field: 'name', headerName: 'Name', width: 125 },
        { field: 'number', headerName: 'Phone Number', width: 150 },
        { field: 'mail', headerName: 'Email', width: 125 },
        { field: 'parkingSpace', headerName: 'Parking Space', width: 125 },
        { field: 'numberOfSpots', headerName: 'Number of Spots', width: 100 },
        { field: 'inTime', headerName: 'In - Time', width: 175 },
        { field: 'outTime', headerName: 'Out - Time', width: 175 },
        { field: 'serviceName', headerName: 'Services', width: 125 },

    ];
    const [open2, setOpen2] = React.useState(false);
    const [rows, setRows] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [items, setItems] = useState([]);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const [selected, setselected] = useState([]);
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const addSpace = () => {
        let loc;
        items.forEach(element => {
            if (element.location == location) {
                loc = element;
            }
        });
        const bdy = {
            location: location,
            name: name,
            number: number,
            mail: email,
            password: password,
            parkingSpace: loc,
            email: email,
            password: password
        };
        console.log(bdy);
        fetch('/worker/add', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(bdy)
        }).then(res => res.text()).then(data => {
            setRows(rows);
            console.log(data);
        });
        setOpen(false);
    }
    const [location, setLocation] = useState('');
    const [num, setNum] = useState(0);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const url = `/search/location/all`;
        fetch(url).then(res => res.json()).then(data => {
            setItems(data);
        });
    }, []);
    function delWorker(e){
        if(e.keyCode==46){
            console.log(selected);
          
            if(selected.length>0){
                axios.delete(`/worker/${rows[selected[0]-1].workerID}`).then(data=>console.log(data.data)); 
                    
                }
                }
        }
    
    useEffect(() => {
  
        window.addEventListener('keydown', delWorker);
    
        return () => {
          window.removeEventListener('keydown',delWorker );
        };
      });
    useEffect(() => {
        fetch('/worker/allWork', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res => res.json()
        ).then(data => {
            console.log(data);
            const row = [];
            console.log(data);
            data.forEach((element,id) => {
              
                if(element.service===null || element.dateTime===null){
                    const body = {
                        id: id+1,
                        workerID:element.worker.id,
                        name: element.worker.name,
                        number: element.worker.number,
                        mail: element.worker.mail,
                        parkingSpace: element.worker.parkingSpace.location,
                        numberOfSpots: element.worker.parkingSpace.numberOfSpots,
                        inTime: 'Lite',
                        outTime: 'Lite',
                        serviceName: 'Lite'
                        
                    }
                    row.push(body);
                }
                else{
                    const body = {
                        id: id+1,
                        name: element.worker.name,
                        workerID:element.worker.id,
                        number: element.worker.number,
                        mail: element.worker.mail,
                        parkingSpace: element.worker.parkingSpace.location,
                        numberOfSpots: element.worker.parkingSpace.numberOfSpots,
                        inTime: element.dateTime.inTime,
                        outTime: element.dateTime.outTime,
                        serviceName: element.service.serviceName
                    }
                    row.push(body);
                }
            
               
            });
            console.log(row);
            setRows(row);


        });
    }, []);
    function handleDelete(e){
        setselected(e);
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
    return (
        <div>
            <NavbarAdmin />
            <div className="parkingSpacesLayout">
                <Button variant="contained" onClick={handleClickOpen} style={{ margin: 'auto', marginBottom: '20px', marginTop: '10px', fontFamily: 'Arial' }}>
                    Add Worker
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add Worker</DialogTitle>
                    <DialogContent style={{ width: '30vw' }}>


                        <Stack className="location" style={{ paddingTop: '10px' }}>
                            <Autocomplete
                                id="free-solo-demo"
                                fullWidth
                                options={items.map((option) => option.location)}
                                renderInput={(params) => <TextField {...params} label="Location" />}
                                onChange={(event, value) => setLocation(value)}
                            />
                            <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth style={{ marginTop: '10px' }} value={name} onChange={(e) => setName(e.target.value)} />
                            <TextField id="outlined-basic" label="Number" variant="outlined" fullWidth style={{ marginTop: '10px' }} value={number} onChange={(e) => setNumber(e.target.value)} />
                            <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth style={{ marginTop: '10px' }} value={email} onChange={(e) => setEmail(e.target.value)} />
                            <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth type="password" style={{ marginTop: '10px' }} value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Stack>




                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={addSpace}>Add</Button>
                    </DialogActions>
                </Dialog>
                <Container>
                    {console.log(selected)}
                    <div style={{ height: 380, width: '74vw', margin: 'auto' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            selectionModel={selected}
                            onSelectionModelChange={handleDelete}
                        />
                    </div>
                </Container>


            </div>
        </div>
    )
}

export default ManageWorkers;
