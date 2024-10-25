import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const PaginationLink = ({ page, currentPage, onClick }) => (
  <button
    onClick={() => onClick(page)}
    className={`inline-flex items-center justify-center text-sm font-medium h-10 bg-background min-w-10 px-4 py-2 rounded-md ${currentPage === page
        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
        : 'hover:bg-accent hover:text-accent-foreground'
      }`}>
    {page}
  </button>
);

export default function DynamicPagination({ totalPages = 10, setCurrentPage ,currentPage,handlePageChange}) {
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    console.log("running")
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get('page') || '1', 10);
    setCurrentPage(page);
  }, [location.search]);

 

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(currentPage - 1, 1);
    let endPage = Math.min(startPage + 2, totalPages);

    if (endPage - startPage < 2) {
      startPage = Math.max(endPage - 2, 1);
    }

    if (startPage > 1) {
      pageNumbers.push(<button key="ellipsis-start" className="px-2" disabled>
        <MoreHorizontal className="h-4 w-4" />
      </button>);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PaginationLink key={i} page={i} currentPage={currentPage} onClick={handlePageChange} />
      );
    }

    if (endPage < totalPages) {
      pageNumbers.push(<button key="ellipsis-end" className="px-2" disabled>
        <MoreHorizontal className="h-4 w-4" />
      </button>);
    }

    return pageNumbers;
  };

  return (
    (<nav className="mx-auto flex w-full justify-center">
      <ul className="flex items-center gap-1 text-black">
        <li>
          <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center justify-center text-sm font-medium h-10 bg-background px-4 py-2 rounded-md hover:bg-accent  text-black hover:text-accent-foreground disabled:opacity-50">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </button>
        </li>
        {renderPageNumbers()}
        <li>
          <button
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="inline-flex items-center justify-center text-sm font-medium h-10 bg-background px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground disabled:opacity-50 text-black">
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </button>
        </li>
      </ul>
    </nav>)
  );
}