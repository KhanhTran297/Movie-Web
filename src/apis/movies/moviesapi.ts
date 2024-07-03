import useCallApi from "@/hooks/useCallApi";

function MoviesApi() {
  const { UseDelete, UseGet } = useCallApi();
  const getListMovies = (params: object, kind: string) => {
    const url = `/movie/${kind}`;

    return UseGet<any>({ url, params });
  };
  const getListAllMovies = (params: object) => {
    const url = `/discover/movie`;
    return UseGet<any>({ url, params });
  };
  const getDetailMovie = (params: object, id: string) => {
    const url = `/movie/${id}`;
    return UseGet<any>({ url, params });
  };
  const getListMovieCredits = (params: object, id: string) => {
    const url = `/movie/${id}/credits`;
    return UseGet<any>({ url, params });
  };
  const getVideoMovie = (params: object, id: string) => {
    const url = `/movie/${id}/videos`;
    return UseGet<any>({ url, params });
  };
  const getSimilarMovies = (params: object, id: string) => {
    const url = `/movie/${id}/similar`;
    return UseGet<any>({ url, params });
  };
  const searchMovies = (params: object) => {
    const url = `/search/movie`;
    return UseGet<any>({ url, params });
  };
  return {
    getListMovies,
    getListAllMovies,
    getDetailMovie,
    getListMovieCredits,
    getVideoMovie,
    getSimilarMovies,
    searchMovies,
  };
}
export default MoviesApi;
