import React,{useState,useContext} from 'react';
import { MenuItems } from './MenuItems';
import './navbar.css';
import { Link } from 'react-router-dom';
import RegistrationContext from '../login/RegistrationStates';
const NavbarAdmin = () => {
  const [menuhandler, setmenuhandler] = useState(false);
  const context = useContext(RegistrationContext);
  function handleClick(){
    setmenuhandler(!menuhandler);
  }
  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo">ParKar<i className="fas fa-car"></i></h1>
      <ul className='nav-menu active'>
        {MenuItems.map((item,index)=>{
            function logout(){
                localStorage.removeItem('regCtx');
                context.setRegCtx({
                  firstname: '',
                  lastname: '',
                  email: '',
                  isLoggedIn: 0,
                  userType : '',
                  user: {
                      firstname: "",
                      lastname : "",
                      email : "",
                      address: "",
                      app_user_role: "",
                      phone_num: "",
                      reg_id: "",
                      username: ""
                  }
                });
            }
            //Change this While Changing Navbar
            if(index==1){
              return(<li key={index} onClick={logout}><Link className={item.cName} to={item.url}>{item.title}</Link></li>);
            }
            return (
              <li key={index}><Link className={item.cName} to={item.url}>{item.title}</Link></li>
            )
        }
        )}
      </ul>
    </nav>
  )
}

export default NavbarAdmin;
