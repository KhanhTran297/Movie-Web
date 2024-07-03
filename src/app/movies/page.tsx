"use client";
import MoviesApi from "@/apis/movies/moviesapi";
import MovieItems from "@/components/movies/MovieItems";
import useDebounce from "@/hooks/useDebunce";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
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
const MoviesPage = () => {
  const { getListAllMovies, searchMovies } = MoviesApi();
  const [ListAllMovies, setListAllMovies] = useState<Array<ListMovies>>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const queryClient = useQueryClient();
  const handleSearch = (value: string) => {
    setSearch(value);
  };
  const searchParams = useDebounce(search, 500);
  const { data } = useQuery({
    queryKey: ["listAllMovies"],
    queryFn: () =>
      getListAllMovies({ page: page }).then((res) => {
        console.log(res.results);
        setListAllMovies(res.results);
        return (res.results as Array<ListMovies>) || [];
      }),
    enabled: true,
  });
  const { data: SearchMovies } = useQuery({
    queryKey: ["SearchMovies", searchParams, page],
    queryFn: () =>
      searchMovies({ query: searchParams, page: page }).then((res) => {
        if (searchParams == "") {
          queryClient.invalidateQueries({ queryKey: ["listAllMovies"] });
        } else {
          // queryClient.setQueryData(["listAllMovies"], res.results);
          setListAllMovies(res.results);
        }

        return (res.results as Array<ListMovies>) || [];
      }),
    retry: false,
  });
  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  console.log(ListAllMovies);
  return (
    <div className="py-10 max-w-[1280px] mx-auto">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-slate-800 text-white outline-none"
            placeholder="Type here to search..."
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <button className="p-4 bg-primary text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {/* {loading && (
        <div className="text-white w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
      )} */}

      <div className="">
        <div className="grid xl:grid-cols-4 grid-cols-1  gap-10">
          {ListAllMovies &&
            ListAllMovies.map((movie) => (
              <MovieItems key={movie.id} item={movie}></MovieItems>
            ))}
        </div>
      </div>
      <div className="mt-10 w-full flex flex-row items-center justify-center gap-2 xl:gap-4">
        <button
          className={`${
            page === 1 ? "bg-pink-700 " : "bg-primary"
          } w-24 text-white p-2 rounded-lg`}
          onClick={() => handlePrevPage()}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="w-24 text-white bg-primary p-2 rounded-lg"
          onClick={() => handleNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MoviesPage;
