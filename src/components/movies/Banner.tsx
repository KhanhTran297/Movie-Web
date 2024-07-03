"use client";
import MoviesApi from "@/apis/movies/moviesapi";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";

import Image from "next/legacy/image";
import { useRouter } from "next/navigation";
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

const Banner = () => {
  const { getListMovies } = MoviesApi();
  const router = useRouter();
  const { data: ListMovies } = useQuery({
    queryKey: ["now_playing"],
    queryFn: () =>
      getListMovies({}, "now_playing").then((res) => {
        return (res.results as Array<ListMovies>) || [];
      }),
  });

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      grabCursor={true}
    >
      {ListMovies?.map((movie) => {
        return (
          <SwiperSlide key={movie.id}>
            <div className="relative  h-[700px] max-w-[1280px] mx-auto rounded-xl">
              <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt=""
                layout="fill"
                // height={700}
                // width={1280}
                // style={{ width: "100%" }}
                objectFit="cover"
                className=" object-center rounded-xl"
              ></Image>
              <div className="absolute w-full text-white left-5 bottom-5">
                <h2 className="mb-5 text-3xl font-bold">{movie.title}</h2>

                <div className="flex items-center mb-8 gap-x-3">
                  <h3 className="text-xl font-bold text-white ">Score</h3>
                  <span className="px-4 py-2 border border-white rounded-md">
                    {movie.vote_average}
                  </span>
                </div>
                <button
                  onClick={() => router.push(`/movies/${movie.id}`)}
                  className="px-6 py-3 font-medium text-white rounded-lg bg-primary "
                >
                  Watch now
                </button>
              </div>
            </div>
            {/* <Image
              src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
              alt={movies.title}
              width={500}
              height={500}
            /> */}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Banner;
