"use client";

import { metadata } from "@/app/layout";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

function getNestedValue(obj: any, path: string): any {
  const keys = path.split(".");

  let value = obj;
  for (const key of keys) {
    if (value == null) return undefined;
    value = value[key];
  }

  return value;
}

export default function TableComponent({ columns, data, metaData }: any) {
  console.log("Columns", columns);
  console.log("Datas", data);
  console.log("MetaData", metaData);

  return (
    <>
      <Table>
        <TableHeader className="bg-neutral-100 ">
          <TableRow>
            {columns.map((column: any) => (
              <TableHead key={column.accesor} className="pl-4">
                {column.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {data && Array.isArray(data) && data.length > 0 && (
          <TableBody className="text-neutral-700 ">
            {data?.map((row: any, index) => (
              <TableRow key={index}>
                {columns.map((column: any) => (
                  <TableCell key={column.accesor} className="font-medium pl-4">
                    {getNestedValue(row, column.accesor)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      <PaginationComponent metaData={metaData} />
    </>
  );
}

export const PaginationComponent = ({ metaData }: any) => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  if (!metaData) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent className="py-2">
        {metaData.previous && (
          <PaginationItem className="p-1 hover:bg-neutral-100 px-2 rounded-md">
            <Link href={`?page=${Number(page) - 1 || 1}`}>Prev</Link>
          </PaginationItem>
        )}
        {Array.from(
          {
            length: metaData.count
              ? metaData.count == 12
                ? 1
                : metaData.count / 12 + 1
              : 1,
          },
          (_, index) => (
            <PaginationItem key={index} className="">
              {index + 1 === Number(page) && (
                <Link
                  href={`?page=${index + 1}`}
                  className="border px-4 p-1 rounded-md hover:bg-neutral-100"
                >
                  {index + 1}
                </Link>
              )}
              {!(index + 1 === Number(page)) && (
                <Link
                  href={`?page=${index + 1}`}
                  className="px-4 p-1 rounded-md hover:bg-neutral-100"
                >
                  {index + 1}
                </Link>
              )}
            </PaginationItem>
          )
        )}

        {metaData.next && (
          <PaginationItem className="p-1 hover:bg-neutral-100 px-2 rounded-md">
            <Link href={`?page=${Number(page) + 1 || 1}`} className="">
              Next
            </Link>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
