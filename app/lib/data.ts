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
