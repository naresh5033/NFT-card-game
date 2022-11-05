import React from "react";
import { PageHOC } from "../components/PageHoc";
const Home = () => {
  return <div>Home</div>;
};

export default PageHOC(
  Home,
  <>
    Welcome to Avax Gods <br /> a Web3 NFT Card Game
  </>,
  <>
    Connect your wallet to start playing <br /> the ultimate Web3 Battle Card
    Game
  </>
);
