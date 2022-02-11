import React from "react";
import { useWeb3React } from "@web3-react/core";
import Avatar from "boring-avatars";

import MMLogo from "../../static/metamask-logo.svg";
import { injected } from "../../connectors";
import { shortenAddress } from "../../utils/shortenAddress";
import styles from "./NavigationControls.module.scss";

const NavigationControls = () => {
  const { activate, active, account } = useWeb3React();

  if (active) {
    return (
      <div className={styles.userProfile}>
        <p className={styles.username}>{shortenAddress(account)}</p>
        <Avatar
          size={30}
          name={account}
          variant="marble"
          colors={["#aaaaaa", "#0e2430", "#242424", "#48636f", "#e6e6e6"]}
        />
      </div>
    );
  }

  return (
    <button className={styles.connectButton} onClick={() => activate(injected)}>
      <img className={styles.metamaskLogo} src={MMLogo} alt="Metamask Logo" />
      Connect
    </button>
  );
};

export default NavigationControls;
