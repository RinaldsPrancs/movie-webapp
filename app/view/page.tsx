import { signOut  } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export default function viewPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <div>
        viewing stuff!
        
      </div>
      <div>
      <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
            <button>
                <div>
                    Sign out
                </div>
            </button>
      </form>
      </div>
      </main>
      
    </div>
  );
}
