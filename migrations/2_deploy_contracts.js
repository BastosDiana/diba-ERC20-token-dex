const Token = artifacts.require("Token");
const Exchange = artifacts.require("Exchange");

module.exports = async function (deployer) {
  // Using web3 to get accounts - will be an array with all accounts provided by ganache
  const accounts = await web3.eth.getAccounts();

  await deployer.deploy(Token);

  const feeAccount = accounts[0];
  const feePercent = 10;

  await deployer.deploy(Exchange, feeAccount, feePercent);
};
