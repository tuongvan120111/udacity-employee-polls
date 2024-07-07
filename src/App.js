import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes ";
import React from "react";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <PrivateRoutes></PrivateRoutes>
      </div>
    </Provider>
  );
}

export default App;
