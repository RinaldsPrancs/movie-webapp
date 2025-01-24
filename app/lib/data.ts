import { auth } from "@/auth";
import { db } from "@vercel/postgres";

export async function fetchShowById(id: string) {
  const client = await db.connect();
  try {
    const data = await client.sql`
        SELECT
        id,
          username,
          rating,
          anonymous,
          rating_text
        FROM show_ratings
        WHERE show_id = ${id};
      `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch show.");
  }
}

export async function fetchMovieById(id: string) {
  const client = await db.connect();
  try {
    const data = await client.sql`
        SELECT
        id,
          username,
          rating,
          anonymous,
          rating_text
        FROM movie_ratings
        WHERE movie_id = ${id};
      `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch show.");
  }
}




export async function fetchShowByUser() {
  // console.log("Fetching show by user...");

  const startConnectionTime = Date.now();
  const client = await db.connect();
  const connectionTime = Date.now() - startConnectionTime;
  // console.log(`Database connection time: ${connectionTime}ms`); // Log connection time

  const session = await auth();
  // console.log("Session fetched...", session);

  const user = session?.user?.name;
  // console.log("User name:", user);

  const startTime = Date.now();
  try {
    const data = await client.sql`
      SELECT
        id,
        username,
        rating,
        rating_text,
        show_name
      FROM show_ratings
      WHERE username = ${user};
    `;
    const endTime = Date.now();
    // console.log(`Database query time: ${endTime - startTime}ms`); // Log the query execution time

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch show.");
  } finally {
    client.release(); // Ensure the client is released back to the pool
  }
}




export async function fetchMovieByUser() {
  // console.log("Fetching movie by user...");

  const startConnectionTime = Date.now();
  const client = await db.connect();
  const connectionTime = Date.now() - startConnectionTime;
  // console.log(`Database connection time: ${connectionTime}ms`); // Log connection time

  const session = await auth();
  // console.log("Session fetched...", session);

  const user = session?.user?.name;
  // console.log("User name:", user);

  const startTime = Date.now();
  try {
    const data = await client.sql`
      SELECT
        id,
        username,
        rating,
        rating_text,
        movie_name
      FROM movie_ratings
      WHERE username = ${user};
    `;
    const endTime = Date.now();
    // console.log(`Database query time: ${endTime - startTime}ms`); // Log the query execution time

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch movie.");
  } finally {
    client.release(); // Ensure the client is released back to the pool
  }
}

