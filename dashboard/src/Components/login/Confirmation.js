import React from 'react';
const Confirmation = () => {
    function closewind() {
        
        window.close();
         
    }
    setTimeout(closewind, 3000);
    return (
        <div style={{padding:'50px'}}>
            Your Account Has Been Activated!
            You Can Login Now into your Account
        </div>
    )
}

export default Confirmation;
