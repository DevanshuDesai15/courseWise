import { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { userLoadingState } from '../store/selectors/isUserLoading';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userNameState } from '../store/selectors/userName';
import { userState } from '../store/atoms/user';

export default function Header() {
  const navigate = useNavigate();

  const userLoading = useRecoilValue(userLoadingState);
  const userName = useRecoilValue(userNameState);
  const setUser = useRecoilState(userState);
  const [anchorEl, setAnchorEl] = useState(null);

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
    setUser({
      isLoading: false,
      userName: null
    })
    navigate('/login');
  }

  if (userLoading) {
    return <></>
  }

  if(userName){
    return (
      <Box>
        <AppBar position="static">
        <Toolbar>
            <Typography variant='h6' component="div" sx={{ flexGrow: 1 }} onClick={() => {
              navigate("/");
            }}>
              CourseWise
            </Typography>
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
              <Avatar alt="Remy Sharp" src="https://image.winudf.com/v2/image1/bmV0LndsbHBwci5ib3lzX3Byb2ZpbGVfcGljdHVyZXNfc2NyZWVuXzBfMTY2NzUzNzYxN18wOTk/screen-0.webp?fakeurl=1&type=.webp" />
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
              <MenuItem>{userName}</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            </Toolbar>
      </AppBar>
      </Box>
    )
  } else {
    return (
      <Box>
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>CourseWise</Typography>
          <> 
            <Button color="inherit" onClick={handleSignup}>Register</Button>
            <Button color="inherit" onClick={handleLogin}>Login</Button>
          </>
        </Toolbar>
        </AppBar>
      </Box>
    )
  }

    
}
