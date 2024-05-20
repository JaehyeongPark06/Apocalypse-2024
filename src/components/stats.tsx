import { useEffect, useState } from "react";

import Adr from "./adr";
import { IP_ALEX } from "../utils/constants";

const Stats = () => {
  const [zombiesCaptured, setZombiesCaptured] = useState<number>(0);

  useEffect(() => {
    const updateZombieCount = async () => {
      try {
        const response = await fetch(IP_ALEX);
        const text = await response.text().then((t) => t.trim());
        const numbers = text.match(/[\d.]+/g);
        let zombieCaptured;

        if (numbers) {
          zombieCaptured = parseInt(numbers[2]);
          // console.log(zombieCaptured);
        }

        if (zombieCaptured) {
          setZombiesCaptured((zombies) => zombies + 1);
          setTimeout(updateZombieCount, 20000);
        } else {
          setTimeout(updateZombieCount, 1000);
        }
      } catch (error) {
        console.error("Failed to fetch zombie status:", error);
      }
    };

    updateZombieCount();
  }, []);

  return (
    <div className="shadow-md p-6 bg-gradient-to-t from-[#1a1030] to-[#1e0151] rounded-md gap-4 flex flex-col w-full max-w-barbod-xl min-w-0">
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className="text-white font-semibold drop-shadow-[0_0_4px_#fcf139]">
          Zombies Captured
        </h1>
        <h3 className="text-white font-medium">{zombiesCaptured}</h3>
      </div>
      <Adr />
    </div>
  );
};

export default Stats;
