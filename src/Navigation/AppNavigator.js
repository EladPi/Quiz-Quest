import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/Home";
import CategoryScreen from '../Screens/Category.js';
import DifficultyScreen from "../Screens/Difficulty.js";
import NumOfQuestionsScreen from "../Screens/NumOfQuestions.js";
import TypeScreen from "../Screens/Type.js";
import GameScreen from "../Screens/Game.js";
import ResultsScreen from "../Screens/QuizResults.js";
import SeeSummaryScreen from "../Screens/SeeSummary.js";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false, cardOverlayEnabled:true,  }} >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="Difficulty" component={DifficultyScreen} />
        <Stack.Screen name="Type" component={TypeScreen} />
        <Stack.Screen name="NumOfQuestions" component={NumOfQuestionsScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
        <Stack.Screen name="SeeSummary" component={SeeSummaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;




/*
Primary Color: Teal (#008080) 
Secondary Color: Coral (#FF7F50)
Accent Color: Mint Green (#3EB489)
Background: Off White (#FAFAFA)
Text: Charcoal Black (#303030)
*/