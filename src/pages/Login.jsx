import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import Input from "../components/input/Input";
import { OutlineButton } from "../components/button/Button";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";

import { useDispatch, useSelector } from "react-redux";
import { login, loginGoogle } from "../redux/actions/Auth";
import { useGoogleLogin } from "@react-oauth/google";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const data = { access_token: tokenResponse.access_token };
      dispatch(loginGoogle(data, navigate));
      console.log(tokenResponse);
    },
  });

  const onSubmit = (e) => {
    const data = { email, password };
    dispatch(login(data, navigate));
  };

  const { error } = useSelector((state) => state.auth);
  const { succes } = useSelector((state) => state.auth);

  return (
    <Box
      sx={{
        backgroundColor: "#0f0f0f",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {succes && (
        <div
          style={{
            width: "58vw",
            display: "flex",
            justifyContent: "flex-start",
            color: "green",
          }}
        >
          {succes}, Please Login!!
        </div>
      )}

      <Typography
        variant="h5"
        fontWeight={600}
        textAlign="center"
        marginBottom="1rem"
      >
        Login
      </Typography>

      <div
        className="login"
        style={{
          marginBottom: "1rem",
          width: "100%",
          maxWidth: "600px", // Lebar maksimum untuk perangkat mobile
        }}
      >
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%" }}
        />
        <div style={{ position: "relative", flexShrink: 0 }}>
          <IconButton>
            <PersonIcon className="icon" />
          </IconButton>
        </div>
      </div>

      <div
        className="login"
        style={{
          marginBottom: "1rem",
          width: "100%",
          maxWidth: "600px", // Lebar maksimum untuk perangkat mobile
        }}
      >
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%" }}
        />
        <div style={{ position: "relative", flexShrink: 0 }}>
          <IconButton>
            <KeyIcon className="icon" />
          </IconButton>
        </div>
      </div>

      {error && <div>{error}</div>}
      <div
        style={{
          width: "100%",
          maxWidth: "600px", // Lebar maksimum untuk perangkat mobile
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <OutlineButton onClick={onSubmit} className="outlineBtnsSmall">
          Login
        </OutlineButton>
        <OutlineButton
          className="outlineBtnsLogin"
          onClick={() => googleLogin()}
        >
          Google
        </OutlineButton>
      </div>
    </Box>
  );
}

export default Login;
