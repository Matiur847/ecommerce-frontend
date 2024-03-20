import { useEffect } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { ToastContainer } from "react-toastify";
import { getUserDetails } from "./store/userSlice/userSlice";
import store from "./store/store";
import AdminRoute from "./routes/adminRoute/AdminRoute";

function App() {
  useEffect(() => {
    store.dispatch(getUserDetails());
  }, []);

  return (
    <div className="bg-color">
      <Layout />
      <ToastContainer />
    </div>
  );
}

export default App;
