import MovieByID from "@/app/ui/view/movie-id";
import SubmitFormMovie from "@/app/ui/select-movie";
import MovieReviews from "@/app/ui/movie-reviews";

export default async function showReviewMoviePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;

  return (
    <div className="grid grid-cols-2 gap-4 h-[calc(100vh-80px)]  bg-[#0B0C10] p-4">
      {/* Left Column */}
      <div className="flex flex-col space-y-4 h-full">
        {/* Box 1 about */}
        <div className="bg-[#191b1f] p-4 rounded-md h-[45%]">
          <MovieByID id={id} />
        </div>

        {/* Box 2 */}

        <SubmitFormMovie id={id} />
      </div>

      {/* Right Column */}
      <div className="flex flex-col space-y-4 h-full">
        <div className="bg-[#191b1f] p-4 rounded-md h-[5%] text-white justify-center items-center font-bold flex">
          Reviews
        </div>

        {/* <div className="bg-black p-4 h-[95%] rounded-md"> */}
        <MovieReviews id={id}/>
        {/* </div> */}
        
      </div>
    </div>
  );
}
