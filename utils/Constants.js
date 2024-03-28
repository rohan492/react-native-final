const defaultData = [
  ["Pakistan", 23],
  ["Pakistan", 127],
  ["India", 3],
  ["India", 71],
  ["Australia", 31],
  ["India", 22],
  ["Pakistan", 81],
];

// Function that takes in 2 * average value (calculated as percentage value) and assigns width accordingly
const averageStyle = (doubleOfAvgValue) => {
  return {
    width: doubleOfAvgValue,
    height: 10,
    backgroundColor: "blue",
    marginLeft: 20,
  };
};

export { defaultData, averageStyle };
