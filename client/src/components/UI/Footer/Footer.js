import React from "react";
import classes from "./Footer.module.css";
const Footer = () => {
  return (
    <>
      <footer className={`${classes.Spacer} ${classes.Layer1}`}>
        <div className={classes.FootNotes}>
          <h2>Experience more together</h2>
          <h5>2021 © Sumant. All rights reserved.</h5>
        </div>
      </footer>
    </>
  );
};

export default Footer;
