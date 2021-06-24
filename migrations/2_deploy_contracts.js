
var Contracts = artifacts.require("./Delottery.sol");

module.exports = function(deployer) {
  deployer.deploy(Contracts);
};
