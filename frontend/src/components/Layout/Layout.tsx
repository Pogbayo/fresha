import { ReactNode } from "react";
import { Header } from "../home-coponents/Header/Header";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout-container">
      <Header />
      <main className="layout-content">{children}</main>
    </div>
  );
};

export default Layout;
