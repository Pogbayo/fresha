import Layout from "./components/Layout/Layout";
import { ApiProvider } from "./contextAPi/ApiResponseContext/ApiContext";
import { AppProvider } from "./contextAPi/AppContextApi/AppContext";
import { Home } from "./routes/Home/Home";

function App() {
  return (
    <div className="app">
      <AppProvider>
        <ApiProvider>
          <Layout>
            <Home />
          </Layout>
        </ApiProvider>
      </AppProvider>
    </div>
  );
}

export default App;
