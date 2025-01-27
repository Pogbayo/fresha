import { AppProvider } from "./contextAPi/AppContext";
import { Home } from "./routes/Home/Home";

function App() {
  return (
    <div className="app">
      <AppProvider>
        <Home />
      </AppProvider>
    </div>
  );
}

export default App;
