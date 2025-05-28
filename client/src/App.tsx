import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [id, setId] = useLocalStorage("id");
  console.log("id", id);
  return id ? <Dashboard id={id} /> : <Login onIdSubmit={setId} />;
}

export default App;
