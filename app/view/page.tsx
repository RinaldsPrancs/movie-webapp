import ShowReviews from "@/app/ui/show-user-form";
import MovieReviews from "@/app/ui/movie-user-form";
export default async function viewPage() {
  return (
    <div className="h-full p-4">
      <div className="h-[10%] font-bold items-center flex text-[36px] justify-center">
        MY REVIEWS
      </div>
      <div className="h-[90%] grid grid-cols-2 gap-4 p-4">
        <div>
          <div className="h-[7%] font-bold  text-[28px] items-center flex justify-center">
            Movies
          </div>
          <div className="h-[93%]">
            <MovieReviews />
          </div>
        </div>
        <div>
          <div className="h-[7%] font-bold text-[28px] items-center flex justify-center">
            TV - Shows
          </div>
          <div className="h-[93%]">
            <ShowReviews />
          </div>
        </div>
      </div>
    </div>
  );
}
