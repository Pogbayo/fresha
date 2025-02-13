import { ApiProvider } from "../contextAPi/ApiResponseContext/ApiContext";
import { AppProvider } from "../contextAPi/AppContextApi/AppContext";
import { Primary } from "../routes/Primary/Primary";
import { Secondary } from "../routes/Secondary/Secondary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Utility } from "../routes/Utility/Utility";
import { SelectService } from "../components/utility-components/utilityBody/services/selectService/SelectService";
import { Profile } from "../routes/Profile/Profile";
import { Auth } from "../routes/Auth/Auth";
import styles from "./Big.module.css";
import { AuthProvider } from "../contextAPi/Auth/AuthContext";
const Big = () => {
  return (
    <div className={styles.container}>
      <Router>
        <AppProvider>
          <ApiProvider>
            <AuthProvider>
              <Routes>
                <Route path={"/"} element={<Primary />} />
                <Route path={"secondary"} element={<Secondary />} />
                <Route path={"utility"} element={<Utility />} />
                <Route path={"select"} element={<SelectService />} />
                <Route path={"profile"} element={<Profile />} />
                <Route path={"auth"} element={<Auth />} />
              </Routes>
            </AuthProvider>
          </ApiProvider>
        </AppProvider>
      </Router>
    </div>
  );
};
export default Big;
