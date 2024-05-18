export const fetchData = async (): Promise<string> => {
  try {
    const response = await fetch("http://10.93.88.177/");
    if (!response.ok) {
      throw new Error("Didn't connect");
    }
    const data = await response.text();
    return data;
  } catch (error) {
    console.error("Failed to fetch data: ", error);
    return "Failed to load data";
  }
};
