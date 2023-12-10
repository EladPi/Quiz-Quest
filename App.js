import AppNavigator from "./src/Navigation/AppNavigator";
import { Provider } from "react-redux";
import { store } from "./src/Redux/store";

const App = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);


export default App;