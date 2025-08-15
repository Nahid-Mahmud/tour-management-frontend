import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";

import { Button } from "@/components/ui/button";
import { useGetAllTourTypeQuery } from "@/redux/features/tour/tour.api";
import { Delete, SquarePen } from "lucide-react";
import { useState } from "react";

function AddTourType() {
  const { data: allTourTypes, isLoading: tourLoading } = useGetAllTourTypeQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const tourTypes = allTourTypes?.data || [];
  const totalPages = Math.ceil(tourTypes.length / itemsPerPage);
  const paginatedTourTypes = tourTypes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div>
      <div className="flex justify-end mb-4 ">
        <Button variant="default" className="cursor-pointer">
          Add Tour Type
        </Button>
      </div>

      <Table>
        <TableCaption>A list of available tour types.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SN</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tourLoading
            ? Array.from({ length: itemsPerPage }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell className="text-right space-x-4">
                    <Skeleton className="h-6 w-16 inline-block mr-2" />
                    <Skeleton className="h-6 w-6 inline-block" />
                  </TableCell>
                </TableRow>
              ))
            : paginatedTourTypes.map((tourType, index) => (
                <TableRow key={tourType._id}>
                  <TableCell className="font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                  <TableCell>{tourType.name}</TableCell>
                  <TableCell className="text-right space-x-4">
                    <button className="cursor-pointer">
                      <SquarePen className="inline-block " />
                    </button>
                    <button className="text-red-500 hover:underline cursor-pointer">
                      <Delete size={25} className="inline-block " />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      {!tourLoading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button variant="outline" size="sm" onClick={handlePrev} disabled={currentPage === 1}>
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button variant="outline" size="sm" onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default AddTourType;
