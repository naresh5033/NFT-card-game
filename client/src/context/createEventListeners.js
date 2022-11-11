import { ethers } from "ethers";

import { ABI } from "../contract";
import { playAudio, sparcle } from "../utils/animation.js";
import { defenseSound } from "../assets";

const AddNewEvent = (eventFilter, provider, cb) => {
  // b4 add a new event, remove the old ones, so that won't be multiple listener for same event
  provider.removeListener(eventFilter);

  provider.on(eventFilter, (logs) => {
    const parsedLog = new ethers.utils.Interface(ABI).parseLog(logs);

    cb(parsedLog);
  });
};

//* Get battle card coordinates
const getCoords = (cardRef) => {
  //to show the animation for the corresponding card
  const { left, top, width, height } = cardRef.current.getBoundingClientRect(); //this fn will give us the h,w,t,l props of the div

  return {
    pageX: left + width / 2,
    pageY: top + height / 2.25,
  };
};

const emptyAccount = "0x0000000000000000000000000000000000000000";

export const createEventListeners = ({
  navigate,
  contract,
  provider,
  walletAddress,
  setShowAlert,
  player1Ref,
  player2Ref,
  setUpdateGameData,
}) => {
  const NewPlayerEventFilter = contract.filters.NewPlayer();
  AddNewEvent(NewPlayerEventFilter, provider, ({ args }) => {
    console.log("New player created!", args);

    if (walletAddress === args.owner) {
      setShowAlert({
        status: true,
        type: "success",
        message: "Player has been successfully registered",
      });
    }
  });

  const NewBattleEventFilter = contract.filters.NewBattle();
  AddNewEvent(NewBattleEventFilter, provider, ({ args }) => {
    console.log("New battle started!", args, walletAddress);
    //make sure the player addr is either 1 or 2, then we ve to navigate them to battleground
    if (
      walletAddress.toLowerCase() === args.player1.toLowerCase() ||
      walletAddress.toLowerCase() === args.player2.toLowerCase()
    ) {
      navigate(`/battle/${args.battleName}`);
    }

    setUpdateGameData((prevUpdateGameData) => prevUpdateGameData + 1);
  });

  const NewGameTokenEventFilter = contract.filters.NewGameToken();
  AddNewEvent(NewGameTokenEventFilter, provider, ({ args }) => {
    console.log("New game token created!", args.owner);
    // means the acc that we're connected to the acc we created the token for
    if (walletAddress.toLowerCase() === args.owner.toLowerCase()) {
      setShowAlert({
        status: true,
        type: "success",
        message: "Player game token has been successfully generated",
      });

      navigate("/create-battle"); // once the player is registered and the game token then nav him here
    }
  });

  const BattleMoveEventFilter = contract.filters.BattleMove();
  AddNewEvent(BattleMoveEventFilter, provider, ({ args }) => {
    console.log("Battle move initiated!", args);
  });

  const RoundEndedEventFilter = contract.filters.RoundEnded();
  AddNewEvent(RoundEndedEventFilter, provider, ({ args }) => {
    console.log("Round ended!", args, walletAddress);

    for (let i = 0; i < args.damagedPlayers.length; i += 1) {
      if (args.damagedPlayers[i] !== emptyAccount) {
        //means someone's got damaged
        if (args.damagedPlayers[i] === walletAddress) {
          sparcle(getCoords(player1Ref));
        } else if (args.damagedPlayers[i] !== walletAddress) {
          sparcle(getCoords(player2Ref));
        }
      } else {
        playAudio(defenseSound); //means nobody got damaged
      }
    }
    //increment the prev value +1
    setUpdateGameData((prevUpdateGameData) => prevUpdateGameData + 1);
  });

  // Battle Ended event listener
  const BattleEndedEventFilter = contract.filters.BattleEnded();
  AddNewEvent(BattleEndedEventFilter, provider, ({ args }) => {
    if (walletAddress.toLowerCase() === args.winner.toLowerCase()) {
      setShowAlert({ status: true, type: "success", message: "You won!" });
    } else if (walletAddress.toLowerCase() === args.loser.toLowerCase()) {
      setShowAlert({ status: true, type: "failure", message: "You lost!" });
    }

    navigate("/create-battle");
  });
};
