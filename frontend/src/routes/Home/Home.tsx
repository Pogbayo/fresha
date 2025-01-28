import { Available } from "../../components/home-coponents/Available/Available";
import { Book } from "../../components/home-coponents/Book/Book";
import { FFB } from "../../components/home-coponents/fresha-for-business/FFB";
import { Header } from "../../components/home-coponents/Header/Header";
import { RecentlyViewed } from "../../components/home-coponents/recently-viewed/RecentlyViewed";
import { Recommended } from "../../components/home-coponents/Recommended/Recommended";
import { Review } from "../../components/home-coponents/Reviews/Review";
import { TopRated } from "../../components/home-coponents/Top-rated/TopRated";
import { Trending } from "../../components/home-coponents/Trending/Trending";
import { New } from "../../components/New-To-Spag/New";
export const Home = () => {
  return (
    <div>
      <Header />
      <Book />
      <RecentlyViewed />
      <Recommended />
      <New />
      <Trending />
      <Available />
      <Review />
      <TopRated />
      <FFB />
    </div>
  );
};
