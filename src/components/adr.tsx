import { useEffect, useState } from "react";

import { IP_SEAN } from "../utils/constants";
import Radar from "./ui/radar";

const Adr = () => {
  const [angle, setAngle] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [points, setPoints] = useState<{ distance: number; angle: number }[]>(
    []
  );
  const maxDistance = 300; // max radar distance

  useEffect(() => {
    const fetchAngleAndDistance = async () => {
      try {
        const response = await fetch(IP_SEAN);
        const text = await response.text().then((t) => t.trim());
        // console.log(text);
        const numbers = text.match(/[\d.]+/g);
        // console.log(numbers);
        if (numbers) {
          const newAngle = parseFloat(numbers[0]);
          console.log(newAngle);
          let newDistance = parseFloat(numbers[1]);
          console.log(newDistance);
          setAngle(newAngle);

          if (newDistance === 0) newDistance = 300; // sensor max range

          setDistance(newDistance);
          setPoints([{ distance: newDistance, angle: newAngle }]);
        }
      } catch (error) {
        console.error("Failed to fetch angle and distance:", error);
      }
    };

    const angleDistanceInterval = setInterval(fetchAngleAndDistance, 1000);

    return () => {
      clearInterval(angleDistanceInterval);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className="text-white font-semibold drop-shadow-[0_0_4px_#fcf139]">
          Angle (°)
        </h1>
        <h3 className="text-white font-medium">
          {angle !== null ? angle : "Loading..."}
        </h3>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className="text-white font-semibold drop-shadow-[0_0_4px_#fcf139]">
          Distance (cm)
        </h1>
        <h3 className="text-white font-medium">
          {distance !== null ? distance : "Loading..."}
        </h3>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className="text-white font-semibold drop-shadow-[0_0_4px_#fcf139]">
          Live Radar
        </h1>
        <Radar points={points} maxDistance={maxDistance} />
        <article className="text-white font-medium flex flex-col text-center">
          {angle !== null && distance !== null ? (
            <p>
              Movement spotted {distance} cm from the sensor at an angle of{" "}
              {angle}° with the diameter (right to left).
            </p>
          ) : (
            <p>Loading...</p>
          )}
        </article>
      </div>
    </>
  );
};

export default Adr;
