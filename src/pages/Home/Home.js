import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "@ethersproject/units";

import styles from "./Home.module.scss";
import { StoreContract } from "../../static/contracts/StoreContract";
import { NetworkName } from "../../connectors";
import { useContract } from "../../hooks/useContract";
import ERC20ABI from "../../static/contracts/erc20abi.json";
import NexoLogo from "../../static/nexo.svg";

const NEXO_TOKEN_ADDRESS = "0xb62132e35a6c13ee1ee0f84dc5d40bad8d815206";

const Home = () => {
  const { active, account, chainId, library } = useWeb3React();
  const NexoContract = useContract(NEXO_TOKEN_ADDRESS, ERC20ABI);
  const [dataLoading, setDataLoading] = useState(true);
  const [userETHBalance, setUserETHBalance] = useState("0");
  const [userNexoBalance, setUserNexoBalance] = useState("0");

  const fetchData = async () => {
    setDataLoading(true);

    if (library && active && account) {
      const ethBalance = await library.getBalance(account);
      const nexoBalance = await NexoContract.balanceOf(account);

      setUserETHBalance(formatEther(ethBalance));
      setUserNexoBalance(formatEther(nexoBalance))
    }

    setDataLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [account, chainId]);

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
      <p className={styles.compactText}>You are currently connected with this account:</p>
      <p className={styles.address}>{account}</p>
      <p className={styles.compactText}>Network: <span className={styles.darkText}>{NetworkName[chainId]}</span></p>
      <p className={styles.compactText}>ChainId: <span className={styles.darkText}>{chainId}</span></p>

      <p>Total Native balance: <span className={styles.darkText}>{dataLoading ? "Loading..." : userETHBalance}</span></p>
      <div className={styles.card}>
        <div className={styles.nexoContent}>
          <div className={styles.nexoData}>
            <p className={styles.title}>Total Nexo balance:</p>
            <p className={styles.nexoBalanceValue}>{dataLoading ? "Loading..." : userNexoBalance}</p>
          </div>
          <img src={NexoLogo} alt="Nexo Logo"/>
        </div>
      </div>
    </div>
  );
};

export default Home;
