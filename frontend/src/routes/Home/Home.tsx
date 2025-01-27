import { Book } from "../../components/home-coponents/Book/Book";
import { Header } from "../../components/home-coponents/Header/Header";
import { RecentlyViewed } from "../../components/home-coponents/recently-viewed/RecentlyViewed";
export const Home = () => {
  return (
    <div>
      <Header />
      <Book />
      <RecentlyViewed />
    </div>
  );
};
