import { fetchShowById } from "../lib/data";

export default async function showReviewList({ id }: { id: string }) {
  const reviews = await fetchShowById(id);

  return (
    <div className="space-y-4 p-4 bg-[#191b1f] rounded-md overflow-auto h-full max-h-[calc(100vh-180px)]">
  {reviews?.map((review) => (
    <div
      key={review.id}
      className="bg-black border border-[#66FCF1] p-2 rounded overflow-hidden"
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
