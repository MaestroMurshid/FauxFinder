const Migrations = artifacts.require("FauxFinderTransactions");

module.exports = function(deployer) {
  deployer.deploy(FauxFinderTransactions);
};
