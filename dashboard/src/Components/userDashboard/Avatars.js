import React,{useContext} from 'react'
import  Avatar  from 'avataaars';
import { generateRandomAvatarOptions } from './AvatarConfig';
import './Avatar.css';
import RegistrationContext from '../login/RegistrationStates';
const Avatars = () => {
    const context = useContext(RegistrationContext)
    return (
        <div>
        <div className="avatar-box">
        <Avatar
        style={{ width: '30vh', height: '30vh' }}
        avatarStyle='Circle'
        {...generateRandomAvatarOptions()} />
        </div>
        <h2 className="center">Welcome<br />{context.regCtx.firstname}</h2>
        </div>
    )
}

export default Avatars;
