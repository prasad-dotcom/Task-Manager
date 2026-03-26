import React from "react";
import AuthCard from "../components/AuthCard.jsx";

const Signup = ({ onSwitch, onAuth }) => {
  return (
    <AuthCard mode="signup" onSwitch={onSwitch} onAuth={onAuth} />
  );
};

export default Signup;

