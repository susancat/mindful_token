const nft = artifacts.require("MindfulOcean");

module.exports = async function (deployer) {
 await deployer.deploy(nft);
};