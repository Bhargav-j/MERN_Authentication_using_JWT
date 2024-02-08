import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../store";
axios.defaults.withCredentials = true;

const Header = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState();

  const isloggedIn = useSelector((state) => state.isloggedIn);

  const sendLogout = async () => {
    const res = await axios.post("http://localhost:5000/api/logout", null, {
      withCredentials: true,
    });

    if (res.status === 200) {
      return res;
    }

    return new Error("unable to logout. Please try again");
  };

  const handleLogout = () => {
    sendLogout().then(() => {
      dispatch(authActions.logout());
    });
  };

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h3">MERN Auth</Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <Tabs
              indicatorColor="secondary"
              value={value}
              onChange={(e, val) => setValue(val)}
              textColor="inherit"
            >
              {!isloggedIn && (
                <>
                  <Tab to="/login" LinkComponent={Link} label="Login" value= {0}/>
                  <Tab to="/signup" LinkComponent={Link} label="Signup" value= {1}/>
                </>
              )}
              {isloggedIn && (
                <Tab
                  to="/"
                  LinkComponent={Link}
                  label="Logout"
                  onClick={handleLogout}
                  value={2}
                />
              )}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
