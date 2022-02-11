import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { formatEther, formatUnits } from "@ethersproject/units";

import styles from "./Home.module.scss";
import { StoreContract } from "../../static/contracts/StoreContract";
import { NetworkName } from "../../connectors";
import { useContract } from "../../hooks/useContract";
import ERC20ABI from "../../static/contracts/erc20abi.json";
import NexoLogo from "../../static/nexo.svg";

const NEXO_TOKEN_ADDRESS = "0xb62132e35a6c13ee1ee0f84dc5d40bad8d815206";
// TODO: COVALENT_API_KEY set here instead of .env file because of task requirements
const COVALENT_API_KEY = "ckey_ceec2545298b40fd81eda0085a2";
const ETH_ADDRESS_ON_COVALENT = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

const Home = () => {
  const { active, account, chainId, library } = useWeb3React();
  const NexoContract = useContract(NEXO_TOKEN_ADDRESS, ERC20ABI);
  const [dataLoading, setDataLoading] = useState(true);
  const [userETHBalance, setUserETHBalance] = useState("0");
  const [userNexoBalance, setUserNexoBalance] = useState("0");
  const [userTokens, setUserTokens] = useState([]);

  const fetchData = async () => {
    setDataLoading(true);

    if (library && active && account && chainId) {
      const ethBalance = await library.getBalance(account);
      const nexoBalance = await NexoContract.balanceOf(account);

      const response = await fetch(
        `https://api.covalenthq.com/v1/${chainId}/address/${account}/balances_v2/?key=${COVALENT_API_KEY}`
      );
      const { data } = await response.json();
      const filteredToknes = data.items.filter(token =>
        token.contract_address != NEXO_TOKEN_ADDRESS &&
        token.contract_address != ETH_ADDRESS_ON_COVALENT &&
        token.contract_address != "0xefb47d73181bb6963c8113a58184525355287573" &&
        token.balance > 0
      );

      console.log(filteredToknes)

      setUserETHBalance(formatEther(ethBalance));
      setUserNexoBalance(formatEther(nexoBalance));
      setUserTokens(filteredToknes);
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
      <p className={styles.accountText}><span className={styles.address}>{account}</span></p>
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

      <div className={styles.otherTokens}>
        <p className={styles.title}>Other tokens</p>
          {
            dataLoading ?
              <p>Loading...</p> :
              (
                userTokens &&
                  userTokens.length > 0 ?
                  (
                    <div className={styles.tokensList}>
                      {
                        userTokens.map((token, index) => (
                          <div key={index} className={styles.tokenCard}>
                            <p className={styles.darkText}>{token.contract_name}</p>
                            <p className={styles.compactText}>Symbol: {token.contract_ticker_symbol}</p>
                            <p className={styles.compactText}>Decimals: {token.contract_decimals}</p>
                            <p className={styles.tokenCardBalance}>Balance: {formatUnits(token.balance, token.contract_decimals)}</p>
                          </div>
                        ))
                      }
                    </div>
                  ) : (
                    <p>This user doesn't have other tokens</p>
                  )
              )
          }
      </div>
    </div>
  );
};

export default Home;
