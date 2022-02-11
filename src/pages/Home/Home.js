import React from "react";
import { useWeb3React } from "@web3-react/core";
import styles from "./Home.module.scss";
import { StoreContract } from "../../static/contracts/StoreContract";

const Home = () => {
  const { active, account } = useWeb3React();


  if (!active) {
    return (
      <div className={styles.wrapperFlex}>
        <p>Welcome to the Crypto Wallet App.</p>
        <p>Please connect with your Metamask to continue.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <p>Hello there 👋</p>
      <p>You are currently connected with this account:<br/><span className={styles.address}>{account}</span></p>
    </div>
  );
};

export default Home;
