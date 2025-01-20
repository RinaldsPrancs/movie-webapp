import { fetchShowByUser } from "../lib/data";
import { DeleteButton } from "./delete-btn";

export default async function showReviewList() {
  const reviews = await fetchShowByUser();

  return (
    <div className="space-y-4 p-4 bg-black rounded-md overflow-auto h-full max-h-[700px]">
      {reviews?.map((review) => (
        <div
          key={review.id}
          className="space-y-4 p-4 bg-[#191b1f] rounded-md overflow-auto"
        >
          <div className="grid grid-cols-2">
            <div>
              <span className="mr-4">{review.show_name}</span>
              <br></br>
              <span>Rating: {review.rating}</span>
            </div>
            <div className=" flex justify-end items-center">
              <DeleteButton id={review.id}/>
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
