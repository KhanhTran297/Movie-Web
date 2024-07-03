import MoviesApi from "@/apis/movies/moviesapi";
import { useQuery } from "@tanstack/react-query";
import React from "react";
interface MovieVideosProps {
  movieId: string;
}
interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: true;
  published_at: string;
  id: string;
}
const MovieVideos = (props: MovieVideosProps) => {
  const { getVideoMovie } = MoviesApi();
  const { data: listMovieVideos } = useQuery({
    queryKey: ["movieVideos", props.movieId],
    queryFn: () =>
      getVideoMovie({}, props.movieId).then((res) => {
        return res.results as Array<Video>;
      }),
  });
  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        {listMovieVideos?.slice(0, 2).map((movieVideo) => (
          <div key={movieVideo.id} className="">
            {" "}
            <h2 className="text-center text-3xl mb-10 font-bold text-white">
              {movieVideo.name}
            </h2>
            <div key={movieVideo.id} className="w-full aspect-video">
              <iframe
                width="971"
                height="546"
                src={`https://www.youtube.com/embed/${movieVideo.key}`}
                title={`${movieVideo.name}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen={true}
                className="w-full h-full object-fill"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieVideos;
