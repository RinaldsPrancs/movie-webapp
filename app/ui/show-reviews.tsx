import { fetchShowById } from "../lib/data";

export default async function showReviewList({ id }: { id: string }) {
  const reviews = await fetchShowById(id);

  return (
    <div className="space-y-4">
      {reviews?.map((review) => (
        <div key={review.id} className="h-full bg-green-600">
          <div>
            {review.anonymous == "yes" ? "Anonymous" : review.username} Rated:{" "}
            {review.rating}
          </div>
          <div className="w-full break-words whitespace-normal">
            {review.rating_text}

          </div>
        </div>
      ))}
    </div>
  );
}
