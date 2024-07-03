import Header from "@/components/Header";
import Banner from "@/components/movies/Banner";
import ListMovies from "@/components/movies/ListMovies";

export default function Home() {
  return (
    <div className="  flex flex-col gap-8 mt-3 mx-auto">
      <div className="">
        <Banner />
      </div>

      <div className="flex flex-col gap-3 max-w-[1280px] mx-auto ">
        <p className=" capitalize text-white  text-3xl font-bold">Popular</p>
        <ListMovies type="popular" />
      </div>
      <div className="flex flex-col gap-3 max-w-[1280px] mx-auto ">
        <p className=" capitalize text-white  text-3xl font-bold">Top Rated</p>
        <ListMovies type="top_rated" />
      </div>
      <div className="flex flex-col gap-3 max-w-[1280px] mx-auto ">
        <p className=" capitalize text-white  text-3xl font-bold">Upcoming</p>
        <ListMovies type="upcoming" />
      </div>
    </div>
  );
}
