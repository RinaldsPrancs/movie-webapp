import { fetchMovieByUser } from "../lib/data";
import { DeleteButtonMovie } from "./delete-btn-movie";

export default async function showReviewList() {
  const reviews = await fetchMovieByUser();

  return (
    <div className="space-y-4 p-4 bg-black rounded-md overflow-auto h-full max-h-[700px]">
      {reviews?.map((review) => (
        <div
          key={review.id}
          className="bg-green-600 p-2 rounded overflow-hidden"
        >
          <div className="grid grid-cols-2">
            <div>
              <span className="mr-4">{review.movie_name}</span>
              <br></br>
              <span>Rating: {review.rating}</span>
            </div>
            <div className=" flex justify-end items-center">
              <DeleteButtonMovie id={review.id}/>
            </div>
          </div>
          <div className="break-words whitespace-normal">
            {review.rating_text}
          </div>
        </div>
      ))}
    </div>
  );
}