import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-viem";
import "@nomicfoundation/hardhat-ignition";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24", // must satisfy pragma
  },
};

export default config;
