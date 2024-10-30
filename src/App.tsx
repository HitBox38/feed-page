import { AppBar } from "./components/AppBar";
import "./App.css";
import { Feed } from "./components/Feed";

function App() {
  return (
    <div className="app">
      <AppBar />
      <Feed />
    </div>
  );
}

export default App;
