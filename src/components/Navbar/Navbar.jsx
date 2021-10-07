import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useHistory } from 'react-router';

export default function Navbar() {
    const history = useHistory()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography style={{cursor: "pointer"}} onClick={() => { history.push('/students') }} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Students
                    </Typography>
                    <Button color="inherit" style={{cursor: "pointer"}} onClick={() => { history.push('/students/new') }}>Create New Student</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
