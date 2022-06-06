import React from "react";
import { useSelector } from "react-redux";
import { Tabs, Tab } from "react-bootstrap";
import Spinner from "./Spinner";
import {
  myFilledOrdersLoadedSelector,
  myFilledOrdersSelector,
  myOpenOrdersLoadedSelector,
  myOpenOrdersSelector,
} from "../store/selectors";

const MyTransactions = () => {
  const myFilledOrders = useSelector(myFilledOrdersSelector);
  const showMyFilledOrders = useSelector(myFilledOrdersLoadedSelector);
  const myOpenOrders = useSelector(myOpenOrdersSelector);
  const showMyOpenOrders = useSelector(myOpenOrdersLoadedSelector);

  console.log({
    myFilledOrders,
    showMyFilledOrders,
    myOpenOrders,
    showMyOpenOrders,
  });

  const handleShowMyFilledOrders = (myFilledOrders) => {
    return(
      <tbody>
        { myFilledOrders.map((order) => {
          return (
            <tr key={order.id}>
              <td className="text-muted">{order.formattedTimestamp}</td>
              <td className={`text-${order.orderTypeClass}`}>{order.orderSign}{order.tokenAmount}</td>
              <td className={`text-${order.orderTypeClass}`}>{order.tokenPrice}</td>
            </tr>
          )
        }) }
      </tbody>
    )
  }
  
  const handleShowMyOpenOrders = (myOpenOrders) => {
    return(
      <tbody>
        { myOpenOrders.map((order) => {
          return (
            <tr key={order.id}>
              <td className={`text-${order.orderTypeClass}`}>{order.tokenAmount}</td>
              <td className={`text-${order.orderTypeClass}`}>{order.tokenPrice}</td>
              <td className="text-muted">x</td>
            </tr>
          )
        }) }
      </tbody>
    )
  }

  return (
    <div className="card bg-dark text-white">
      <div className="card-header">My Transactions</div>
      <div className="card-body">
        <Tabs defaultActiveKey="trades" className="bg-dark text-white">
          <Tab eventKey="trades" title="Trades" className="bg-dark">
            <table className="table table-dark table-sm small">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>DIBA</th>
                  <th>DIBA/ETH</th>
                </tr>
              </thead>
              { showMyFilledOrders ? handleShowMyFilledOrders(myFilledOrders) : <Spinner type="table" /> }
            </table>
          </Tab>
          <Tab eventKey="orders" title="Orders">
            <table className="table table-dark table-sm small">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>DIBA/ETH</th>
                  <th>Cancel</th>
                </tr>
              </thead>
              { showMyOpenOrders ? handleShowMyOpenOrders(myOpenOrders) : <Spinner type="table" /> }
            </table>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default MyTransactions;
