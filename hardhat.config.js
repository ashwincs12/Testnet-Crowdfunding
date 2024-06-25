require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const GORELI_URL=process.env.GORELI_URL;
const HOLESKY_URL=process.env.HOLESKY_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.24",
  networks:
  {
    amoy:{
      url:GORELI_URL,
      accounts:[PRIVATE_KEY]
    },
    holesky:{
      url:HOLESKY_URL,
      accounts:[PRIVATE_KEY]
    }
  }
};
