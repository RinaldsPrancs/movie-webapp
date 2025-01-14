"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import {auth} from '@/auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function submitReview(
  prevState: string | undefined,
  formData: FormData
) {
  const client = await db.connect();
  const option = formData.get('selectedOption');
  const check = formData.get('check') === "on" ? "yes" : "no";
  const text = formData.get('text');
  const id = formData.get('id');
  const session = await auth();
  const user = session?.user?.name;
  
  if (typeof option !== "string" || typeof check !== "string" || typeof text !== "string" || typeof id !== "string") {
    throw new Error("Must be a string.");
  }
  
  try {
  
    console.log(option);
    console.log(check);
    console.log(text);
    
    await client.sql`
    INSERT INTO show_ratings (username, rating, anonymous, rating_text, show_id)
    VALUES (${user},${option}, ${check}, ${text},${id});
  `;
  } catch (error) {
    return "err: " + {error};
  }
  
}



export async function createUser2(
  prevState: string | undefined,
  formData: FormData
) {
  const client = await db.connect();
  const password = formData.get("password");
  const username = formData.get("username");
  const email = formData.get("email");
  if (typeof password !== "string") {
    throw new Error("Password is required and must be a string.");
  }
  if (typeof username !== "string") {
    throw new Error("Username is required and must be a string.");
  }
  if (typeof email !== "string") {
    throw new Error("Email is required and must be a string.");
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await client.sql`
    INSERT INTO users (name, email, password)
    VALUES (${username}, ${email}, ${hashedPassword});
  `;
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      (error as { code: string }).code === "23505"
    ) {
      // Check the constraint name to narrow down the issue
      const pgError = error as { code: string; constraint?: string };
      console.log(pgError);
      if (pgError.constraint === "users_email_key") {
        return "Email already exists. Please use a different email.";
      }
      if (pgError.constraint === "users_name_key") {
        return "Username already exists. Please use a different username.";
      }
    }
    // Fallback for other types of errors
    return "Something went wrong.";
  }
}
export async function fetchShowByID(id: { id: string }) {
  const url = `https://api.themoviedb.org/3/tv/${id.id}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`,
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const resObject = await response.json();

    return resObject;
  } catch (error) {
    console.error("Failed to fetch show by ID:", error);
    throw error;
  }
}

export async function fetchFilteredMovies(query: string, currentPage: number) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=${currentPage}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`,
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const resObject = await response.json();
    return resObject.results;
  } catch (error) {
    console.error("Failed to fetch filtered movies:", error);
    throw error;
  }
}

export async function fetchFilteredShows(query: string, currentPage: number) {
  const url = `https://api.themoviedb.org/3/search/tv?query=${query}&language=en-US&page=${currentPage}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`,
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const resObject = await response.json();
    return resObject.results;
  } catch (error) {
    console.error("Failed to fetch filtered movies:", error);
    throw error;
  }
}

export async function fetchShowPages(query: string) {
  const url = `https://api.themoviedb.org/3/search/tv?query=${query}&language=en-US&page=1`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`,
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const resObject = await response.json();
    return resObject.total_pages;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
}
