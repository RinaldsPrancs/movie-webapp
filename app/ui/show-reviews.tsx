import { fetchShowById } from "../lib/data";

export default async function showReviewList({ id }: { id: string }) {
  const reviews = await fetchShowById(id);

  return (
    <div className="space-y-4 p-4 bg-black rounded-md overflow-auto h-full max-h-[calc(100vh-180px)]">
  {reviews?.map((review) => (
    <div
      key={review.id}
      className="bg-green-600 p-2 rounded overflow-hidden"
    >
      <div>
        {review.anonymous === "yes" ? "Anonymous" : review.username} Rated:{" "}
        {review.rating}
      </div>
      <div className="break-words whitespace-normal">
        {review.rating_text}
      </div>
    </div>
  ))}
</div>
  );
}
