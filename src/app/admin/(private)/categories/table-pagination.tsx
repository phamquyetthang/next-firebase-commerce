"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";

interface IProps {
  total: number;
}
const TablePagination = ({ total }: IProps) => {
  const searchParams = useSearchParams();
  const size = 5;

  const page = useMemo(
    () => Number(searchParams.get("page") || 1),
    [searchParams]
  );
  const paramsObj = useMemo(() => {
    const obj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }, [searchParams]);

  const totalPage = Math.ceil(total / size);
  const nearPageArray = useMemo(() => {
    const min = page - 2 > 0 ? page - 2 : 1;
    const max = page + 2 < totalPage ? page + 2 : totalPage;
    return Array.from({ length: max - min + 1 }).map((_, index) => min + index);
  }, [page, totalPage]);
  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={{
                query: {
                  ...paramsObj,
                  page: page - 1,
                },
              }}
            />
          </PaginationItem>
        )}

        {nearPageArray.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              href={{
                query: {
                  ...paramsObj,
                  page: p,
                },
              }}
              isActive={page === p}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {page * size < total && (
          <PaginationItem>
            <PaginationNext
              href={{
                query: {
                  ...paramsObj,
                  page: page + 1,
                },
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
