import { ApiProvider } from "../contextAPi/ApiResponseContext/ApiContext";
import { AppProvider } from "../contextAPi/AppContextApi/AppContext";
import { Primary } from "../routes/Primary/Primary";
import { Secondary } from "../routes/Secondary/Secondary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Utility } from "../routes/Utility/Utility";

const Big = () => {
  return (
    <div>
      <Router>
        <AppProvider>
          <ApiProvider>
            <Routes>
              <Route path={"/"} element={<Primary />} />
              <Route path={"secondary"} element={<Secondary />} />
              <Route path={"utility"} element={<Utility />} />
            </Routes>
          </ApiProvider>
        </AppProvider>
      </Router>
    </div>
  );
};
export default Big;
