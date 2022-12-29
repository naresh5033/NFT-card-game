## NFT Card game

This is a simple nft card game project, i ve used Hardhat for the Smart contract part and for the front end vite.js was used.

## Deployed Dapp

The wallet used in this one is core wallet and so we can find the priv key in their site --> wallet.avax.network.\

`yarn hh run scripts/deploy.js --network fuji`

The SC was deployed in the Avalanche (Fuji chain) testnet and the deployed addr is "0xbD248e34551ccC809aB2467D0645543F3C74C707"

## Instructions on setting up the Web3 part of the project

0. `cd web3`
1. `npx hardhat` -> y → typescript → enter → enter
2. `npm install @openzeppelin/contracts dotenv @nomiclabs/hardhat-ethers` + Hardhat packages `npm install --save-dev "hardhat@^2.12.0" "@nomicfoundation/hardhat-toolbox@^2.0.0"`
3. Install [Core](https://chrome.google.com/webstore/detail/core/agoakfejjabomempkjlepdflaleeobhb), a Metamask smart wallet alternative built for Avalanche dApps
4. Turn on the testnet mode by: opening up the Core extension -> click the hamburger menu on the top left -> go to advanced -> turn on the testnet mode
5. Fund your wallet from the [Avax Faucet](https://faucet.avax.network/)
6. Create a `.env` file and specify a PRIVATE_KEY variable.
7. To get to the private key, do the following steps:
8. Open up the Core extension -> click the hamburger menu on the top left -> go to security and privacy -> click show recovery phase -> enter your password -> copy the phrase -> go to [wallet.avax.network](https://wallet.avax.network/) -> click access wallet -> choose mnemonic key phrase -> paste what the words we’ve copied from Core -> on the sidebar click manage keys -> view c-chain private key -> copy -> paste it in the .env file
9. Copy the `hardhat.config.ts` file from the GitHub gist down in the description
10. Copy the `deploy.ts` script from the GitHub gist down in the description
11. Copy the `AvaxGods.sol` smart contract code from the GitHub gist down in the description
12. Compile the contract by running the `npx hardhat compile` command
13. Deploy the smart contract on the Fuji test network by running the `npx hardhat run scripts/deploy.ts --network fuji` command
    Move the `/artifacts/contracts/AVAXGods.json` file to the `/contract` folder on the frontend
    Copy the address of the deployed contract from the terminal and paste it into the `/contract/index.js` file of the frontend application

## Sound Effects

For the evnts and the player move whether its defence or attack i ve included the special sound effects, similarly if the player gets damaged he will get a sparkle effects.

## About the Game

Its a multiplayer card game, in order to play one has to login with his wallet and once the player logged in he can ve an option to create a battle or he can join already created battle.\

If he wants to create a battle he has to pay for the tx, and he has to wait until the opponent joins the battle.\

while he's waiting for the oppenent to join the game, he ve an option to choose between the battle fields (currently there are 4).\

Once he find the opponent the game starts.\

## Game Rule

The players can either choose to attack or defence on each move and at a time only one player can make a move and the player 2 has to wait for the opponent to complete his move.\

For each move attack/defense is a transaction and the player has to approve for that tx in order to make a move.\

If both of the players make a attack move we can see a explosion effect on both of the card. if they make a defense move then we can hear the shield sound w/o any animation.\

And for each player they've health bar and mana (stat), for each round the mana will decrease. In order to regenerate their mana they ve to defend

The player can make a attack only based on his attack value in his card for ex- if he has 9 attack pts left in his card then he can make a attack worth of 9 pts, based on the attack pts left in the opponent he may either loose health bar or defend in the round.\

The values(attack points) are not visible to the opponents except the current player,

when the healthbar is too low and the attack pts of the player 1 is also low and each of them decides to attack each other but the player 2 has more attack pt, then the player 2 can win the battle since he has more attack pts left.\

Once the battle is ended the players are redirected to the home page and they can start a new battle.

Game Rules:
1. Card with the same defense and attack point will cancel each other out.

2. Attack points from the attacking card will deduct the opposing player’s health points.

3. If P1 does not defend, their health wil be deducted by P2’s attack.

4. If P1 defends, P2’s attack is equal to P2’s attack - P1’s defense.

5. If a player defends, they refill 3 Mana

6. If a player attacks, they spend 3 Mana
7. 

## Deployed site

The dapp has been deployed in netlify and the url is - "https://scintillating-chimera-0b7932.netlify.app"
