import ShowByID from "@/app/ui/view/show-id";
import SubmitForm from "@/app/ui/select";
import ShowReviews from "@/app/ui/show-reviews";

export default async function showReviewPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;

  return (
    <div className="grid grid-cols-2 gap-4 h-[calc(100vh-80px)] bg-white p-4">
      {/* Left Column */}
      <div className="flex flex-col space-y-4 h-full">
        {/* Box 1 about */}
        <div className="bg-black p-4 rounded-md h-[45%]">
          <ShowByID id={id} />
        </div>

        {/* Box 2 */}

        <SubmitForm id={id} />
      </div>

      {/* Right Column */}
      <div className="flex flex-col space-y-4 h-full">
        <div className="bg-black p-4 rounded-md h-[10%] text-white justify-center items-center font-bold flex">
          Reviews
        </div>

        <div className="bg-black p-4 rounded-md h-[90%]">
        <ShowReviews id={id}/>
        </div>
        
      </div>
    </div>
  );
}
