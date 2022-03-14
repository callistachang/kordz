const KordzToken = artifacts.require("KordzToken");
const KordzMarketplace = artifacts.require("KordzMarketplace");

module.exports = async function (deployer) {
  await deployer.deploy(KordzToken);
  const token = await KordzToken.deployed();
  await deployer.deploy(KordzMarketplace, token.address);
  const market = await KordzMarketplace.deployed();
  await token.setMarketplace(market.address);
};
