import WorkerNavBar from './WorkerNavBar';
import { Box } from '@mui/system';
import React, {useEffect,useState} from 'react'
import Container from '@mui/material/Container';
import Avatars from '../userDashboard/Avatars';
import TextField from '@mui/material/TextField';
import '../userDashboard/profile.css';
import { DataGrid } from '@mui/x-data-grid';
import { useContext } from 'react';
import RegistrationContext from '../login/RegistrationStates';
import axios from 'axios';
const WorkerProfile = () => {
    const context = useContext(RegistrationContext);
    const name = context.regCtx.firstname;
    const [profile, setprofile] = useState([
        {
            id:'',
            service: {
                id:'',
                serviceName:''
            },
            worker:{
                id:'',
                name:'',
                number:'',
                mail:'',
                password:'',
                parkingSpace:{
                    id:'',
                    location:'',
                    numberOfSpots:'',
                }
            },
            dateTime :{
                id:'',
                inTime:'',
                outTime:''
            }
        }
    ]);
    const url = `/worker/name/${name}`;
    const [rows, setrows] = useState([]);
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'location', headerName: 'Parking Space', width: 250 },
        { field: 'numberOfAssignment', headerName: 'Assignments', width: 250 },
        { field: 'intime', headerName: 'In-Time', width: 250 },
        { field: 'outtime', headerName: 'Out-Time', width: 250 },
        { field: 'services', headerName: 'Services', width: 250 },
    ];
    async function getData(){
        await axios.get(url).then(res=>{
            setprofile(res.data);
           
        
                 const r = [];
                    console.log(res.data);
                    res.data.forEach((element,id) => {
                        if(element.dateTime==null || element.service==null){
                         
                        }
                        else{
                            const body = {
                                id:id+1,
                                location:element.worker.parkingSpace.location,
                                numberOfAssignment:1,
                                intime:element.dateTime.inTime,
                                outtime:element.dateTime.outTime,
                                services:element.service.serviceName
                            }
                            r.push(body);
                        }
                   
                    });
                   
            
                setrows(r);
               
            
 
    
        });
    }
    useEffect(() => {
        
                getData();
          
            console.log(url);

            
  
    }, []);
    return (
        
        <div>
            
          
            <div>
            <WorkerNavBar />
            <div className="profilepage">
                <div className="profileField">
                    
                    <Container>
                        <Box>
                        <h1>Profile</h1>
                            <div className="boxFlex">
                                <div>
                                    {console.log(profile[0])}
                                    <TextField id="filled-basic" label="Name" variant="filled" value={profile[0].worker.name} disabled className="profileFields" />
                                </div>
                                <div>
                                    <TextField id="filled-basic" label="Email" variant="filled" value={profile[0].worker.mail} disabled className="profileFields" />
                                </div>
                                <div>
                                    <TextField id="filled-basic" label="Number" variant="filled" value={profile[0].worker.number} disabled className="profileFields" />
                                </div>
                                
                                <div>
                                    <TextField id="filled-basic" label="Location" variant="filled" value={profile[0].worker.parkingSpace.location} disabled className="profileFields" />
                                </div>
                             
                            </div>
                        </Box>
                    </Container>

                </div>
                <div>
                  <Avatars />
                </div>
               
                
            </div>
            <div>
                <h1 style={{textAlign:'center',padding:'50px'}}>Your Previous and Pending Works</h1>
            <DataGrid
                        style={{width:'70vw',margin:'auto',height:'50vh'}}
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[1]}
                 

                    />
            </div>
            </div>

        </div>
    )
}

export default WorkerProfile
