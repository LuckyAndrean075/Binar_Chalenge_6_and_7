import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import Input from "../components/input/Input";
import { OutlineButton } from "../components/button/Button";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import EmailIcon from "@mui/icons-material/Email";
import { register } from "../redux/actions/Auth";
import { useDispatch, useSelector } from "react-redux";

function Register() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const onSubmit = (e) => {
    // e.preventDefault();

    const data = { email, password, name, confirmPassword };

    dispatch(register(data, navigate));
  };

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
      <Typography
        variant="h5"
        fontWeight={600}
        textAlign="center"
        marginBottom="1rem"
      >
        Sign Up
      </Typography>
      <div
        className="login"
        style={{ marginBottom: "1rem", width: "100%", maxWidth: "600px" }}
      >
        <Input
          type="text"
          placeholder="Enter Name"
          name="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div style={{ position: "relative", flexShrink: 0 }}>
          <IconButton>
            <PersonIcon className="icon" />
          </IconButton>
        </div>
      </div>
      <div
        className="login"
        style={{ marginBottom: "1rem", width: "100%", maxWidth: "600px" }}
      >
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div style={{ position: "relative", flexShrink: 0 }}>
          <IconButton>
            <EmailIcon className="icon" />
          </IconButton>
        </div>
      </div>
      <div
        className="login"
        style={{ marginBottom: "1rem", width: "100%", maxWidth: "600px" }}
      >
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div style={{ position: "relative", flexShrink: 0 }}>
          <IconButton>
            <KeyIcon className="icon" />
          </IconButton>
        </div>
      </div>

      <div
        className="login"
        style={{ marginBottom: "1rem", width: "100%", maxWidth: "600px" }}
      >
        <Input
          type="password"
          placeholder="Confirm Password"
          name="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <div style={{ position: "relative", flexShrink: 0 }}>
          <IconButton>
            <KeyIcon className="icon" />
          </IconButton>
        </div>
      </div>
      {error && (
        <div style={{ fontSize: "18px", color: "#ff0000" }}>{error}</div>
      )}

      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <OutlineButton onClick={onSubmit} className="outlineBtnsSmall">
          Sign Up
        </OutlineButton>
      </div>
    </Box>
  );
}

export default Register;
