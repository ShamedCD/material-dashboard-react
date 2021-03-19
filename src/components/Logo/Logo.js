import React from "react";
import logo from "../../assets/img/domain/imss_real.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="logo-container">
      <img className="logo-component" src={logo} alt="Logo" />
    </div>
  );
};

export default Logo;
