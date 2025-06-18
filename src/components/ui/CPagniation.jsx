import React, { useEffect } from 'react';
import { useRouter } from 'next/router'; // or useHistory in React Router
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Helper function to divide an array into chunks
const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const CPagination = ({ data, size=4 , className}) => {
  const router = useRouter();
  const { query } = router;

  // Get the current page from the query parameter or default to 0
  const currentPage = parseInt(query.page, 10) || 0;

  // Split the data into chunks (4 items per page)
  const chunkedData = chunkArray(data, Math.ceil(data.length / size));

  // Handle page change and update the URL query param
  const handlePageChange = (page) => {
    // Update the URL query param to reflect the selected page
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: page.toString() },
    });
  };

  useEffect(() => {
    // This effect runs when the page loads or query params change
    if (currentPage >= chunkedData.length) {
      // If the page is out of range, set the last page
      handlePageChange(chunkedData.length - 1);
    }
  }, [currentPage, chunkedData.length]);

  return (
    <div>
      {/* ShadCN Pagination */}
      <Pagination>
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 0) handlePageChange(currentPage - 1);
              }}
            />
          </PaginationItem>

          {/* Pagination Links */}
          {chunkedData.map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(index);
                }}
                isActive={currentPage === index}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Ellipsis if necessary */}
          {chunkedData.length > 5 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < chunkedData.length - 1) handlePageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CPagination;
