import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

const ITEMS_PER_PAGE = 5;

type User = {
  id: number;
  nama_lengkap: string;
  jurusan: string;
  nim: string;
};

export async function fetchUsers(currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const data =
      await sql<User>`SELECT * FROM users LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    return data.rows;
  } catch (error) {
    console.error("Error fetching users: ", error);
  }
}

export async function fetchUsersPages() {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*) FROM users`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Error fetching users pages: ", error);
    throw new Error("Failed to fetch total number of pages");
  }
}
