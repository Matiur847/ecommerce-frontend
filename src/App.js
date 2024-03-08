import "./App.css";
import Layout from "./components/Layout/Layout";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="bg-color">
      <Layout />
      <ToastContainer />
    </div>
  );
}

export default App;
