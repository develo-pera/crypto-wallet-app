import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { Route } from "react-router-dom";
import "./styles/App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layouts/Layout";
import Home from "./pages/Home/Home";


function getLibrary(provider) {
  return new ethers.providers.Web3Provider(provider);
}

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Layout>
        <Route exact path="/" component={Home} />
      </Layout>
      <ToastContainer />
    </Web3ReactProvider>
  );
};

export default App;
