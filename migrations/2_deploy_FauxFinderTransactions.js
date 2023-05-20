const FauxFinderTransactions = artifacts.require("FauxFinderTransactions");

module.exports = function(deployer) {
  deployer.deploy(FauxFinderTransactions);
};
