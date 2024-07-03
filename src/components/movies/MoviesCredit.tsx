"use client";
import MoviesApi from "@/apis/movies/moviesapi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
interface MovieCreditprops {
  movieId: string;
}
interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}
const MoviesCredit = (props: MovieCreditprops) => {
  const { getListMovieCredits } = MoviesApi();
  const { data: listCast } = useQuery({
    queryKey: ["movieCredit", props.movieId],
    queryFn: () =>
      getListMovieCredits({}, props.movieId).then((res) => {
        return (res.cast as Array<Cast>) || [];
      }),
  });
  console.log(listCast);
  return (
    <div>
      <h2 className="text-center text-3xl mb-10 font-bold text-white ">
        Casts
      </h2>
      <div className=" max-w-full ">
        <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
          {listCast !== undefined &&
            listCast?.map((cast) => {
              return (
                <SwiperSlide
                  key={cast.id}
                  style={{ width: "300px", height: "auto" }}
                >
                  <div className="cast-item hover:opacity-50">
                    <Image
                      src={`https://image.tmdb.org/t/p/original/${cast?.profile_path}`}
                      className="w-full h-[350px] rounded-lg object-cover mb-3"
                      // style={{ height: "350px", width: "100%" }}
                      height={350}
                      width={300}
                      alt=""
                    />
                    <h2 className="text-center text-white text-xl font-medium">
                      {cast?.name}
                    </h2>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
        {/* {listCast?.slice(0, 4).map((item) => (
          <div className="cast-item" key={item.id}>
            <Image
              src={`https://image.tmdb.org/t/p/original/${item?.profile_path}`}
              className="w-full h-[350px] rounded-lg object-cover mb-3"
              // style={{ height: "350px", width: "100%" }}
              height={350}
              width={300}
              alt=""
            />
            <h2 className="text-center text-white text-xl font-medium">
              {item.name}
            </h2>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default MoviesCredit;
