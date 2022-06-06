import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import "./App.css";
import {
  loadWeb3,
  loadAccount,
  loadToken,
  loadExchange
} from "../store/interactions";
import Navbar from "./Navbar";
import Content from './Content'
import { contractsLoadedSelector } from'../store/selectors';

function App() {
  const dispatch = useDispatch();
  const contractsLoaded = useSelector(contractsLoadedSelector);

  useEffect(() => {
    loadBlockchainData(dispatch);
  });

  const loadBlockchainData = async (dispacth) => {
    const web3 = await loadWeb3(dispatch);
    await web3.eth.net.getNetworkType();
    const networkId = await web3.eth.net.getId();
    await loadAccount(web3, dispacth);
    const token = await loadToken(web3, networkId, dispacth);
    if(!token) {
      window.alert('Token smart contract not detected on the current network. Please select another network with Metamask.');
    }
    const exchange = loadExchange(web3, networkId, dispacth);
    if(!exchange) {
      window.alert('exchange smart contract not detected on the current network. Please select another network with Metamask.');
    }
  };

  return (
    <div>
      <Navbar />
      {contractsLoaded ? <Content /> : <div className="content"></div>}
    </div>
  );
}

export default App;
