import { Available } from "../../../components/home-coponents/Available/Available";
import { Book } from "../../../components/home-coponents/Book/Book";
import { Footer } from "../../../components/home-coponents/Footer/Footer";
import { FFB } from "../../../components/home-coponents/fresha-for-business/FFB";
import { RecentlyViewed } from "../../../components/home-coponents/recently-viewed/RecentlyViewed";
import { Recommended } from "../../../components/home-coponents/Recommended/Recommended";
import { Review } from "../../../components/home-coponents/Reviews/Review";
import { TopRated } from "../../../components/home-coponents/Top-rated/TopRated";
import { Trending } from "../../../components/home-coponents/Trending/Trending";
import { New } from "../../../components/home-coponents/New-To-Spag/New";
import styles from "./Home.module.css";
import { Favourite } from "../../../components/home-coponents/favourites/Favourite";

export const Home = () => {
  return (
    <div className={styles.container}>
      <Book />
      <Favourite />
      <RecentlyViewed />
      <Recommended />
      <New />
      <Trending />
      <Available />
      <Review />
      <TopRated />
      <FFB />
      <Footer />
    </div>
  );
};
