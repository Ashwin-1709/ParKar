import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import './LoginBar.css';
import { Link } from 'react-router-dom';
const LoginBar = () => {

    return (
        <div className="buttongroup">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                        m: 1,
                    },
                }}
            >
            <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Link to="/login" className="links"><Button>Login</Button></Link>
            <Link to="/register" className="links"><Button>register</Button></Link>
            </ButtonGroup>
            </Box>
        </div>
    )
}

export default LoginBar
