


export default async function showReviewPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    // displayo movie details (poster, name,  year, tddb rating, other site ratings,?actors, ?genre)
// vajag funkciju kas padod id lai atrastu no datubazes citus reviewus
// session
// user differention
    return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <div>
        review current id {id}
      </div>
      
      </main>
      
    </div>
  );
}