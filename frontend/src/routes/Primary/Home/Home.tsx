import { Available } from "../../../components/HomeComponents/Available/Available";
import { Book } from "../../../components/HomeComponents/Book/Book";
import { Footer } from "../../../components/HomeComponents/Footer/Footer";
import { FFB } from "../../../components/HomeComponents/fresha-for-business/FFB";
import { RecentlyViewed } from "../../../components/HomeComponents/recently-viewed/RecentlyViewed";
import { Recommended } from "../../../components/HomeComponents/Recommended/Recommended";
import { Review } from "../../../components/HomeComponents/Reviews/Review";
import { TopRated } from "../../../components/HomeComponents/Top-rated/TopRated";
import { Trending } from "../../../components/HomeComponents/Trending/Trending";
import { New } from "../../../components/HomeComponents/New-To-Spag/New";
import styles from "./Home.module.css";
import { Favourite } from "../../../components/HomeComponents/favourites/Favourite";

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
