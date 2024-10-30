import React from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Hero_banner from "../../assets/Queen.webp";
import Hero_title from "../../assets/queen_title.png";
import Play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <img src={Hero_banner} alt="" className="banner-img" />

        <div className="hero-caption">
          <img src={Hero_title} alt="" className="caption-img" />
          <p>
            Set during the Cold War era, orphaned chess prodigy Beth Harmon
            struggles with addiction in a quest to become the greatest chess
            player in the world.
          </p>

          <div className="hero-btns">
            <button className="btn">
              <img src={Play_icon} alt="" />
              Play
            </button>
            <button className="btn dark-btn">
              <img src={info_icon} alt="" />
              More Info
            </button>
          </div>

          <TitleCards />
        </div>
      </div>

      <div className="more-cards">
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
        <TitleCards title={"Only on Netflix"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Top Picks for You"} category={"now_playing"} />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
