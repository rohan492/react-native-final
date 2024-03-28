import { Text, View, TextInput } from "react-native";

// Component that renders a row where each row has:
// 1. "The Country" along with an input field to enter the country
// 2. "The Average" along with the calculated average rounded off to 2 decimal places
// 3. Blue Bar whose width is 2 * average(calculated as percentage value)

const RowComponent = ({
  flexDirectionStyle,
  averageValue,
  averageStyle,
  handleTextChange,
  defaultValue,
  rowNumber,
}) => {
  return (
    <View style={flexDirectionStyle}>
      <View style={{ flexDirection: "row", marginLeft: 20 }}>
        <Text style={{ marginTop: 4, marginRight: 8 }}>The Country:</Text>
        <TextInput
          defaultValue={defaultValue}
          onChangeText={(text) => handleTextChange(text, rowNumber)}
        />
      </View>

      <Text style={{ marginLeft: 20 }}>
        The Average:{" "}
        {averageValue[rowNumber] === 0 ? "-" : averageValue[rowNumber]}
      </Text>

      <View
        style={
          averageValue[rowNumber] !== 0
            ? averageStyle(averageValue[rowNumber] * 2)
            : { height: 10 }
        }
      ></View>
    </View>
  );
};

export default RowComponent;
