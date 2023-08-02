import { Box, AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(()=>{
    fetch('http://localhost:3000/admin/profile', { headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
    .then(res => res.json())
    .then(data => {
      setUsername(data.username);
      setLoggedIn(true);
    })
    .catch(error => {
      console.error('Error fetching username', error);
      setLoggedIn(false);
    })
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogin = () => {
    navigate('/login');
  }

  const handleSignup = () => {
    navigate('/register');
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.setItem("token", null);
    setLoggedIn(false);
    setUsername('');
    navigate('/login');
  }

    return (
      <Box>
        <AppBar position="static">
        <Toolbar>
          {loggedIn ? (
            <Typography variant='h6' component="div" sx={{ flexGrow: 1 }} onClick={() => {
              navigate("/");
            }}>
              CourseWise
            </Typography>
          ):(
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>CourseWise</Typography>
          )}
          {loggedIn ? (
            <>
              <Button color="inherit" onClick={() => {
                navigate("/createcourse")
              }}>
                Add Courses
              </Button>
              <Button color="inherit" onClick={() => {
                navigate("/courses");
              }}>
                Courses
              </Button>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                sx={{ mt: '35px' }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>{username}</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <> 
              <Button color="inherit" onClick={handleSignup}>Register</Button>
              <Button color="inherit" onClick={handleLogin}>Login</Button>
              </>
          )}
        </Toolbar>
      </AppBar>
      </Box>
    )
}
