"use client"
import { useActionState } from "react";
import { Button } from "./button";
import {deleteMovieReview} from "../lib/actions";

interface Props {
   id: string;
  }

export function DeleteButtonMovie(
{id}:Props
) {
     const [errorMessage, formAction] = useActionState(deleteMovieReview, undefined);
  return (

    <form action={formAction} className="items-center" >
        <Button type="submit" className="mt-4 hover:bg-red-800 border-2 border-[#1a0010] bg-red-600 w-80px">
          Delete
        </Button>
        <input name="id" defaultValue={id} hidden />
    </form>
   
  );
}