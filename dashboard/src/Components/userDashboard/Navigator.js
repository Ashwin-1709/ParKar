import React,{useContext} from 'react';
import AdminDashboard from '../Admin/AdminDashboard';
import RegistrationContext from '../login/RegistrationStates';
import WorkerDashboard from '../workerDashboard/WorkerDashboard';
import Dash from './Dash';
const Navigator = () => {
    const context = useContext(RegistrationContext);
    const typeofUser = context.regCtx.user.app_user_role;
    return (
        <div>
        {
            typeofUser=="USER" && 
            <Dash />
        }
        {
            typeofUser=='ADMIN' &&
            <AdminDashboard />
        }
        {
            typeofUser=='WORKER' && 
            <WorkerDashboard />
        }
        </div>
    )
}

export default Navigator
