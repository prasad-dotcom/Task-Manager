import React from "react";
import AuthCard from "../components/AuthCard.jsx";

const Login = ({ onSwitch, onAuth }) => {
  return (
    <AuthCard mode="login" onSwitch={onSwitch} onAuth={onAuth} />
  );
};

export default Login;

