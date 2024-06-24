// app/users/page.tsx
import { fetchUsers, fetchUsersPages } from "@/app/lib/data";
import Pagination from "@/app/components/Pagination";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: number;
    query?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const users = await fetchUsers(currentPage);
  const totalPages = await fetchUsersPages();

  return (
    <div className="flex justify-center items-center h-screen flex-col gap-2">
      <h1>Daftar Pengguna</h1>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            {user.nama_lengkap} - {user.jurusan} - {user.nim}
          </li>
        ))}
      </ul>
      <Pagination totalPages={totalPages} />
    </div>
  );
}
