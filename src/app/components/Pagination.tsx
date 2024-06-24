"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <>
      <div className="flex space-x-4">
        {currentPage > 1 ? (
          <Link href={createPageURL(currentPage - 1)}>
            <span className="text-blue-500">Previous</span>
          </Link>
        ) : (
          <span className="text-gray-500">Previous</span>
        )}

        {currentPage < totalPages ? (
          <Link href={createPageURL(currentPage + 1)}>
            <span className="text-blue-500">Next</span>
          </Link>
        ) : (
          <span className="text-gray-500">Next</span>
        )}
      </div>
    </>
  );
}
