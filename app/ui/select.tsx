"use client";
import { useActionState } from "react";
import { fetchShowByID, submitReview } from "@/app/lib/actions";
import { Button } from "@/app/ui/button";
import { KeyboardEvent } from "react";


export default function SubmitForm(id: { id: string }) {
  const [errorMessage, formAction] = useActionState(submitReview, undefined);


  const handleKeyDown = (e: KeyboardEvent) => {
    const isTextArea = e.target instanceof HTMLTextAreaElement;
    if (e.key === "Enter" && !isTextArea) {
      e.preventDefault();
    }
  };

  return (
    <form
      action={formAction}
      className="bg-black h-[55%] rounded-md p-4 gap-4 space-y-4"
      onKeyDown={handleKeyDown}
    >
      <input name="id" defaultValue={id.id} hidden />
     
      <div className="flex h-[10%] items-center grid grid-cols-2">
        <div className="flex justify-center ">
          <label className="mr-3">Rate from (1-10):</label>
          <select
            name="selectedOption"
            className="text-black"
            defaultValue={5}
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <div className="flex justify-center">
          <label className="mr-3 ">Stay anonymous?</label>

          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            name="check"
          />
        </div>
      </div>

      <div className="bg-gray-200 w-full p-6 rounded-md flex flex-col items-center justify-center h-[70%]">
        <div className="text-black h-[10%]">Please write a review:</div>
        <div className="text-black h-[90%]">
          <textarea
            id="inputField"
            name="text"
            className="text-black h-full w-full p-2 resize-none"
            maxLength={900}
            rows={10}
            cols={90}
            required
          />
        </div>
      </div>
      <div className=" h-[10%]">
        <Button type="submit" className="mt-4 w-full justify-center">
          Submit review
        </Button>
        {errorMessage && (
          <>
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
}
