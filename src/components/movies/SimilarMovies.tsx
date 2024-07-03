import MoviesApi from "@/apis/movies/moviesapi";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieItems from "./MovieItems";
interface ListMovies {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
interface SimilarMoviesProps {
  movieId: string;
}
const SimilarMovies = (props: SimilarMoviesProps) => {
  const { getSimilarMovies } = MoviesApi();
  const { data: listSimilarMovie } = useQuery({
    queryKey: ["similarMovies", props.movieId],
    queryFn: () =>
      getSimilarMovies({}, props.movieId).then((res) => {
        return (res.results as Array<ListMovies>) || [];
      }),
  });
  return (
    <div className="py-10">
      <h2 className="text-center text-3xl mb-10 font-bold text-white">
        Similar Movie
      </h2>
      <div className="movie-list">
        <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
          {listSimilarMovie !== undefined &&
            listSimilarMovie?.map((movie) => (
              <SwiperSlide
                key={movie.id}
                style={{ width: "300px", height: "auto" }}
              >
                <MovieItems item={movie}></MovieItems>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SimilarMovies;
