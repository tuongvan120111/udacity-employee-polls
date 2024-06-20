import "./App.css";
import { Content } from "antd/es/layout/layout";
import { Provider } from "react-redux";
import { store } from "./store/store";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes ";

function App() {
  return (
    <Provider store={store}>
      <Content className="App">
        <PrivateRoutes></PrivateRoutes>
      </Content>
    </Provider>
  );
}

export default App;
