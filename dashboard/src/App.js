import './App.css';
import Login from './Components/login/Login';
import Register from './Components/login/Register';
import { BrowserRouter, Route } from 'react-router-dom';
import { Switch, Redirect } from 'react-router-dom';
import Confirmation from './Components/login/Confirmation';
import { AuthContextProvider } from './Components/Auth-Context';
import Error from './Components/login/Error';
import RegisterGoogle from './Components/login/RegisterGoogle';
import { RegistrationProvider } from './Components/login/RegistrationStates';
import Profile from './Components/userDashboard/Profile';
import Navigator from './Components/userDashboard/Navigator';
import BookingDetails from './Components/Admin/BookingDetails';
import ManageWorkers from './Components/Admin/ManageWorkers';
import WorkerProfile from './Components/workerDashboard/WorkerProfile';
function App() {
  return (
    <RegistrationProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <div className="dashboard">
            <Switch>
              <Route path="/confirmEmail">
                <Confirmation />
              </Route>
              <Route path="/dashboard">
                <Navigator />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/booking_details">
                <BookingDetails />
              </Route>
              <Route path="/manage_workers">
                <ManageWorkers />
              </Route>
              <Route path="/googlesignin">
                <RegisterGoogle />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/error">
                <Error />
              </Route>
              <Route path="/my_profile">
                <WorkerProfile />
              </Route>
              <Route path="/">
                <Login />
              </Route>
              
            </Switch>
           
          </div>
        </BrowserRouter>
      </AuthContextProvider>
    </RegistrationProvider>
  );
}

export default App;
