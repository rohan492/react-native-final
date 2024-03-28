import React, { useState, useEffect } from "react";
import { View, Dimensions } from "react-native";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

import axios from "axios";

import RowComponent from "./components/RowComponent/RowComponent";

import { defaultData, averageStyle } from './utils/Constants.js';

const App = () => {
  const [selectedSource, setSelectedSource] = useState("Test");
  const [data, setData] = useState(defaultData);
  const [totalVal, setTotalVal] = useState(358);

  // Single State to Handle Average of both rows
  const [averageValue, setAverageValue] = useState({
    firstRow: 64.53,
    secondRow: 26.82,
  });

  // Function that gets triggered whenever Source is changed
  // Sets data to be either "Test Data" OR "Server Data"
  // Additionally, calculates the total score of the batsman against all countries in order to calculate the average value
  const fetchData = async () => {
    let totalValue = 0;

    // Since setData function takes some time to update state of "data"
    // used a variable array, in order to prevent the use of multiple useEffect functions
    let resultArr = [];

    // Toggle "data" array to be used based on Source
    if (selectedSource === "Server") {
      // Used "axios" library for convenience
      const response = await axios.get(
        "https://assessments.reliscore.com/api/cric-scores/"
      );
      resultArr = response?.data; // resultArr is [] if no value is returned by server
    } else {
      resultArr = defaultData;
    }
    setData(resultArr);

    // Calculate total score of batsman against all countries
    resultArr.map(([country, score]) => {
      totalValue += score;
    });
    setTotalVal(totalValue);
  };

  useEffect(() => {
    fetchData();
  }, [selectedSource]);

  // Handler function for input value change
  // Takes 2 arguments => text(The actual text entered in the input box) & view(Text entered in first OR second input box)
  // Calculates the average value of valid country entered & multiplies it by 100 to get a percentage value
  // Percentage value is taken since average was in the range [0, 1] which made the blue horizontal bar's width very small
  const handleTextChange = (text, view) => {
    let sumOfVal = 0;

    data.map(([countryData, score]) => {
      // Increased score for selective scores, will return 0 if no valid country entered
      if (text !== undefined && countryData === text.trim()) {
        sumOfVal += score;
      }
    });
    let avgVal = (sumOfVal / totalVal) * 100;

    // Rounding off to 2 decimal points for better user experience
    avgVal = parseFloat(avgVal.toFixed(2));

    // Based on view (firstRow OR secondRow), the average value gets updated
    setAverageValue((prevVal) => ({
      ...prevVal,
      [view]: avgVal,
    }));
  };

  // ----> Responsive Design Handling Starts <----
  const [flexDirectionStyle, setFlexDirectionStyle] = useState({
    flexDirection: "column",
  });

  useEffect(() => {
    // Function to change Flexbox configurations based on screen size
    // For narrow screens, contents of each row are stacked on one another
    // For wide screens, contents of each row are placed horizontally in one line
    const handleScreenResize = () => {
      const { width: screenWidth } = Dimensions.get("window");
      if (screenWidth >= 600) {
        setFlexDirectionStyle({ flexDirection: "row", alignItems: "center" });
      } else {
        setFlexDirectionStyle({ flexDirection: "column" });
      }
    };

    Dimensions.addEventListener("change", handleScreenResize);
    
    // May cause issue if you change anything. Please refresh to get back to original view
    return () => {
      Dimensions.removeEventListener("change", handleScreenResize);
    };
  }, []);
  // ----> Responsive Design Handling Ends <----

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <RadioButtonGroup
        containerStyle={{
          marginBottom: 30,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
        selected={selectedSource}
        onSelected={(value) => setSelectedSource(value)}
        radioBackground="blue"
      >
        <RadioButtonItem value="Test" label="Test Data" />
        <RadioButtonItem
          value="Server"
          label="Server Data"
          style={{ marginLeft: 20 }}
        />
      </RadioButtonGroup>

      <RowComponent
        flexDirectionStyle={flexDirectionStyle}
        averageValue={averageValue}
        averageStyle={averageStyle}
        handleTextChange={handleTextChange}
        defaultValue={"Pakistan"}
        rowNumber={"firstRow"}
      />

      <RowComponent
        flexDirectionStyle={flexDirectionStyle}
        averageValue={averageValue}
        averageStyle={averageStyle}
        handleTextChange={handleTextChange}
        defaultValue={"India"}
        rowNumber={"secondRow"}
      />
    </View>
  );
};

export default App;
