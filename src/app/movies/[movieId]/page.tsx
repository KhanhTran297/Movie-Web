"use client";
import MoviesApi from "@/apis/movies/moviesapi";
import MovieVideos from "@/components/movies/MovieVideos";
import MoviesCredit from "@/components/movies/MoviesCredit";
import SimilarMovies from "@/components/movies/SimilarMovies";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
interface Genres {
  id: number;
  name: string;
}
interface MovideDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: Array<Genres>;
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: Array<string>;
  original_language: string;
  original_title: string;
  popularity: 4806.719;
  overview: string;
  poster_path: string;
  production_companies: Array<{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
const MovieDetailPage = ({ params }: { params: { movieId: string } }) => {
  const { getDetailMovie } = MoviesApi();
  const { data: movieDetail } = useQuery({
    queryKey: ["movieDetail", params.movieId],
    queryFn: () =>
      getDetailMovie({}, params.movieId).then((res) => {
        return res as MovideDetail;
      }),
  });

  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="h-full w-full bg-cover bg-no-repeat "
          style={{
            backgroundImage: `url(
        https://image.tmdb.org/t/p/original/${movieDetail?.backdrop_path}
      )`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        {movieDetail?.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/original/${movieDetail?.poster_path}`}
            alt=""
            className="w-full h-full object-cover rounded-xl"
            height={400}
            width={800}
          />
        )}
      </div>
      <h1 className="text-center text-4xl font-bold text-white mb-10">
        {movieDetail?.title}
      </h1>
      {movieDetail?.genres.length !== undefined && (
        <div className="flex item-center gap-x-5 justify-center mb-10">
          {movieDetail?.genres.map((item) => (
            <span
              key={item.id}
              className="py-2 px-4 border-primary text-primary border rounded"
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center text-white leading-relaxed max-w-[650px] mx-auto mb-10">
        {movieDetail?.overview}
      </p>
      <MoviesCredit movieId={params.movieId} />
      <MovieVideos movieId={params.movieId} />
      <SimilarMovies movieId={params.movieId} />
    </div>
  );
};

export default MovieDetailPage;
