"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
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
interface MovieItemsProps {
  item: ListMovies;
}
const MovieItems = (props: MovieItemsProps) => {
  const router = useRouter();
  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
      <Image
        src={`https://image.tmdb.org/t/p/w500/${props.item.poster_path}`}
        alt=""
        className=" object-cover rounded-lg mb-5"
        height={250}
        width={200}
        style={{ width: "100%" }}
      />
      <div className="flex flex-col flex-1">
        <h3 className=" text-xl font-bold mb-3">{props.item.title}</h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-10">
          <span>{new Date(props.item.release_date).getFullYear()}</span>
          <span>{props.item.vote_average}</span>
        </div>

        <button
          onClick={() => router.push(`/movies/${props.item.id}`)}
          className="py-3 px-6 rounded-lg capitalize bg-primary w-full mt-auto"
        >
          Watch now
        </button>
      </div>
    </div>
  );
};

export default MovieItems;
