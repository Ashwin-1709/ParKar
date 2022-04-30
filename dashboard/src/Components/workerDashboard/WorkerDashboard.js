import React from 'react'
import WorkerNavBar from './WorkerNavBar';
import {Redirect} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
const WorkerDashboard = () => {
    const history = useHistory();
    return (
        <div>
            {history.push('/my_profile')}
        </div>
    )
}

export default WorkerDashboard
