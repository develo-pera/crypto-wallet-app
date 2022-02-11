import React from "react";

import styles from "./UnsupportedNetwork.module.scss";
import { ChainId } from "../../connectors";

const UnsupportedNetwork = () => {
  const handleChangeNetwork = async () => {
    if (window == null) {
      return;
    }

    await window?.ethereum?.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${ChainId.Mainnet.toString(16)}` }],
    });
  };

  return (
    <div className={styles.container}>
      <p>Unsupported network!</p>
      <p className={styles.note}>
        Please switch to <strong>Mainnet</strong> network in order to use this app.
      </p>
      <button onClick={handleChangeNetwork}>Switch to Mainnet</button>
    </div>
  );
};

export default UnsupportedNetwork;
