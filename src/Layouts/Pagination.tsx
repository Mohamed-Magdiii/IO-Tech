import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // Determine which page group we are on (each group has 5 pages)
  const groupSize = 5;
  const startPage = Math.floor((currentPage - 1) / groupSize) * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);

  const handleNext = () => {
    if (endPage < totalPages) {
      onPageChange(endPage + 1);
    }
  };

  const handlePrev = () => {
    if (startPage > 1) {
      onPageChange(startPage - groupSize);
    }
  };

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-4">
      <button
        onClick={handlePrev}
        disabled={startPage === 1}
        className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 disabled:opacity-50 transition-all duration-200"
      >
        prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`py-2 px-4 rounded-md ${
            page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          } hover:bg-blue-300 transition-all duration-200`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={endPage === totalPages}
        className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 disabled:opacity-50 transition-all duration-200"
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
