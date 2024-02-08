import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store";

const Login = () => {
  const dispatch = useDispatch()
  const history = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios
      .post("https://mern-authentication-using-jwt.onrender.com/api/login", {
        email: inputs.email,
        password: inputs.password,
      })
      .catch((error) => {
        if (error.response) {
          // console.log(error.response.data);
          alert(error.response.data.message);
        } else {
          console.error("Error:", error.message);
          alert(error.message);
        }
        return "";
      });

    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // http post request
    if (
      inputs.email.trim() !== "" &&
      inputs.password.trim() !== ""
    ) {
      sendRequest().then((data) => {
        if (data) {
          dispatch(authActions.login())
          history("/user");
        }
      });
    } else {
      alert("Enter the values in the fields")
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width={300}
          marginLeft="auto"
          marginRight="auto"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h3">Login</Typography>
          <TextField
            value={inputs.email}
            type="emali"
            variant="outlined"
            name="email"
            placeholder="email"
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            value={inputs.password}
            type="password"
            variant="outlined"
            name="password"
            placeholder="password"
            margin="normal"
            onChange={handleChange}
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
