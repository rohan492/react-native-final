#README

## Description
This React Native application is designed to display data dynamically based on user selection and input. It features dynamic data binding, automatic update of values, and responsive design.

### Dynamic Data Binding
The application allows the user to select a data source (either "Test" or "Server") using radio buttons. When "Test Data" is selected, the application displays predefined data stored locally. When "Server Data" is selected, the application fetches data from a remote server endpoint (`https://assessments.reliscore.com/api/cric-scores/`).

### Automatic Update of Values
The application automatically updates the displayed data values based on user interactions. When the user starts typing the name of a country in the input field, the application dynamically updates the average and the blue bar based on the selected country's data. If the user inputs a country name that matches one of the countries in the data, the application displays the corresponding average and blue bar. If the input country is incomplete or does not match any country in the data, the application displays a dash (-) for the average and hides the blue bar.

### Responsive Design
The application's layout is designed to be responsive, adapting to different screen sizes. For wide screens, the country name, average, and blue bar components appear next to each other in a single row. For narrow screens, they appear one under the other to ensure optimal display and usability across various devices.

## Status
- **Dynamic Data Binding**: Implemented
- **Automatic Update of Values**: Implemented
- **Responsive Design**: Implemented

## Usage
1. Download the zip file to your local machine & unzip it.
2. Install dependencies using `npm install` or `yarn install`.
3. Run the application using `npm start` or `yarn start`.
4. Open the application on an emulator or device to interact with it.

## Dependencies
- axios (Installed from my end to fetch data from server)
- expo
- expo-radio-button (Installed from my end to display Radio Group to select source)
- expo-splash-screen
- react
- react-native

## Assumptions Made
1. The average value displayed is actually the percentage value (average value multiplied by 100). This assumption was made for a better user experience. The average value, which is (sum / total) is in the range [0, 1] which made the width of blue bar very small.
2. To display the width of blue bar, screenWidth was used in the original version of the app. I changed it to [2 * percentage value of score of the batsman]. This assumption was made because multplying average (even without converting to percentage value) to screenWidth made width of blue bar bigger than the screenWidth.

## Areas of Improvement
1. Currently, the average value does not change immediately when Source is toggled. Toggle the source & change the input value in any one of the input boxes to get the actual average based on Source selected.
2. There is no border around text area. Handling alignment of all the other components was taking time. Please click on the country name to edit the same.
3. I used inline styles for faster development. Could have used external Stylesheet if more time was given.
4. Styling is very basic since most of my focus was on handling dynamic data updates. 

## Important Note
- Changing any code from your end might throw error due to the eventListener added for Responsive design. Please refresh the app if you encounter any error.
