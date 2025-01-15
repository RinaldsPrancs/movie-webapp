"use client"
import { useActionState } from "react";
import { Button } from "./button";
import {deleteShowReview} from "../lib/actions";

interface Props {
   id: string;
  }

export function DeleteButton(
{id}:Props
) {
     const [errorMessage, formAction] = useActionState(deleteShowReview, undefined);
  return (

    <form action={formAction} className="items-center">
        <Button type="submit" className="mt-4 hover:bg-red-800  bg-red-600 w-80px">
          Delete
        </Button>
        <input name="id" defaultValue={id} hidden />
    </form>
   
  );
}