import React from "react";
import NavigationControls from "../NavigationControls/NavigationControls";

import styles from "./Header.modules.scss";

const Header = ({ metamaskLoading }) => {
  return (
    <nav className={styles.navigation}>
      <p className={styles.logo}>Crypto Wallet App</p>
      {!metamaskLoading && <NavigationControls />}
    </nav>
  );
};

export default Header;
