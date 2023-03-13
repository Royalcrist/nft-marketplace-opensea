import * as Web3 from "web3";
import { OpenSeaSDK, Network } from "opensea-js";

// This example provider won't let you make transactions, only read-only calls:
const provider = new Web3.default.providers.HttpProvider(
  `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`
);

export const openseaSDK = new OpenSeaSDK(provider, {
  networkName: Network.Main,
  apiKey: process.env.NEXT_PUBLIC_OPENSEA_API_KEY,
});
