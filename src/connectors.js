import { InjectedConnector } from "@web3-react/injected-connector";

export const ChainId = {
  Mainnet: 1,
  Ropsten: 3,
  Rinkeby: 4,
  Goerli: 5,
  Kovan: 42,
  Localhost: 1337,
  Mumbai: 80001,
};

export const NetworkName = {
  1: "Mainnet",
  80001: "Mumbai",
};

export const injected = new InjectedConnector({ supportedChainIds: [ChainId.Mainnet] });
