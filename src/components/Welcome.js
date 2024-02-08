import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

let firstRender = true;

const Welcome = ({ isloggedIn }) => {
  const navigate = useNavigate();

  const [user, setuser] = useState({});

  const refreshToken = async () => {
    const res = await axios("https://mern-authentication-using-jwt.onrender.com/api/refresh", {
      withCredentials: true,
    }).catch((error) => {
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

  const getuserDetails = async () => {
    const res = await axios("https://mern-authentication-using-jwt.onrender.com/api/user", {
      withCredentials: true,
    }).catch((error) => {
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

  useEffect(() => {
    let interval;

    // Check is the user loggedin. If loggedIn, create token refresh every 30s else redirect
    if (!isloggedIn) {
      navigate("/login");
    } else {
      if (firstRender) {
        getuserDetails().then((data) => {
          setuser(data);
          firstRender = false;
        });
      }

      interval = setInterval(() => {
        refreshToken().then((data) => {
          setuser(data);
        });
      }, 28 * 1000);
    }

    return () => clearInterval(interval);
  }, [navigate, isloggedIn]);

  return <div>{user ? <h1 style={{textAlign: "center"}}>Hello {user.name}</h1> : <h4>Error in getting the user data. Please Refresh the page</h4>}</div>;
};

export default Welcome;
