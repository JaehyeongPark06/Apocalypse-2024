import React, { useEffect, useState } from "react";

import { fetchData } from "../utils/network";

const DataDisplay: React.FC = () => {
  const [data, setData] = useState<string>("Loading...");

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return (
    <div className="p-4 bg-blue-100 rounded-lg">
      <h1 className="text-lg font-bold">ESP32 Data</h1>
      <p>{data}</p>
    </div>
  );
};

export default DataDisplay;
