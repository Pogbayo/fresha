import Layout from "../../components/Layout/Layout";

import { Home } from "./Home/Home";

export const Primary = () => {
  return (
    <div className="app">
      <Layout>
        <Home />
      </Layout>
    </div>
  );
};
