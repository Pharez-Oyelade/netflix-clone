import React, { useEffect, useRef, useState } from "react";
import "./TvShows.css";
import Navbar from "../../components/Navbar/Navbar";

const TvShows = () => {
  const [page, setPage] = useState(1);
  const [apiData, setApiData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const SlideInterval = useRef(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzNhNzMzMTVmZGNiYzIxYmRkNzEzNTY4YmM5NzBhMyIsIm5iZiI6MTczMDA1NjkxNy44MTE4MSwic3ViIjoiNjcxZTkwZGIzNGMwZmFiZDY4MWQwNDc5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ZQICBMuNRRXFqdpPB-iCEZFdWaLxVCBLSW31UvORSJE",
    },
  };

  // Handle Next and Previous page
  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () =>
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));

  const heroMovie = apiData[0];

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  //Auto-slide
  useEffect(() => {
    SlideInterval.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(SlideInterval.current);
  }, [currentSlide]);

  //Move to next slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 4 ? 0 : prevSlide + 1)); //5 slides, wrap around
  };

  //Move to previous
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? 4 : prevSlide - 1)); //wrap around last slide
  };

  return (
    <div className="tv-shows">
      <Navbar />
      <div className="carousel-container">
        {apiData.slice(0, 5).map((movie, index) => (
          <div
            key={movie.id}
            className={`carousel-slide ${
              index === currentSlide ? "active" : ""
            }`}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
            }}
          >
            <div className="slide-content">
              <h1>{movie.name}</h1>
              <p>{movie.overview}</p>
            </div>
          </div>
        ))}
        <button onClick={prevSlide} className="prev-btn">
          ❮
        </button>
        <button onClick={nextSlide} className="next-btn">
          ❯
        </button>
      </div>

      <div className="list-card">
        <ul>
          {apiData.map((card, index) => {
            return (
              <li className="tv-list" key={index}>
                <img
                  src={`https://image.tmdb.org/t/p/w500` + card.poster_path}
                  alt=""
                />
                <p>{card.original_name}</p>
              </li>
            );
          })}
        </ul>

        <div className="page-buttons">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="prev-page"
          >
            <span className="caret-left">❮</span> Previous
          </button>
          <span> Page {page} </span>
          <button onClick={handleNextPage} className="next-page">
            Next <span>❯</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TvShows;
