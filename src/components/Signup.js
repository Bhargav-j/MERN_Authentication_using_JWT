import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const history = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
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
      .post("https://mern-authentication-using-jwt.onrender.com/api/signup", {
        name: inputs.name,
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
      inputs.name.trim() !== "" &&
      inputs.email.trim() !== "" &&
      inputs.password.trim() !== ""
    ) {
      sendRequest().then((data) => {
        if (data) {
          history("/login");
        }
      });
    } else {
      alert("Enter all the fields");
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
          <Typography variant="h3">Sign Up</Typography>
          <TextField
            value={inputs.name}
            variant="outlined"
            name="name"
            placeholder="name"
            margin="normal"
            onChange={handleChange}
          />
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
            Signup
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Signup;
