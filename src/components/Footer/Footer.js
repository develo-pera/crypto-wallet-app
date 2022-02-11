import React from "react";

import styles from "./Footer.modules.scss";

const Footer = () => (
  <div className={styles.footer}>
    &copy; Crypto Wallet App | Made by{" "}
    <a
      href="https://github.com/develo-pera/"
      target="_blank"
      rel="noopener noreferrer"
    >
      @developera
    </a>
  </div>
);

export default Footer;
