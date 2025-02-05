import Layout from "./components/Layout/Layout";
import { ApiProvider } from "./contextAPi/ApiResponseContext/ApiContext";
import { AppProvider } from "./contextAPi/AppContextApi/AppContext";
import { Categories } from "./routes/Categroies-page/Categories";
import { Home } from "./routes/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <Router>
        <AppProvider>
          <ApiProvider>
            <Routes>
              <Route
                path={"/"}
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
              <Route path={"categories"} element={<Categories />} />
            </Routes>
          </ApiProvider>
        </AppProvider>
      </Router>
    </div>
  );
};

export default App;
