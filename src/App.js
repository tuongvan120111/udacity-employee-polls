import "./App.css";
import { Outlet } from "react-router-dom";
import Headers from "./components/Headers/Headers";
import { Content } from "antd/es/layout/layout";

function App() {
  return (
    <Content className="App">
      <Headers>
        <Outlet />
      </Headers>
    </Content>
  );
}

export default App;
