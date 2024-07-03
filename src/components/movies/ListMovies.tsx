"use client";
import MoviesApi from "@/apis/movies/moviesapi";
import { useQuery } from "@tanstack/react-query";
import { SwiperSlide, Swiper } from "swiper/react";
import React from "react";
import MovieItems from "./MovieItems";
interface ListMoviesProps {
  type: string;
}
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
const ListMovies = (props: ListMoviesProps) => {
  const { getListMovies } = MoviesApi();
  const { data: listMovies } = useQuery({
    queryKey: [props.type],
    queryFn: () =>
      getListMovies({}, props.type).then((res) => {
        return (res.results as Array<ListMovies>) || [];
      }),
  });
  return (
    <div className=" ">
      <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
        {listMovies?.map((item) => (
          <SwiperSlide key={item.id} style={{ width: "300px", height: "auto" }}>
            <MovieItems item={item}></MovieItems>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ListMovies;
